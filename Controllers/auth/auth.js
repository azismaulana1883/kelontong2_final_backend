const Cryptr = require('cryptr');
const CryptrNew = new Cryptr('secret-key-access');
const JWT = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const UserModelsMongo = require('../../models/scheme/User');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'indra.kurniawan1433@gmail.com',
        pass: 'ubpnqeblbwjmoipk'
    }
});

function sendVerificationEmail(email, verificationToken) {
    const mailOptions = {
        from: 'indra.kurniawan1433@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Click the following link to verify your email: http://localhost:7600/api/v1/auth/verify?email=${email}&token=${verificationToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

async function Register(req, res, next) {
    const { name, email, password, phone_number, alamat, role } = req.body;

    try {
        let getUser = await UserModelsMongo.findOne({
            email: email
        });

        if (getUser) {
            res.status(400).send({
                message: 'Data is exists, please create another one!',
                success: false,
                statusCode: 400
            });
        } else {
            let dataPassingToDB = {
                name: name,
                password: CryptrNew.encrypt(password),
                email: email,
                phone_number: phone_number,
                alamat: alamat,
                role: role,
                isVerified: false,
                verificationToken: generateUniqueToken()
            };

            let createdData = await UserModelsMongo.create(dataPassingToDB);

            const userConfig = {
                name: createdData.name,
                email: createdData.email,
                phone_number: createdData.phone_number,
                alamat: createdData.alamat,
                verificationToken : createdData.verificationToken,
                role: createdData.role
            };

            if (!createdData) {
                res.status(400).send({
                    message: 'Wrong username or password',
                    success: false,
                    statusCode: 400
                });
            } else {
                // kirim email saat user mendaftar
                sendVerificationEmail(email, dataPassingToDB.verificationToken);

                res.send({
                    data: userConfig,
                    message: 'Successfully created user data! Please check your email for verification.',
                    success: true,
                    statusCode: 201
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400);
    }
}

async function VerifyEmail(req, res, next) {
    const { email, token } = req.query;

    try {
        let user = await UserModelsMongo.findOne({ email: email, verificationToken: token });

        if (!user) {
            console.error('Invalid verification token or email:', email, token);
            return res.status(400).send({
                message: 'Invalid verification token!',
                success: false,
                statusCode: 400
            });
        }

        // Update isVerified menjadi true langsung saat tautan diklik
        const updateResult = await UserModelsMongo.updateOne(
            { email: email, verificationToken: token },
            { $set: { isVerified: true }, $unset: { verificationToken: 1 } }
        );

        if (updateResult.modifiedCount !== 1) {
            console.error('Failed to update isVerified:', email, token);
            return res.status(500).send({
                message: 'Failed to update isVerified!',
                success: false,
                statusCode: 500
            });
        }

        console.log('Email verification successful:', email, token);
        res.status(200).send({
            message: 'Email verification successful!',
            success: true,
            statusCode: 200
        });
    } catch (error) {
        console.error('Error in VerifyEmail:', error);
        res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            statusCode: 500
        });
    }
}

function generateUniqueToken() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let token = '';

    for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }

    return token;
}

module.exports = {
    Register,
    VerifyEmail,
    generateUniqueToken,
};
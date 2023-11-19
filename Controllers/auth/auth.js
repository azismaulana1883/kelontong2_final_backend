const Cryptr = require('cryptr');
const CryptrNew = new Cryptr('secret-key-access');
const nodemailer = require('nodemailer');
const JWT = require('jsonwebtoken');
const UserModelsMongo = require('../../models/scheme/User');

// Konfigurasi transporter untuk Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'indra.kurniawan1433@gmail.com',
        pass: 'ubpnqeblbwjmoipk'
    }
});

function sendResetPasswordEmail(email, resetPasswordToken) {
    const mailOptions = {
        from: 'indra.kurniawan1433@gmail.com',
        to: email,
        subject: 'Reset Password',
        text: `Click the following link to reset your password: http://localhost:5173/reset-password?email=${email}&token=${resetPasswordToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Reset password email sent: ' + info.response);
        }
    });
}

function generateResetPasswordExpiration() {
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1); // Set expiration time (e.g., 1 hour)
    return expiration;
}

async function resetPassword(req, res, next) {
    const { email, token, newPassword } = req.body;

    // Validasi password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>0-9]).{8,12}$/;
    if (!passwordRegex.test(newPassword)) {
        return res.status(400).send({
            message: 'Password baru harus memiliki panjang 8 dan maksimal 12 serta memiliki 1 simbol 1 huruf besar didalamnya',
            success: false,
            statusCode: 400
        });
    }

    try {
        let user = await UserModelsMongo.findOne({ email: email, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

        if (!user) {
            console.error('Invalid reset password token or email:', email, token);
            return res.status(400).send({
                message: 'Invalid reset password token!',
                success: false,
                statusCode: 400
            });
        }

        // Update password dan hapus token reset password setelah berhasil reset
        await UserModelsMongo.updateOne(
            { email: email },
            { $set: { password: CryptrNew.encrypt(newPassword) }, $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 } }
        );

        console.log('Password reset successful:', email, token);
        res.status(200).send({
            message: 'Password reset successful!',
            success: true,
            statusCode: 200
        });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            statusCode: 500
        });
    }
}

async function forgotPassword(req, res, next) {
    const { email } = req.body;

    try {
        let user = await UserModelsMongo.findOne({ email: email });

        if (!user) {
            console.error('User not found for email:', email);
            return res.status(404).send({
                message: 'User not found!',
                success: false,
                statusCode: 404
            });
        }

        // Generate reset password token
        const resetPasswordToken = generateResetPasswordToken();

        // Set expiration time (e.g., 1 hour)
        const resetPasswordExpires = generateResetPasswordExpiration();

        // Update user with reset password token and expiration time
        await UserModelsMongo.updateOne(
            { email: email },
            { $set: { resetPasswordToken: resetPasswordToken, resetPasswordExpires: resetPasswordExpires } }
        );

        // Kirim email reset password
        sendResetPasswordEmail(email, resetPasswordToken);

        res.status(200).send({
            message: 'Reset password email sent! Check your email for further instructions.',
            success: true,
            statusCode: 200
        });
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).send({
            message: 'Internal Server Error',
            success: false,
            statusCode: 500
        });
    }
}

// Fungsi untuk menghasilkan token reset password unik
function generateResetPasswordToken() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let token = '';

    for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }

    return token;
}

async function Login(req, res, next) {
    const { email } = req.body;

    // Get Users Exist
    try {
        let getUser = await UserModelsMongo.aggregate([
            {
                $match: { email: email }
            }
        ]);

        if (getUser.length < 1) {
            res.status(400).send({
                message: 'Data is not exists!',
                success: false,
                statusCode: 400
            });
        } else {
            let passwordUser = CryptrNew.decrypt(getUser[0].password);

            if (req.body.password !== passwordUser) {
                res.status(400).send({
                    message: 'Username or Password is wrong!',
                    success: false,
                    statusCode: 400
                });
            } else if (!getUser[0].isVerified) {
                res.status(401).send({
                    message: 'Email is not verified. Please verify your email first.',
                    isVerified : false,
                    statusCode: 401
                });
            } else {
                let expiredToken = Math.floor(Date.now() / 1000) + 60 * 60;
                let createAccessToken = JWT.sign(
                    {
                        exp: expiredToken,
                        data: {
                            name: getUser[0].name,
                            email: getUser[0].email,
                            id: getUser[0].id,
                            role: getUser[0].role
                        }
                    },
                    'secret-key-access'
                );

                let dataPassingClient = {
                    access_token: createAccessToken, // access token expired 1 day
                    refresh_token: createAccessToken, // refresh token expired 1 month
                    expired_date: expiredToken,
                    user: getUser[0].email,
                    id: getUser[0].id,
                    alamat: getUser[0].alamat,
                    isVerified: getUser[0].isVerified,
                    role: getUser[0].role
                };

                res.status(200).send({
                    message: 'Successfully login user!',
                    statusText: 'Successfully login user!',
                    statusCode: 200,
                    success: true,
                    data: dataPassingClient
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400);
    }
}


module.exports = {
    Login,
    forgotPassword,
    resetPassword,
    generateResetPasswordToken
};
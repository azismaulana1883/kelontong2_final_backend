const Cryptr = require('cryptr');
const CryptrNew = new Cryptr('secret-key-access');
const JWT = require('jsonwebtoken');
const UserModelsMongo = require('../../models/scheme/User');

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
    Login
};
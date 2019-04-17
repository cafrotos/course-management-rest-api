const
  jwt = require('jsonwebtoken'),
  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY,
  expiresIn = "3h";

const createAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
}

const verifyAccessToken = (access_token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(access_token, JWT_SECRET_KEY, (err, decode) => {
      if(err) reject(err);
      else resolve(decode);
    })
  })
}

module.exports = {
  createAccessToken,
  verifyAccessToken
}
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET

function generateToken(userId) {
    return jwt.sign({
        id: userId
    },
        JWT_SECRET,
        {
            expiresIn:'7d' // Token validity
        })
}

export default generateToken;
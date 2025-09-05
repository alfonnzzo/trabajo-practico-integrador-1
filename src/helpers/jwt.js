import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const verifyToken = 
(token) => jwt.verify(token, process.env.JWT_SECRET);


export const signToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET no está definido en las variables de entorno");
    }
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};


// export const signToken = 
// (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
// import jwt from "jsonwebtoken";
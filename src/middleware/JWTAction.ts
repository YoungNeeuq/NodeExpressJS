import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const createJWT = (): string => {
    const token = jwt.sign({ foo: 'bar' }, process.env.JWT_SERCET as string);
    console.log(token);
    return token;
};

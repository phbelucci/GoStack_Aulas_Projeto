import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'
import authConfig from '../config/auth'

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuth(req : Request, res: Response, next: NextFunction) : void {
    //validação token

    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new Error("JWT token is missing.");
    }

    const [,token] = authHeader.split(' ')

    try {
        const decode = verify(token, authConfig.jwt.secret);

        const { sub } = decode as TokenPayload;

        req.user = {
            id: sub,
        }

        return next();

    } catch {
        throw new Error("Invalid JWT token.");
        
    }

}
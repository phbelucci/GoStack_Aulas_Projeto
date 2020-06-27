import {Request,Response } from 'express' 
import createUser from './services/CreateUser'

export function hello(req : Request, res: Response) {
    const user = createUser({ 
        name: 'Paulo', 
        email: 'ok', 
        password: '123',
        techs: [
            'node',
            {title: 'JavaScript', xp: 200}
        ]       
     })
    return res.json({message: "hello"})
}

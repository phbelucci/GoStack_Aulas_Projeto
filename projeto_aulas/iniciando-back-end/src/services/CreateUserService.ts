import {getCustomRepository, getRepository} from 'typeorm'

import {hash} from 'bcryptjs'
import User from '../models/Users'

interface Request {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    
    public async execute({name, email, password}: Request): Promise<User>{
        //adiciona repositorio usando o model como parametro
        const usersRepository = getRepository(User);
        
        const checkUserExists = await usersRepository.findOne({
            //where email === email, poderia ser email : email
            where: {email}
        });

        if(checkUserExists){
            throw new Error("Email address already used.");
        }

        const hashedPassword = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        });

        await usersRepository.save(user);

        return user;

    }

}

export default CreateUserService;
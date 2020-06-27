//criar usuario
//nome, email, senha

interface TechObject {
    title: string;
    xp: number;
}
interface CreateUserData {
    name?: string;
    email: string;
    password: string;
    techs: Array<string | TechObject>
}

export default function createUser({ name = '', email, password, techs}: CreateUserData){

        const user = {
            name,
            email,
            password,
        } 
        return user
}
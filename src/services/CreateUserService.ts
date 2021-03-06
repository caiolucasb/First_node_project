import User from '../models/User';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm'


interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    public async excute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExist = await usersRepository.findOne({
            where: { email }
        })

        if(checkUserExist){
            throw new Error('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        })
        await usersRepository.save(user)

        return user;
    }
}

export default CreateUserService;

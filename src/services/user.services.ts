import { Repository } from "typeorm";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from "../infra/entities/user.entity";
import { user } from '../routes/user.router';

export default class UserServices{

    public constructor(
        private readonly userRepository: Repository<User>
    ){}

    public async getUserByEmail(email: string): Promise<User|null>{
        return await this.userRepository.findOneBy({ email: email })
    }

    public async createUser(user: User) {
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = await this.userRepository.save(user)
        const {password: _, ...newwUser} = newUser
        return newwUser
    }

    public async userLogin(login: any, user: User): Promise<boolean> {
        return await bcrypt.compare(login.password, user.password)
    }

    public async userValidation(user: User){
        const token = jwt.sign({
            userId: user.id
        },
        process.env.SECRET_KEY ?? '',
        {
            expiresIn: '8h',
        })
        return token
    }
    
}
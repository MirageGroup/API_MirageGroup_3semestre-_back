import { Repository } from "typeorm";
import bcrypt from 'bcrypt'
import User from "../infra/entities/user.entity";

export default class UserServices{

    public constructor(
        private readonly userRepository: Repository<User>
    ){}

    public async getAllUsers(relations: any): Promise<Array<User>>{
        const users = await this.userRepository.find(relations)
        return users
    }

    public async getUserByEmail(email: string): Promise<User|null>{
        return await this.userRepository.findOneBy({ email: email })
    }

    public async createUser(user: User) {
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = await this.userRepository.save(user)
        const {password: _, ...newwUser} = newUser
        return newwUser
    }
    
}
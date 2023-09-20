import { Repository } from "typeorm";
import User from "../infra/entities/user.entity";

export default class UserServices{

    public constructor(
        private readonly userRepository: Repository<User>
    ){}

    public async getAllUsers(): Promise<Array<User>>{
        const users = await this.userRepository.find()
        return users
    }
}
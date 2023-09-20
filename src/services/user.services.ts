import { Repository } from "typeorm";
import User from "../infra/entities/user.entity";

export default class UserServices{

    public constructor(
        private readonly userRepository: Repository<User>
    ){}

    public async getAllUsers(relations: any): Promise<Array<User>>{
        const users = await this.userRepository.find(relations)
        return users
    }
}
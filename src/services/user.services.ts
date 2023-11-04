import { Repository } from "typeorm";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from "../infra/entities/user.entity";
import { user } from '../routes/user.router';

type JwtPayload = {
    userId: number
}

export default class UserServices {

    public constructor(
        private readonly userRepository: Repository<User>
    ) { }

    public async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ email: email })
    }

    public async getUserById(id: number): Promise<User | null> {
        return await this.userRepository.findOne(
            {
                where: {
                    id: id
                },
                relations: {
                    role: true
                }
            })
    }

    public async createUser(user: User) {
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = await this.userRepository.save(user)
        const { password: _, created_at: __, updated_at: ___, deleted_at: ____, ...newwUser } = newUser
        return newwUser
    }

    public async userLogin(login: any, user: User): Promise<boolean> {
        return await bcrypt.compare(login.password, user.password)
    }

    public async userValidation(user: User) {
        const token = jwt.sign({
            userId: user.id
        },
            process.env.SECRET_KEY ?? '',
            {
                expiresIn: '8h',
            })

        const { password: _, created_at: __, updated_at: ___, deleted_at: ____, ...userLogin } = user

        return {
            user: userLogin,
            token: token
        }
    }

    public async fetchUsers(): Promise<Array<User>> {
        return await this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .select([
                'user.id',
                'user.name',
                'user.email',
                'user.phone',
                'user.cpf',
                'role.name'
            ])
            .getMany()
    }
}
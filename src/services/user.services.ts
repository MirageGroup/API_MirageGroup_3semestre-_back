import { Repository } from "typeorm";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from "../infra/entities/user.entity";
import { user } from '../routes/user.router';
import * as nodemailer from 'nodemailer';

type JwtPayload = {
    userId: number
}

export default class UserServices {
    user: any;

    public async addUserToProjectAndSendEmail(user: User, projectId: number) {

        const transporter = nodemailer.createTransport({
        });

        const mailOptions = {
            from: 'ionic@empresa.com',
            to: user.email,
            subject: 'Você foi adicionado a um projeto',
            text: 'Você foi adicionado ao projeto com ID ' + projectId,
        };

        transporter.sendMail(mailOptions, (error: Error | null, info: { response: string }) => {
            if (error) {
                console.log('Erro ao enviar e-mail: ' + error.message);
            } else {
                console.log('E-mail enviado: ' + info.response);
            }
        });
        
    }

    public async sendReminderEmailWhenDueDateApproaches(user: User, projectId: number, dueDate: Date) {

        const transporter = nodemailer.createTransport({
        });

        const mailOptions = {
            from: 'ionic@empresa.com',
            to: user.email,
            subject: 'Lembrete: Data de término do projeto se aproximando',
            text: 'A data de término do projeto com ID ' + projectId + ' está se aproximando. Verifique os detalhes.',
        };

        transporter.sendMail(mailOptions, (error: Error | null, info: { response: string }) => {
            if (error) {
                console.log('Erro ao enviar e-mail: ' + error.message);
            } else {
                console.log('E-mail enviado: ' + info.response);
            }
        });
    }

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

    public async fetchUserProcesses(id: number | undefined){
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: ['processes', 'processes.users', 'processes.tasks']
        })
        if(user){
            return user.processes
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
                'role.name',
                'role.id'
            ])
            .getMany()
    }
    public async updateDateProject(): Promise<any> {
        // Assuming 'this.user' is supposed to be an asynchronous operation
        return await this.user;  // Replace this line with the actual logic of your method
    }
    
    
}
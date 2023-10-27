import { Request, Response } from 'express';
import UserServices from "../services/user.services";

export default class UserController{

    public constructor(
        private readonly userServices: UserServices
    ){}

    public async getAllUsers(req: any, res: any) {
        try{
            const users = await this.userServices.getAllUsers(req.body)
            res.status(200).send(users)
        }catch(error){
            console.error(error)
            res.status(500).send({ message: "Internal server error, please try again later", error })
        }
    }

    public async createUser(req: Request, res: Response){
        const { name, email, password } = req.body
        if(name == null || email == null || password == null) return res.sendStatus(400)
        try{
            if(await this.userServices.getUserByEmail(email)) return res.sendStatus(409)
            const user = await this.userServices.createUser(req.body)
            return res.status(201).send(user)
        }catch(error){
            console.error(error)
            res.status(500).send({ message: "Internal server error, please try again later", error })
        }
    }

}
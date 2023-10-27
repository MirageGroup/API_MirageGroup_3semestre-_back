import { Request, Response } from 'express';
import UserServices from "../services/user.services";

export default class UserController{

    public constructor(
        private readonly userServices: UserServices
    ){}

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

    public async userLoginValidation(req: Request, res: Response){
        const { email, password } = req.body
        if(email == null || password == null) return res.sendStatus(400)
        const user = await this.userServices.getUserByEmail(email)
        if(!user) return res.sendStatus(404)
        try{
            const login = await this.userServices.userLogin({ email, password }, user)
            if(!login){
                res.sendStatus(400)
            }else{
                const token = await this.userServices.userValidation(user)
                res.send(token)
            }
        }catch(error){
            console.error(error)
            res.status(500).send({ message: "Internal server error, please try again later", error })
        }
    }

}
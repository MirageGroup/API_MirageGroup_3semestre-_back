import { Router } from "express";
import UserServices from "../services/user.services";
import appDataSource from "../infra/data-source";
import User from "../infra/entities/user.entity";
import UserController from "../controllers/user.controller";

export const user = Router()

const service = new UserServices(appDataSource.getRepository(User))
const controller = new UserController(service)

user.get('/getall', async (req, res) => {
    controller.getAllUsers(req, res)
})

user.post('/create', async (req,res) =>{
    controller.createUser(req, res)
})
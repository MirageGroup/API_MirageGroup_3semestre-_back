import { Router } from "express";
import UserServices from "../services/user.services";
import appDataSource from "../infra/data-source";
import User from "../infra/entities/user.entity";
import UserController from "../controllers/user.controller";
import { auth } from '../middlewares/auth/auth';

export const user = Router()

const service = new UserServices(appDataSource.getRepository(User))
const controller = new UserController(service)

user.post('/create', async (req,res) =>{
    controller.createUser(req, res)
})

user.post('/login', async (req, res) => {
    controller.userLoginValidation(req, res)
})

user.get('/getprofile', auth, async (req, res) => {
    controller.getUserProfile(req, res)
})
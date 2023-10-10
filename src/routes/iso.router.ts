import { Router } from "express";
import IsoServices from "../services/iso.services";
import appDataSource from "../infra/data-source";
import Iso from "../infra/entities/iso.entity";
import IsoController from "../controllers/iso.controller";

export const iso = Router()

const service = new IsoServices(appDataSource.getRepository(Iso))
const controller = new IsoController(service)

iso.post('/create', async (req, res) => {
    await controller.createIso(req, res)
})
iso.get('/getall', async (req, res) => {
    await controller.getAllIsos(req, res)
})
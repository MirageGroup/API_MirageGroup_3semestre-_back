import { Router } from "express";
import Process from '../infra/entities/process.entity';
import ProcessServices from '../services/process.services';
import appDataSource from '../infra/data-source';
import ProcessController from '../controllers/process.controller';

export const process = Router()

const service = new ProcessServices(appDataSource.getRepository(Process))
const controller = new ProcessController(service)

process.post('/create', async (req, res) => {
    await controller.createProcess(req, res)
})

process.patch('/:id/update', async (req, res) => {
    await controller.updateProcessInformations(req, res)
})

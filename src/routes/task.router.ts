import { Router } from 'express';
import TaskServices from '../services/task.services';
import appDataSource from '../infra/data-source';
import Task from '../infra/entities/task.entity';
import TaskController from '../controllers/task.controller';
import ProcessServices from '../services/process.services';
import Process from '../infra/entities/process.entity';

export const task = Router()

const taskService = new TaskServices(appDataSource.getRepository(Task), appDataSource.getRepository(Process))
const processService = new ProcessServices(appDataSource.getRepository(Process))
const controller = new TaskController(taskService, processService)

task.post('/:process_id/create', async (req, res) => {
    await controller.createTask(req, res)
})
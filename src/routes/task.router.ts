import { Router } from 'express';
import TaskServices from '../services/task.services';
import appDataSource from '../infra/data-source';
import Task from '../infra/entities/task.entity';
import TaskController from '../controllers/task.controller';
import ProcessServices from '../services/process.services';
import Process from '../infra/entities/process.entity';
import multer from 'multer';
import Evidence from '../infra/entities/evidence.entity';

export const task = Router()

const taskService = new TaskServices(appDataSource.getRepository(Task), appDataSource.getRepository(Process), appDataSource.getRepository(Evidence))
const processService = new ProcessServices(appDataSource.getRepository(Process))
const controller = new TaskController(taskService, processService)

const upload = multer({
    storage: multer.memoryStorage(),
})

task.post('/:process_id/create', async (req, res) => {
    await controller.createTask(req, res)
})

task.patch('/:process_id/:task_id/update', async (req, res) => {
    await controller.updateTaskInformations(req, res)
})

task.get('/:process_id/getall', async (req, res) => {
    await controller.getAllTasks(req, res)
})

task.delete('/:task_id/delete', async (req, res) => {
    await controller.softDeleteTasks(req, res)
})

task.post('/:process_id/:task_id/addevidence', upload.single('file'), async (req, res) => {
    await controller.addEvidence(req, res)
})
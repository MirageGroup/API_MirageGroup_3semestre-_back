import { Router } from 'express';
import TaskServices from '../services/task.services';
import appDataSource from '../infra/data-source';
import Task from '../infra/entities/task.entity';
import TaskController from '../controllers/task.controller';

export const task = Router()

const service = new TaskServices(appDataSource.getRepository(Task))
const controller = new TaskController(service)
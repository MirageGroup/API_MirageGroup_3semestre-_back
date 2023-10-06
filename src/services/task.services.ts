import { Repository } from 'typeorm';
import Task from '../infra/entities/task.entity';

export default class TaskServices{

    public constructor(
        private readonly taskRepository: Repository<Task>
    ){}
}
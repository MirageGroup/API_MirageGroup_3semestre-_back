import { Repository } from 'typeorm';
import Task from '../infra/entities/task.entity';
import Process from '../infra/entities/process.entity';

export default class TaskServices{

    public constructor(
        private readonly taskRepository: Repository<Task>,
        private readonly processRepository: Repository<Process>
    ){}

    public async createTask(process: Process, task: Task): Promise<Process>{
        process.tasks.push(task)
        return await this.processRepository.save(process)
    }
}
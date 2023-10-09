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

    public async updateTaskInformations(task: Task, updateTaskDto: any): Promise<Task | null> {
        return await this.taskRepository.save({ ...task, ...updateTaskDto })
    }

    public async getTaskById(id: any): Promise<Task | null>{
        return await this.taskRepository.findOneBy({ id: id })
    }

    public async softDeleteTask(id: any){
        return await this.taskRepository.softDelete(id)
    }
}
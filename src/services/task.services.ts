import { Repository } from 'typeorm';
import Task from '../infra/entities/task.entity';
import Process from '../infra/entities/process.entity';
import Evidence from '../infra/entities/evidence.entity';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export default class TaskServices{

    public constructor(
        private readonly taskRepository: Repository<Task>,
        private readonly processRepository: Repository<Process>,
        private readonly evidenceRepository: Repository<Evidence>,
        private readonly s3Client = new S3Client({ region: process.env.AWS_REGION })
    ){}


    public async createTask(process: Process, task: Task): Promise<Process>{
        process.tasks.push(task)
        return await this.processRepository.save(process)
    }

    public async updateTaskInformations(task: Task, updateTaskDto: any): Promise<Task | null> {
        return await this.taskRepository.save({ ...task, ...updateTaskDto })
    }

    public async getTaskById(id: any): Promise<Task | null>{
        return await this.taskRepository.findOne({
            where: { id: id },
            relations: {
                evidences: true
            }
        })
    }

    public async softDeleteTask(id: any){
        return await this.taskRepository.softDelete(id)
    }

    public async addEvidence(req: any, task: Task){
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `processes/process_${req.params.process_id}/evidences/task_${req.params.task_id}/${req.file?.originalname}`,
            Body: req.file?.buffer,
        }
        await this.s3Client.send(new PutObjectCommand(params))
        const url = `http://s3.${process.env.AWS_REGION}.amazonaws.com/${params.Bucket}/${params.Key}`
        const evidence = await this.evidenceRepository.save({ name: req.file.originalname, url: url })
        task.evidences.push(evidence)
        return await this.taskRepository.save(task)
    }
}
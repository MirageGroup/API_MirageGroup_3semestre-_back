import { Repository } from 'typeorm';
import appDataSource from '../infra/data-source';
import Process from '../infra/entities/process.entity';

export default class ProcessServices{

    public constructor(
        private readonly processRepository: Repository<Process>
    ){}
   
    public async createProcess(process: Process): Promise<Process> {
        const newProcess = await this.processRepository.save(process)
        return newProcess
    }
}
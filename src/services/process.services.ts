import { Repository } from 'typeorm';
import appDataSource from '../infra/data-source';
import Process from '../infra/entities/process.entity';

export default class ProcessServices{

    public constructor(
        private readonly processRepository: Repository<Process>
    ){}

    public async createProcess(process: Process): Promise<Process> {
        return await this.processRepository.save(process)
    }

    public async updateProcessInformations(id: any, updateProcessDto: any): Promise<Process | null> {
        const process = await this.processRepository.findOneBy({ id: id })
        if(process === null) return process
        return await this.processRepository.save({ ...process, ...updateProcessDto })
    }

    public async getAllProcess(): Promise<Array<Process>>{
        const process = await this.processRepository.find()
        return process
    }

    public async softDeleteProcess(id: any) {
        const process = await this.processRepository.findOneBy({ id: id })
        if(process === null) return process
        await this.processRepository.softDelete(id)
    }
}
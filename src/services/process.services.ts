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

    public async updateProcessInformations(id: any, updateProcessDto: any) {
        const process = await this.processRepository.findOneBy({ id: id })
        return await this.processRepository.save({ ...process, ...updateProcessDto })
    }
}
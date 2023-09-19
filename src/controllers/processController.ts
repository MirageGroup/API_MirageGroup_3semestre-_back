import { DataSource, Repository } from "typeorm"
import appDataSource from "../infra/data-source"
import Process from "../infra/entities/process.entity"

export default class processController {

    controllerDataSource: DataSource = appDataSource
    processRepository: Repository<Process>

    constructor(){
        this.controllerDataSource.initialize()
        this.processRepository = this.controllerDataSource.getRepository(Process)
    }

    public createNewProcess = async (req: any, res: any, next: any) => {
        if(!req.body){
            
        }
        const { name, description, date_created, date_finish } = req.body
        if(name == null || description == null || date_created == null || date_finish == null)
    }
}
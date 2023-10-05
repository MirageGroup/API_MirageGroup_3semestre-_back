import { DataSource, Repository } from "typeorm"
import appDataSource from "../infra/data-source"
import Process from "../infra/entities/process.entity"
import ProcessServices from '../services/process.services'

export default class ProcessController{

    public constructor(
        private readonly processServices: ProcessServices
    ){}
    
    public async createProcess(req: any, res: any) {
        const { name, description, deadline } = req.body
        if( name == null || description == null || deadline == null) return res.sendStatus(400)
        try{
            const process: Process = await this.processServices.createProcess(req.body)
            res.status(201).send(process)
        }catch(error){
            console.error(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }
    }

    public async updateProcessInformations(req: any, res: any) {
        if(Object.keys(req.body).length === 0) return res.sendStatus(400)
        try{
            const process = await this.processServices.updateProcessInformations(req.params.id, req.body)
            res.status(200).send(process)
        }catch(error){
            console.log(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }
    }

    public async getAllProcess(req: any, res: any){
        try{
            const process = await this.processServices.getAllProcess()
            res.status(200).send(process)
        }catch(error){
            console.log(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }

        return process
        }
    }

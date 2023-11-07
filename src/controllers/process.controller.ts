import Process from "../infra/entities/process.entity"
import ProcessServices from '../services/process.services'

export default class ProcessController{

    public constructor(
        private readonly processServices: ProcessServices
    ){}
    
    public async createProcess(req: any, res: any){
        const { name, description, deadline, users } = req.body
        if( name == null || description == null || deadline == null || users == null) return res.sendStatus(400)
        try{
            const response: Process = await this.processServices.createProcess(req.body)
            res.status(201).send(response)
        }catch(error){
            console.error(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }
    }

    public async updateProcessInformations(req: any, res: any){
        if(Object.keys(req.body).length === 0) return res.sendStatus(400)
        try{
            const response: Process | null = await this.processServices.updateProcessInformations(req.params.id, req.body)
            if(response === null) return res.sendStatus(400)
            res.status(200).send(response)
        }catch(error){
            console.log(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }
    }

    public async getProcessById(req: any, res: any){
        try{
            const process = await this.processServices.getProcessById(req.params.id)
            if(!process){
                res.sendStatus(404)
            }else{
                res.status(200).send(process)
            }
        }catch(error){
            console.log(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }
    }

    public async getAllProcess(req: any, res: any){
        try{
            const response: Array<Process> = await this.processServices.getAllProcess()
            res.status(200).send(response)
        }catch(error){
            console.log(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }
    }

    public async softDeleteProcess(req: any, res: any){
        try{
            const response = await this.processServices.softDeleteProcess(req.params.id)
            if(response === null) return res.sendStatus(404)
            res.sendStatus(200)
        }catch(error){
            console.log(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }
    }
}

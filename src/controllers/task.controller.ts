import ProcessServices from '../services/process.services';
import TaskServices from '../services/task.services';

export default class TaskController{

    public constructor(
        private readonly taskServices: TaskServices,
        private readonly processServices: ProcessServices
    ){}

    public async createTask(req: any, res: any){
        let process = await this.processServices.getProcessById(req.params.process_id)
        if(process === null) return res.sendStatus(404)
        const { name, description, deadline } = req.body
        if(name == null || description == null || deadline == null) return res.sendStatus(400)
        try{
            process = await this.taskServices.createTask(process, req.body)
            res.status(200).send(process)
        }catch(error){
            console.log(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }
    }
}
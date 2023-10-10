import IsoServices from "../services/iso.services";
import ProcessServices from "../services/process.services";

export default class IsoController{


    public constructor(
        private readonly isoServices: IsoServices
    ){}

    public async createIso(req: any, res: any) {
        const { name, description } = req.body
        if(name == null || description == null) return res.sendStatus(400)
        try{
            const iso = await this.isoServices.createIso(req.body)
            return res.status(201).send(iso)
        }catch(error){
            console.error(error)
            res.status(500).send({ message: "Internal server error, please try again", error })
        }
    }


    public async getAllIsos(req: any, res: any){
        try{
            const isos = await this.isoServices.getAllIsos()
            if(isos == null) return res.sendStatus(404)
            res.status(200).send(isos)
        }catch(error){
            console.log(error)
            res.status(500).send({ message: "Internal server error, please try again", error }) 
        }
    }
}
import IsoServices from "../services/iso.services";

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
}
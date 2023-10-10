import { Repository } from "typeorm";
import Iso from "../infra/entities/iso.entity";

export default class IsoServices{
    public constructor(
        private readonly isoRepository: Repository<Iso>
    ){}

    public async createIso(iso: any){
        return this.isoRepository.save(iso)
    }
}
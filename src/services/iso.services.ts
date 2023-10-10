import { Repository } from "typeorm";
import Iso from "../infra/entities/iso.entity";

export default class IsoServices{
    public constructor(
        private readonly isoRepository: Repository<Iso>
    ){}
}
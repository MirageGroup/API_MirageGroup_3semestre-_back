import { Router } from "express";
import IsoServices from "../services/iso.services";
import appDataSource from "../infra/data-source";
import Iso from "../infra/entities/iso.entity";
import IsoController from "../controllers/iso.controller";

export const iso = Router()

const service = new IsoServices(appDataSource.getRepository(Iso))
const controller = new IsoController(service)


import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import appDataSource from '../../infra/data-source';
import User from '../../infra/entities/user.entity';
import UserServices from '../../services/user.services';

type JwtPayload = {
    userId: number
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) {
        res.status(401).send({ message: "Não ta pegando o token" })
        return
    }

    const token = authorization.split(' ')[1];
    try{
        const { userId } = jwt.verify(token, process.env.SECRET_KEY ?? '') as JwtPayload;
        
        const service = new UserServices(appDataSource.getRepository(User));
        const user = await service.getUserById(userId);
        
        if (!user) {
            res.sendStatus(401)
            return
        }
        
        const { password: _, created_at: __, updated_at: ___, deleted_at: ____, ...loggedUser } = user;
        req.user = loggedUser;
        next();
    }catch(error){
        res.sendStatus(500)
        return 
    }
};
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import appDataSource from '../../infra/data-source';
import User from '../../infra/entities/user.entity';
import UserServices from '../../services/user.services';

type JwtPayload = {
    userId: number
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            throw new Error("Unauthorized");
        }

        const token = authorization.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.SECRET_KEY ?? '') as JwtPayload;

        const service = new UserServices(appDataSource.getRepository(User));
        const user = await service.getUserById(userId);

        if (!user) {
            throw new Error("Unauthorized");
        }

        const { password: _, ...loggedUser } = user;
        req.user = loggedUser;
        next();
    } catch (error) {
        next(error);
    }
};
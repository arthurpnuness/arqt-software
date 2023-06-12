import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../Helpers/api-errors";

import errorHandler from "./errorHandler";
import { usersRepo } from "../../features/User/Routes/users.routes";

export function checkUserId(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        if (!userId) {
            throw new BadRequestError('Obrigatório informar o ID do usuário!');
        }
        const user = usersRepo.find(userId);
        if (!user) {
            throw new NotFoundError('Usuário não encontrado');
        }
        next();
    } catch (err) {
        errorHandler(err, req, res);
    }
}
import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../Helpers/api-errors";
import errorHandler from "./errorHandler";
import { messagesRepo } from "../Routes/messages.routes";

export function checkMessageId(req: Request, res: Response, next: NextFunction) {
    try {
        const { messageId } = req.params;
        if (!messageId) {
            throw new BadRequestError('Obrigatório informar o ID da mensagem!');
        }
        const message = messagesRepo.find(messageId);
        if (!message) {
            throw new NotFoundError('Mensagem não encontrada');
        }
        next();
    } catch (err) {
        errorHandler(err, req, res);
    }
}
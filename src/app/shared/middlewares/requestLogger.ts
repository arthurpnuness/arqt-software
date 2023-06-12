import { NextFunction, Request, Response } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    const date = new Date().toLocaleTimeString('pt-BR', { hour12: false, 
        hour: "numeric", 
        minute: "numeric",
        second: "numeric"
    });
    console.log(`[${req.method}] Time: ${date} | Route: ${req.originalUrl}`);
    next();
}
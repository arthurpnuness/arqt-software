import { Request, Response } from 'express';
import { z } from 'zod';
import { ValidationError } from '../Helpers/api-errors';

function errorHandler(err:any, req: Request, res: Response) {
	const date = new Date().toLocaleTimeString('pt-BR', { hour12: false, 
		hour: "numeric", 
		minute: "numeric",
		second: "numeric"
	});

	if (err instanceof z.ZodError) {
		console.log(`[VALIDATION ERROR] Time: ${date} | Route: ${req.originalUrl} | Message: ${err.message}`);
		const issues = err.issues.map((issue) => ({ path: issue.path[0], message: issue.message }));
		return res.status(400).json(issues);
	}

	if (err instanceof ValidationError) {
		console.log(`[VALIDATION ERROR] Time: ${date} | Route: ${req.originalUrl} | Message: ${err.message}`);
		return res.status(err.statusCode).json({message: err.message, errors: err.errors});
	}

	console.log(`[ERROR] Time: ${date} | Route: ${req.originalUrl} | Message: ${err.message}`);
	const statusCode = err.statusCode ?? 500;
	const message = err.statusCode ? err.message : 'Internal Server Error';
	return res.status(statusCode).json({ message });
}

export default errorHandler;

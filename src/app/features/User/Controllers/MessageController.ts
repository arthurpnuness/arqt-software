import {  Request, Response } from 'express';
import Message from '../Models/Message';
import { IMessageRepository } from '../Repositories/Message/IMessageRepository';
import errorHandler from '../../../shared/middlewares/errorHandler';
import { BadRequestError, NotFoundError } from '../../../shared/Helpers/api-errors';

class MessageController {
	private repository: IMessageRepository;

	constructor(repository:IMessageRepository) {
		this.repository = repository;
	}

	async create(req: Request, res: Response) {
		try {
			const { subject, text } = req.body;
			const message = new Message({userId:req.params.userId, subject, text});
			const messageId = await this.repository.create(message);
			return res.status(201).json({...message.toObject(), id:messageId});
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async get(req: Request, res: Response) {
		try {
			let messages = await this.repository.getAllByUser(req.params.userId);
			if (req.query.active) {
				const status = req.query.active;
				if (status === 'true') {
					messages = messages.filter(message => message.is_active);
				} else if (status === 'false') {
					messages = messages.filter(message => !message.is_active);
				} else {
					throw new BadRequestError('O parâmetro "active" deve ser "true" ou "false"');
				}
			}
			if(req.query.search) {
				const search = String(req.query.search).toLowerCase();
				messages = messages.filter(message => {
					if(message.subject.toLowerCase().includes(search)) return true;
					if(message.text.toLowerCase().includes(search)) return true;
					return false;
				});
			}
			messages = messages.sort((a, b) => b.edited_at.getTime() - a.edited_at.getTime())
			return res.json(messages.map(message => message.toObject()));

		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async update(req: Request, res: Response) {
		try {
            const { subject, text, is_active } = req.body;
			const { messageId } = req.params;
            const message = await this.repository.find(messageId);
            if(!message) {
                throw new NotFoundError('Mensagem não encontrada');
            }
			if(subject) {
                message.subject = subject;
            }
            if(text) {
                message.text = text;
            }
            if(is_active) {
                message.is_active = is_active;
            }

			this.repository.edit(message);
			return res.sendStatus(204);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			if(!req.params.messageId) {
				throw new BadRequestError('Obrigatório informar o ID da mensagem!');
			}
			await this.repository.delete(req.params.messageId);

			return res.sendStatus(204);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	// async toggleStatus(req: Request, res: Response) {
	// 	try {
	// 		const { messageId } = req.params;
    //         const message = await this.repository.find(messageId);
    //         if(!message) {
    //             throw new NotFoundError('Mensagem não encontrada');
    //         }
	// 		message.is_active = !message.is_active;
	// 		this.repository.edit(message);
	// 		return res.sendStatus(204);
	// 	} catch (err) {
	// 		errorHandler(err, req, res);
	// 	}
	// }

	async archive(req: Request, res: Response) {
		try {
			const { messageId } = req.params;
            const message = await this.repository.find(messageId);
            if(!message) {
                throw new NotFoundError('Mensagem não encontrada');
            }
			message.is_active = false;
			this.repository.edit(message);
			return res.sendStatus(204);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async unarchive(req: Request, res: Response) {
		try {
			const { messageId } = req.params;
            const message = await this.repository.find(messageId);
            if(!message) {
                throw new NotFoundError('Mensagem não encontrada');
            }
			message.is_active = true;
			this.repository.edit(message);
			return res.sendStatus(204);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}
}

export default MessageController;

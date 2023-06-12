import {  Request, Response } from 'express';
import User, { userSchema } from '../Models/User';
import errorHandler from '../../../shared/middlewares/errorHandler';
import { IUserRepository } from '../Repositories/User/IUserRepository';
import { BadRequestError, NotFoundError } from '../../../shared/Helpers/api-errors';

class UserController {
	private repository: IUserRepository;

	constructor(repository:IUserRepository) {
		this.repository = repository;
	}

	async create(req: Request, res: Response) {
		try {
			const { name, email, password, avatar } = userSchema.parse(req.body);

			const user = new User({name, email, password, avatar: avatar ?? null});

			const id = await this.repository.create(user);
			user.id = id;
			return res.status(201).json(user.toObject());
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async get(req: Request, res: Response) {
		try {
			if(req.params.id) {
				const user = await this.repository.find(req.params.id);
				if(!user) throw new NotFoundError('Usuário não encontrado');
				return res.json(user.toObject());
			}

			const users = await this.repository.findAll();
			return res.json(users.map(user => user.toObject()));

		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async update(req: Request, res: Response) {
		try {
			if(!req.params.id) {
				throw new BadRequestError('Obrigatório informar o ID do usuário!');
			}

			const user = await this.repository.find(req.params.id);
			if(!user) {
				throw new NotFoundError('Usuário não encontrado');
			}

			for (const [key, value] of Object.entries(req.body)) {
				switch (key) {
				  case 'name':
					user.name = value as string;
					break;
				  case 'email':
					user.email = value as string;
					break;
				  case 'password':
					user.password = value as string;
					break;
				  case 'avatar':
					user.avatar = value as string;
					break;
				  case 'role':
					// TODO: Check if auth user is admin
					user.role = value as 'admin' | 'user';
					break;
				  default:
					throw new BadRequestError(`Propriedade inválida: ${key}`);
				}
			}

			await this.repository.edit(user);
			return res.sendStatus(204);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			if(!req.params.id) {
				throw new BadRequestError('Obrigatório informar o ID do usuário!');
			}
			await this.repository.delete(req.params.id);
			return res.sendStatus(204);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}
}

export default UserController;

import crypto from 'crypto';
import * as z from 'zod';

export const userSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
	email: z.string().email({ message: 'E-mail inválido' }),
	password: z
		.string()
		.min(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
		.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
			message: 'Senha inválida. Deve conter letras e números.',
		}),
	avatar: z
		.string()
		.url({ message: 'Avatar deve ter uma URL válida' })
		.optional()
        .nullable(),
});

export type UserSchema = z.infer<typeof userSchema>;
interface UserResource extends Omit<UserSchema, 'password'>  {
	id:string,
	role: string;
}

type UserConstructorType ={
	name: string;
	email: string;
	password: string;
	avatar?: string | null;
	id?: string | undefined;
	role?: string;
}

class User {
    public id:string;
	private _name: string = '';
	private _email: string = '';
	private _password: string = '';
	private _avatar: string | null = null;
	private _role: string = 'user';

	constructor({name, email, password, avatar, role, id}:UserConstructorType) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.id = (id) ? id : '';
		if(avatar) this.avatar = avatar;
		if(role) this.role = role;
	}

	setPassword(password: string): void {
		// const salt = crypto.randomBytes(16).toString('hex');
		// const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
		// this._password = `${salt}:${hash}`;
		this._password = password;
	}

	checkPassword(password: string): boolean {
        if(this._password) {
            const [salt, hash] = this._password.split(':');
            const testHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
            return hash === testHash;
        }
        return false;
	}

	validate(): UserSchema {
		const user = {
			name: this._name,
			email: this._email,
			password: this._password,
			avatar: this._avatar,
		};
		return userSchema.parse(user);
	}

	toObject(): UserResource {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			avatar: this.avatar,
			role: this._role,
		}
	}

	get is_admin(): boolean {
		return this._role === 'admin';
	}

	set role(role: string) {
		if(role !== 'admin' && role !== 'user') throw new Error('Tipo de usuário inválido!');
		this._role = role;
	}

	get name(): string {
		return this._name;
	}

	set name(name: string) {
		const nameSchema = userSchema.pick({ name: true });
		nameSchema.parse({ name }); 
		this._name = name;
	}

	get email(): string{
		return this._email!;
	}

	set email(email: string) {
		const emailSchema = userSchema.pick({ email: true });
		emailSchema.parse({ email }); 
		this._email = email;
	}

	set password(password: string) {
		// const passwordSchema = userSchema.pick({ password: true });
		// passwordSchema.parse({ password }); 
		this.setPassword(password);
	}

	get password(): string {
		return this._password;
	}

	get avatar(): string | null {
		return this._avatar;
	}

	set avatar(avatar: string | null) {
        const avatarSchema = userSchema.pick({ avatar: true });
		avatarSchema.parse({ avatar }); 
		this._avatar = avatar;
	}

	*[Symbol.iterator]() {
		const props = Object.entries(this).filter(([key, value]) => {
		  return !key.startsWith("_") && typeof value !== "function" || ['password', 'is_admin'].includes(key);
		});
		for (const [key, value] of props) {
		  yield [key, value];
		}
	}
}

export default User;

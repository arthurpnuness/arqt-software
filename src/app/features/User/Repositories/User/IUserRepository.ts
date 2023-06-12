import { Repository } from "typeorm";
import { UserEntity } from "../../database/entities/user.entity";
import User from "../../app/features/Models/User";

export interface IUserRepository {
    repository: Repository<UserEntity>;
    create: (user:User) => Promise<string>;
    edit: (user:User) => void;
    find: (id:string) => Promise<User | null>;
    findByEmail: (email:string) => Promise<User | null>;
    findAll: () => Promise<User[]>;
    delete: (id:string) => Promise<void>;
}
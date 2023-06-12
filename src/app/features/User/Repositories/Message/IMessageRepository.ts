import { Repository } from "typeorm";
import { MessageEntity } from "../../database/entities/messages.entity";
import Message from "../../app/features/Models/Message";
import User from "../../app/features/Models/User";
import { UserEntity } from "../../database/entities/user.entity";

export interface IMessageRepository {
    repository: Repository<MessageEntity>;
    create: (message:Message) => Promise<string>;
    edit: (message:Message) => void;
    find: (id:string) => Promise<Message | null>;
    getAllByUser: (userId:string) => Promise<Message[]>;
    delete: (id:string) => Promise<void>;
}
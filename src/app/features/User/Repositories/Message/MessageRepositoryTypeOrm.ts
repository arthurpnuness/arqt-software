
import { MessageEntity } from "../../../../../main/database/entities/messages.entity";
import { dataSource } from "../../../../../main/database/typeorm";
import Message from "../../Models/Message";
import { usersRepo } from "../../Routes/users.routes";
import { IMessageRepository } from "./IMessageRepository";

class MessageRepositoryTypeOrm implements IMessageRepository{
    public repository = dataSource.getRepository(MessageEntity);

    constructor() {}
    
    public async create(message:Message) {
        const entity = new MessageEntity();
        entity.user_id = message.userId;
        entity.subject = message.subject;
        entity.text = message.text;
        const savedMessage = await this.repository.save(entity);
        return savedMessage.id;
    }

    public async edit(message: Message) {
        const entity = new MessageEntity();
        entity.id = message.id ?? '';
        entity.subject = message.subject;
        entity.text = message.text;
        entity.is_active = message.is_active;
        return await this.repository.save(entity);
    }

    public async find(id:string) {
        const message = await this.repository.findOneBy({id});
        if(!message) return null;
        return new Message({
            id: message.id,
            subject: message.subject,
            text: message.text,
            is_active: message.is_active,
            userId: message.user_id,
            created_at: message.created_at,
            edited_at: message.updated_at
        });
    }

    public async getAllByUser(user_id:string) {
        const messages = await this.repository.findBy({user_id});
        return messages.map(message => new Message({
            id: message.id,
            subject: message.subject,
            text: message.text,
            is_active: message.is_active,
            userId: message.user_id,
            created_at: message.created_at,
            edited_at: message.updated_at
        }));
    }

    public async delete(id:string) {
        await this.repository.delete({id});
    }
}

export { MessageRepositoryTypeOrm }
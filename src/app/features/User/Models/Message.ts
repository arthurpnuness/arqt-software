import crypto from 'crypto';
import * as z from 'zod';

export const messageSchema = z.object({
	userId: z.string().uuid(),
	subject: z.string(),
	text: z.string(),
});

type MessageSchema = z.infer<typeof messageSchema>;
export interface MessageResource extends MessageSchema  {
    is_active?: boolean;
	id?:string | undefined,
    created_at?: Date;
    edited_at?: Date;
}

class Message {

    public id:string | undefined;
    public userId:string = '';
    public subject:string = '';
    public text:string = '';
    public is_active:boolean = true;
    public created_at:Date = new Date();
    public edited_at:Date = new Date();

    constructor({id, userId, subject, text, is_active, created_at, edited_at}:MessageResource) {
        if(id) this.id = id;
        this.userId = userId;
        this.subject = subject;
        this.text = text;
        if(is_active) this.is_active = is_active;
        if(created_at) this.created_at = created_at;
        if(edited_at) this.edited_at = edited_at;
    }

    toObject(): MessageResource {
		return {
			id: this.id ?? '',
			userId: this.userId,
			subject: this.subject,
			text: this.text,
            is_active: this.is_active,
			created_at: this.created_at,
            edited_at: this.edited_at,
		}
	}
}

export default Message;
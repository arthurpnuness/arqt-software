// import Message from "../../Models/Message";
// import { IMessageRepository } from "./IMessageRepository";

// class MessageRepository implements IMessageRepository{
//     public messages: Message[] = [];

//     constructor() {
//         this.seed();
//     }

//     private seed(): void {
//         // TODO: Implementar seed?
//     }
    
//     public create(user:Message): void {
//         this.messages.push(user);
//     }

//     public edit(message: Message): void {
//         const currentIndex = this.messages.map(e => e.id).indexOf(message.id);
//         this.messages.splice(currentIndex, 1, message);
//     }

//     public find(id:string) {
//         return this.messages.find(message => message.id === id);
//     }

//     public getAllByUser(userId:string): Message[] {
//         return this.messages.filter(message => message.userId === userId) ?? [];
//     }

//     public delete(id:string): boolean {
//         const currentIndex = this.messages.map(e => e.id).indexOf(id);
//         if(currentIndex === -1) return false;
//         this.messages.splice(currentIndex, 1);
//         return true;
//     }
// }

// export { MessageRepository }
// import { ConflictError } from "../../Helpers/api-errors";
// import User from "../../Models/User";
// import { IUserRepository } from "./IUserRepository";

// class UserRepository implements IUserRepository{
//     public users: User[] = [];

//     constructor() {
//         this.seed();
//     }

//     private seed(): void {
//         const usuariosSeed = [
//             new User({
//                 name:'Bruno Berwian', 
//                 email:'bruno@teste.com', 
//                 password:'abc123', 
//                 avatar:'https://avatars.githubusercontent.com/u/108753181?v=4', 
//                 role: 'admin'
//             }),
//             new User({
//                 name:'Ana Banana', 
//                 email:'anabanana@gmail.com', 
//                 password:'abc123', 
//                 avatar:'https://media.discordapp.net/attachments/1090782906974212149/1095173364034834562/Bruno_Berwian_ana_banana_3799c2d7-0c89-4004-bd07-c0a204553370.png', 
//             }),
//         ];
//         usuariosSeed.forEach(u => this.create(u));
//     }
    
//     public create(user:User): void {
//         const userExistente = this.users.find(u => u.email === user.email);
//         if(userExistente) {
//             throw new ConflictError('Um usuário já está utilizando esse email!');
//         }
//         this.users.push(user);
//     }

//     public edit(user: User): void {
//         const currentIndex = this.users.map(e => e.id).indexOf(user.id);
//         this.users.splice(currentIndex, 1, user);
//     }

//     public find(id:string) {
//         return this.users.find(user => user.id === id);
//     }

//     public findByEmail(email:string) {
//         return this.users.find(user => user.email === email);
//     }

//     public findAll(): User[] {
//         return this.users;
//     }

//     public delete(id:string): boolean {
//         const currentIndex = this.users.map(e => e.id).indexOf(id);
//         if(currentIndex === -1) return false;
//         this.users.splice(currentIndex, 1);
//         return true;
//     }
// }

// export { UserRepository, IUserRepository }
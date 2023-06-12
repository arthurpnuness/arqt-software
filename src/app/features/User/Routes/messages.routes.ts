import { Router } from "express";
import { MessageRepositoryTypeOrm } from "../Repositories/Message/MessageRepositoryTypeOrm";
import MessageController from "../Controllers/MessageController";

const messagesRoutes = Router({ mergeParams: true });

const messagesRepo = new MessageRepositoryTypeOrm();
const messageController = new MessageController(messagesRepo);

messagesRoutes.get('/', (req, res) => messageController.get(req,res));
messagesRoutes.post('/', (req, res) => messageController.create(req,res));
messagesRoutes.patch('/:messageId?', (req, res) => messageController.update(req,res));
messagesRoutes.patch('/:messageId?/archive', (req, res) => messageController.archive(req,res));
messagesRoutes.patch('/:messageId?/unarchive', (req, res) => messageController.unarchive(req,res));
messagesRoutes.delete('/:messageId?', (req, res) => messageController.delete(req,res));

export { messagesRoutes, messagesRepo };
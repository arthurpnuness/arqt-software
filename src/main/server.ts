import express, { Request, Response } from 'express';
import 'express-async-errors';
import { checkUserId } from '../app/shared/middlewares/checkUserId';
import { messagesRoutes } from '../app/features/User/Routes/messages.routes';
import { authRoutes } from '../app/features/User/Routes/auth.routes';
import { authMiddleware } from '../app/shared/middlewares/AuthMiddleware';
import cors from 'cors';
import { pgHelper } from './database/pg-helper';
import { requestLogger } from '../app/shared/middlewares/requestLogger';
import { usersRoutes } from '../app/features/User/Routes/users.routes';

require('dotenv').config();

console.log(process.env.DATABASE)
const asyncErrors = require('express-async-errors');
const app = express();

app.use([express.json(), cors(), requestLogger]);

// Rotas Publicas
app.use('/auth', authRoutes);

// Rotas Privadas
app.use('/users', authMiddleware, usersRoutes);
app.use('/user/:userId/messages', authMiddleware, checkUserId, messagesRoutes);

pgHelper.connect()
    .then(() => {
        app.listen(8081, () => console.log('Server online em: http://localhost:8081'));
    }).catch(err => console.log(err));

export default app;
import express from 'express'
import { userconectionreq } from '../controlonlytext/conectionreq.js';
import loginMiddleware from '../midleware/loginmidleware.js';

const userConnectionRouter = express.Router();

userConnectionRouter.post('/conection', loginMiddleware, userconectionreq)
export default userConnectionRouter
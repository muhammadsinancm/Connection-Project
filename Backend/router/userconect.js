import express from 'express'
import { userconectionreq } from '../controlonlytext/conectionreq.js';

const userConnectionRouter = express.Router();

userConnectionRouter.post('/conection', userconectionreq)
export default userConnectionRouter
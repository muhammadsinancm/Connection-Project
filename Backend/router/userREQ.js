import express from 'express'
import { REQList, userREQ, userREQDelete } from '../controls/userRequest.js';
import loginMiddleware from '../midleware/loginmidleware.js';

const requestRouter = express.Router();

requestRouter.post('/request',loginMiddleware, userREQ)
requestRouter.get('/requestlist', REQList)
requestRouter.delete('/userunrequest/:cancelREQ', loginMiddleware, userREQDelete)

export default requestRouter
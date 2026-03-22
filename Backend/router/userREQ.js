import express from 'express'
import { REQList, userAccept, userIgnore, userMessageAllow, userProfileDatas, userREQ, userREQDelete } from '../controls/userRequest.js';
import loginMiddleware from '../midleware/loginmidleware.js';

const requestRouter = express.Router();

requestRouter.post('/request',loginMiddleware, userREQ)
requestRouter.get('/requestlist',loginMiddleware ,REQList)
requestRouter.delete('/userunrequest/:cancelREQ', loginMiddleware, userREQDelete)
requestRouter.post('/accept',loginMiddleware ,userAccept)
requestRouter.delete('/ignore/:userIgnoreData',loginMiddleware ,userIgnore)
requestRouter.put('/messageallow/:token', loginMiddleware,userMessageAllow)
requestRouter.post('/userProfile',loginMiddleware ,userProfileDatas)

export default requestRouter
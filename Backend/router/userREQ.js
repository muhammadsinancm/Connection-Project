import express from 'express'
import { REQList, userAccept, userIgnore, userMessageAllow, userREQ, userREQDelete } from '../controls/userRequest.js';
import loginMiddleware from '../midleware/loginmidleware.js';

const requestRouter = express.Router();

requestRouter.post('/request',loginMiddleware, userREQ)
requestRouter.get('/requestlist', REQList)
requestRouter.delete('/userunrequest/:cancelREQ', loginMiddleware, userREQDelete)
requestRouter.post('/accept', userAccept)
requestRouter.delete('/ignore', userIgnore)
requestRouter.put('/messageallow/:token', userMessageAllow)
// requestRouter.delete('/acceptedremove/:permanent', acceptedDataRemove)

export default requestRouter
import express from 'express';
import { userInputsDelete, userInputsForStoring, userInputsShow } from '../controls/userInputs.js';
import loginMiddleware from '../midleware/loginmidleware.js';

const userInputsRouter = express.Router()

userInputsRouter.post('/userinputrecive', loginMiddleware, userInputsForStoring)
userInputsRouter.post('/userinputsent', loginMiddleware, userInputsShow)
userInputsRouter.delete('/userinputdelete/:EventDelete', loginMiddleware, userInputsDelete)

export default userInputsRouter
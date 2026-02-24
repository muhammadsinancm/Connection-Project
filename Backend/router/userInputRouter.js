import express from 'express';
import { userInputsDelete, userInputsForStoring, userInputsShow } from '../controls/userInputs.js';

const userInputsRouter = express.Router()

userInputsRouter.post('/userinputrecive', userInputsForStoring)
userInputsRouter.post('/userinputsent', userInputsShow)
userInputsRouter.delete('/userinputdelete', userInputsDelete)

export default userInputsRouter
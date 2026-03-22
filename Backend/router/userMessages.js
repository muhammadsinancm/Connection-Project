import express from 'express'
import { userInputToHomePage } from '../controls/userInformToDisplay.js'
import loginMiddleware from '../midleware/loginmidleware.js'

const userMessagesRouter = express.Router()

userMessagesRouter.post('/usermessage', loginMiddleware, userInputToHomePage)

export default userMessagesRouter
import express from 'express'
import cors from 'cors'
import USERDATABASE from './config/mongoDB.js'
import 'dotenv/config'
import UserControl from './router/userLoginSign.js'
import userConnectionRouter from './router/userconect.js'
import requestRouter from './router/userREQ.js'
import userInputsRouter from './router/userInputRouter.js'
import userMessagesRouter from './router/userMessages.js'
import adminRouter from './router/adminlogin.js'
import {createServer} from 'node:http'
import { Server } from 'socket.io'
import userEmails from './socket/socketIO.js'

const app = express()
const Port = process.env.PORT || 4000
USERDATABASE()

const server = createServer(app)
const io = new Server(server, {
    transports: ["websocket", "polling"],
    cors:{
        origin:"https://connection-project-frontend.onrender.com",
        methods:["GET", "POST", "PUT", "DELETE"]
    },
    connectionStateRecovery:{}
})

app.set('io', io)
app.use(express.json())
app.use(cors())

io.on('connection', async (socket)=> {
    console.log('user connected');
})

userEmails(io)

app.use('/api/users', UserControl)
app.use('/api/userreq', userConnectionRouter)
app.use('/api/user', requestRouter)
app.use('/api/usertext', userInputsRouter)
app.use('/api', userMessagesRouter)
app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
    res.send('workking')
})

server.listen(Port, () => console.log('port is runnig'))
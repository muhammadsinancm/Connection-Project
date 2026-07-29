import express from 'express'
import cors from 'cors'
import USERDATABASE from './config/mongoDB.js'
import 'dotenv/config'
import UserControl from './router/userLoginSign.js'
import userConnectionRouter from './router/userconect.js'
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
        origin:"http://localhost:5173/",
        methods:["GET", "POST", "PUT", "DELETE"]
    },
    connectionStateRecovery:{}
})

app.set('io', io)
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

io.on('connection', async (socket)=> {
    console.log('user connected');
})

userEmails(io)

app.use('/api/users', UserControl)
app.use('/api/userreq', userConnectionRouter)
app.use('/api/admin', adminRouter)

app.get('/', (req, res) => {
    res.send('workking')
})

server.listen(Port, () => console.log('port is runnig'))

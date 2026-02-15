import express from 'express'
import cors from 'cors'
import USERDATABASE from './config/mongoDB.js'
import 'dotenv/config'
import UserControl from './router/userLoginSign.js'
import userConnectionRouter from './router/userconect.js'
import requestRouter from './router/userREQ.js'

const app = express()
const Port = process.env.PORT || 4000
USERDATABASE()

app.use(express.json())
app.use(cors())

app.use('/api/users', UserControl)
app.use('/api/userreq', userConnectionRouter)
app.use('/api/user', requestRouter)

app.get('/',(req, res)=> {
    res.send('workking')
})




app.listen(Port, ()=> console.log('port is runnig'))
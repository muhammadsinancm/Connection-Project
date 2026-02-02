import express from 'express'
import cors from 'cors'
import USERDATABASE from './config/mongoDB.js'
import 'dotenv/config'
import TextRouter from './router/router.js'
import UserControl from './router/userLoginSign.js'

const app = express()
const Port = process.env.PORT || 4000
USERDATABASE()

app.use(express.json())
app.use(cors())

app.use('/api/user', TextRouter)
app.use('/api/users', UserControl)

app.get('/',(req, res)=> {
    res.send('workking')
})




app.listen(Port, ()=> console.log('port is runnig'))
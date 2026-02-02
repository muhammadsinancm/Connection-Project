import mongoose from 'mongoose'

const USERDATABASE = async () => {
    
    mongoose.connection.on('connected',()=> {
        console.log('data base conected')
    })

  await mongoose.connect(`${process.env.MONGO_DB_LINK}/connection-app`)

}

 export default USERDATABASE
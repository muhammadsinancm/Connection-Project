import express, { json } from 'express'
import jwt from 'jsonwebtoken'
import UserDataSignLogin from '../models/userdatasignlogin.js';
import REQ from '../models/userReq.js';

const admin = async (req, res) => {

try {

    const {adminEmail, adminPassword} = req.body;
    
    if (adminEmail === process.env.ADMIN_EMAIL && adminPassword === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(adminEmail+adminPassword, process.env.JWT_SECRET)
        res.json({success:true, token})
        
    } else {
        res.json({success:false, message:'Invalid credentials'})
    }
    
} catch (error) {
    console.log(error.message);
    res.json({success:false, message:error.message})
}

}

const userEmailsList = async (req, res) => {

try {

  const userEmails = await UserDataSignLogin.find()
  if (!userEmails) {
    res.json({success:false, message:'user Emails not found'})
  }

  res.json({success:true, userEmails})
    
} catch (error) {
    console.log(error.message);
    res.json({success:false, message:error.message})
}

}

const userRequestList = async (req, res)=> {

   try {

    const userRequest = await REQ.find()
    if (userRequest) {
        res.json({success:true, userRequest})
    } else {
        res.json({success:true, message:'request not found'})
    }
    
   } catch (error) {
    console.log(error.message);
    res.json({success:false, message:error.message})
   }

}


const userEmailDelete = async (req, res)=> {

    try {

        const userDeleteEmail = req.params.user
        if (!userDeleteEmail) {
            res.json({success:false, message:'can not find user ID'})
        }

        await UserDataSignLogin.findByIdAndDelete({_id:userDeleteEmail})
        res.json({success:true, message:'email deleted'})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

const adminRouter = express.Router()
adminRouter.post('/login', admin)
adminRouter.get('/userEmaillist', userEmailsList)
adminRouter.get('/userrequestlist', userRequestList)
adminRouter.delete('/deleteuseremail/:user', userEmailDelete)

export default adminRouter
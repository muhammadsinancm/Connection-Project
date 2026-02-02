import express from 'express';
import UserDataSignLogin from '../models/userdatasignlogin.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import loginMidleware from '../midleware/loginmidleware.js';

const UserControl = express.Router()

const createUserToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const userLogin = async (req, res)=> {

    try {

        const {email, password} = req.body;

        const userEmailFind = await UserDataSignLogin.findOne({email})

        if (!userEmailFind) {
            res.json({success:false, message:'User does not exist'})
        }
        
        const isMatch = await bcrypt.compare(password, userEmailFind.password)
        if (isMatch) {
            const token = createUserToken(userEmailFind._id)
            res.json({success:true, token})
        }

        
        
    } catch (error) {
        console.log(error.message);
        
    }

}

const userSing = async (req, res)=> {

    try {

        const { firstName, lastName, email, password } = req.body;

        const userEmailCheck = await UserDataSignLogin.findOne({ email })

        if (userEmailCheck) {
           return res.json({ success: false, message: 'User already exist' })
        }
         if (!validator.isEmail(email)) {
           return res.json({ success: false, message: 'Invalid Email Address' })
        }
         if (password.length < 8) {
           return res.json({ success: false, message: 'Password must be at least 8 characters' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);
        
        const newUserData = await new UserDataSignLogin({
            firstName,
            lastName,
            email,
            password:hashedPassword
        })

        const userDataSave = await newUserData.save()
        const token = createUserToken(userDataSave._id)

        res.json({success:true, token})
        console.log('done');
        
console.log(token);

    } catch (error) {
        console.log(error.message);

    }

}



UserControl.post('/login', userLogin)
UserControl.post('/sign', userSing)

export default UserControl
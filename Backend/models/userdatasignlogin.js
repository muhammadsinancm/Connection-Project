import mongoose from "mongoose";

const userDataSignLoginScheema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
})

const UserDataSignLogin = mongoose.models.userloginsignup || mongoose.model('userloginsignup', userDataSignLoginScheema)
export default UserDataSignLogin
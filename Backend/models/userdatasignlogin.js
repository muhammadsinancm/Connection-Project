import mongoose from "mongoose";

const userDataSignLoginScheema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    token:{type:String, default:null},
    notification:{type:String, default:null},
    request:{type:String, default:null}
})

const UserDataSignLogin = mongoose.models.userloginsignup || mongoose.model('userloginsignup', userDataSignLoginScheema)
export default UserDataSignLogin
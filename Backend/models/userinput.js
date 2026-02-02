import mongoose from "mongoose";

const userInputScheema = new mongoose.Schema({
    userInput: {type:String, required:true},
})

const Texts = mongoose.models.input || mongoose.model('input', userInputScheema)
export default Texts
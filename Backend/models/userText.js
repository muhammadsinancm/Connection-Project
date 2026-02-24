import mongoose from "mongoose";

const userTextScheema = new mongoose.Schema({
    userText: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    sendingUserToken: { type: String, required: true },
    recivedUserToken: { type: String, required: true }
})

const usersText = mongoose.models.textsOfUsers || mongoose.model('textsOfUsers', userTextScheema)

export default usersText
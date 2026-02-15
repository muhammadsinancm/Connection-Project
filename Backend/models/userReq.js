import mongoose from "mongoose";

const userREQScheema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: true },
    request: { type: String, required: true },
    reciver: { type: String, required: true }
})

const REQ = mongoose.models.reqest || mongoose.model('reqest', userREQScheema)

export default REQ
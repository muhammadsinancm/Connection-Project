import UserDataSignLogin from "../models/userdatasignlogin.js"
import REQ from "../models/userReq.js"
import usersText from "../models/userText.js"

//////////
let emails = []
const userEmailList = async () => {
  emails = await UserDataSignLogin.find()
}
userEmailList()
///////////////

const userEmails = async (io) => {

  io.on('connection', async (socket) => {

     const token = socket.handshake.auth.token

    socket.on('user token sent to server', async (token) => {
      const findData = await UserDataSignLogin.findOne({ token: token })
      socket.emit('responce for client', findData)
    })

//A client requested_____________________
    socket.on('request user data to server', async (userRequestData, token) => {

      const roomId = [token, userRequestData?.token].sort().join('-')
      socket.join(roomId)
            console.log(`Joined room: ${roomId}`);
      try {

          const requestUser = await UserDataSignLogin.find({ token: token })

      const saveUsersREQ = await new REQ({
        firstName: requestUser[0]?.firstName,
        lastName: requestUser[0]?.lastName,
        email: requestUser[0]?.email,
        token: requestUser[0]?.token,
        request: userRequestData?.token,
        reciver: userRequestData?.email,
        roomId: roomId
      })
      const savedREQ = await saveUsersREQ.save();
      io.except(roomId).emit('server responce', savedREQ)

       const updatedReq = await REQ.find()
        io.to(roomId).emit('user request', updatedReq)
        io.to(roomId).emit('user request list', updatedReq)
        
      } catch (error) {
        console.log(error.message);
        socket.emit('Something went wrong')
      }

    })
//A client requested_____________________

// user request cancel or unfollow_____________________
socket.on('user request cancel or unfollw', async (cancelREQ, token, cancel)=> {
  console.log(cancelREQ, 'email');
  console.log(token , 'token');
  console.log(cancel, 'cancel user data');
  
try {

  const roomId = [token, cancel?.token].sort().join('-')

   const testing = await REQ.findOneAndDelete({ reciver: cancelREQ, token: token, roomId: roomId })
   const deleteRequest = await REQ.find()
  
   io.to(roomId).emit('user request', deleteRequest, cancelREQ, testing)
   io.to(roomId).emit('user deleted', deleteRequest)
   io.to(roomId).emit('previos delete', deleteRequest)
   io.except(roomId).emit('previos delete', deleteRequest) 

} catch (error) {
  console.log(error.message);
  socket.emit('can not delete the data')
}
})
// user request cancel or unfollow_____________________

socket.on('ingore user', async (userIgnoreData) => {
try {
  
  const testing = await REQ.findOneAndDelete({_id: userIgnoreData})
   const deleteRequest = await REQ.find()
     io.emit('previos delete', deleteRequest)
   socket.emit('previos delete', deleteRequest) 

} catch (error) {
  console.log(error.message);
  socket.emit('can not ingore the request')
}
})

    socket.on('accept user request', async (userAcceptData, token) => {
      try {

        const roomId = [token, userAcceptData?.token].sort().join('-')
        socket.join(roomId)

        const userReq = await REQ.find({ token: userAcceptData.token, request: token, roomId: roomId })
        if (userReq.length > 0) {
          const saving = await REQ.findOneAndUpdate(
            { _id: userReq[0]._id },
            { $set: { accepted: true } },
            { new: true }
          )
            io.to(roomId).emit('accept', saving)
        }          

      } catch (error) {
        console.log(error.message);
        socket.emit('can not accept the request')
      }
    })

socket.on('message allow', async (hereUserToken, requestedUserToken)=> {
   try {

    const roomId = [hereUserToken, requestedUserToken].sort().join('-')
    socket.join(roomId)

        const messageallowTtrue = await REQ.find({accepted: true, token: hereUserToken, roomId: roomId})
               socket.emit('previos accept', messageallowTtrue)     
        
      } catch (error) {
        console.log(error.message);
        socket.emit('can not fetch the data')
      }
})

socket.on('message join', async (token, selectedUser)=> {
const roomId = [token, selectedUser].sort().join('-')
socket.join(roomId)
})

socket.on('message join token', async (token)=> {
const roomId = [token].sort().join('-')
socket.join(roomId)
})

// Message sent and recive_____________________
socket.on('user message send', async (token, selectedUser, saveUserText)=> {
   try {

    const roomId = [token, selectedUser].sort().join('-')

     const saveUserTextData = await new usersText({
                userText: saveUserText,
                sendingUserToken: token,
                recivedUserToken: selectedUser,
                roomID:roomId,
                date: Date.now()
            })
  
          const savedText = await saveUserTextData.save();
            io.to(roomId).emit('user message show', savedText)
            io.emit('user message', savedText)
    
   } catch (error) {
    console.log(error.message);
    socket.emit('message not found')
   }
})
// Message sent and recive_____________________

socket.on('user message previos', async (token, reciverToken)=> {
  const roomId = [token, reciverToken].sort().join('-')

 const userTextsToFrontend = await usersText.find({roomID: roomId}).sort({ date: 1 });
         socket.emit('user message previos', userTextsToFrontend)
})

    socket.on('user message delete', async (token, reciverToken, messageId) => {
      const roomId = [token, reciverToken].sort().join('-')

      try {

        await usersText.findByIdAndDelete(messageId)

        const messageDeleted = await usersText.find({ roomID: roomId }).sort({ date: 1 })
        console.log(messageDeleted);

        io.emit('user message deleted', messageDeleted)

      } catch (error) {
        console.log(error.message);
        socket.emit('can not delete the message')
      }
    })

// initial data send to client_____________________
    socket.on('initial datas', async ()=> {

      try {

         const Req = await REQ.find()
    socket.emit('user emails to serch component', emails)
    io.emit('user request', Req)
         
      } catch (error) {
        console.log('can not fetch initial data');
      }
    })
    socket.on('disconnect', () => {
            console.log("User disconnected");
        });
  })
}
// initial data send to client_____________________
export default userEmails
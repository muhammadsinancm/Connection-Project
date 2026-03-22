import REQ from "../models/userReq.js";
import usersText from "../models/userText.js";

const userInputToHomePage = async (req, res) => {

   try {

    const {token} = req.body;

    const userData = await REQ.find()

    if (!userData) {
        res.json({success:false, message:'can not find user data'})
    }

    const userTexts = await usersText.find({recivedUserToken:token})



       const usersTextAndDataMatch = userData.filter((items) => (
           items?.request === token
       ))

    let datas = await Promise.all(userTexts.map((items)=> {
        const matchedUser = usersTextAndDataMatch.find((user)=> user?.token === items?.sendingUserToken)
        
        if (matchedUser) {
            return usersText.findOneAndUpdate(
                {_id:items._id},
                {$set:{emailForUser:matchedUser.email}},
                {new:true}
            )
        }
    }))               

            
               res.json({ success: true, message: 'can find user data', datas })
           
   } catch (error) {
    console.log(error.message);
    
   }

}


export{
    userInputToHomePage
}
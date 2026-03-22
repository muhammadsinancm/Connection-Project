import UserDataSignLogin from "../models/userdatasignlogin.js";
import REQ from "../models/userReq.js";


const userREQ = async (req, res) => {
    const { userData, token } = req.body;

    try {

        if (!userData) {
            console.log('here did not reached');
            res.json({ success: false, message: 'here did not reached' })
        }

        if (userData) {

            const requestUser = await UserDataSignLogin.find({token:token})
            console.log('////////////////////Toekn');
            console.log(token);
            
            console.log(requestUser[0]?.token);
             console.log('////////////////////Token');

            const saveUsersREQ = await new REQ({
                firstName: requestUser[0]?.firstName,
                lastName: requestUser[0]?.lastName,
                email: requestUser[0]?.email,
                token:requestUser[0]?.token,
                request:userData?.token,
                reciver:userData?.email
            })

            const savedREQ = await saveUsersREQ.save();
            console.log('++++++++++++++++++');
            console.log(savedREQ);
                        console.log('++++++++++++++++++');

            const testSaveReq = await REQ.find()
            console.log('|||||||||||||||||||||||');
            console.log(testSaveReq);
             console.log('|||||||||||||||||||||||');
            
            
            res.json({ success: true, message: 'Request sent', savedREQ })
        }

    } catch (error) {
        console.log(error.message);

    }

}

const REQList = async (req, res) => {

    try {

        const orginal = await REQ.find()

        if (!orginal) {
            res.json({ success: false, message: 'not found' })
        }

        res.json({ success: true, orginal })

    } catch (error) {
        console.log(error.message);

    }

}

const userREQDelete = async (req, res) => {

    try {  
        const token = req.headers.token
        const reciver = req.params.cancelREQ;       

        console.log('*************RemoveREQ');
        console.log(reciver);
        console.log(token);
        
        console.log('*************RemoveREQ');


        if (!reciver) {
            res.json({ success: false, message: 'not found' })
        }   

  await REQ.findOneAndDelete({ reciver: reciver, token:token})
      
        res.json({ success: true, message: 'request removed' })

         const testing = await REQ.find()
        console.log('[][][][][][][][][][]');
        console.log(testing);
                console.log('[][][][][][][][][][]');

    } catch (error) {
        console.log(error.message);
    }

}

const userAccept = async (req, res)=> {

    const {userAcceptData, token, storeRequest} = req.body;
console.log('/////////////userAcceptedData');
console.log(userAcceptData);
console.log('/////////////userAcceptedData');

console.log('*********REQ');
const testing = await REQ.find()
console.log(testing);
console.log('*********REQ');


    try {

        if (!userAcceptData) {
            res.json({success:false, message:'no data found'})
        }
console.log(token);

        const userReq = await REQ.find({token:userAcceptData.token, request: token})
console.log(userReq[0]?._id);

        if (userReq) {
           const saving = await REQ.findOneAndUpdate(
                {_id: userReq[0]._id},
                {$set: {accepted: true}},
                {new: true}
            )
            console.log(saving);
             console.log(userAcceptData.token);
        res.json({success:true, message:'perfect', saving})
        }
    
    } catch (error) {
        console.log(error.message);   
    }

}

const userMessageAllow = async (req, res) => {

    const hereUserToken = req.params.token

    try {

        const messageallowTtrue = await REQ.find()

        const filterConnectionAllow = messageallowTtrue.filter((itmes)=> (
            itmes?.accepted === true && itmes?.token === hereUserToken
        ))
        console.log('///////////////MessageAllow'); 
        console.log(hereUserToken);
        
        console.log(messageallowTtrue);
        
        console.log(filterConnectionAllow);
        console.log('///////////////MessageAlow');
        
        if (!filterConnectionAllow) {
            res.json({ success: false, message: 'can not find' })
        }

        res.json({ success: true, filterConnectionAllow })

    } catch (error) {
        console.log(error.message);

    }

}

const userProfileDatas = async (req, res) => {
    try {

        const {token} = req.body

        const userDataFinding = await UserDataSignLogin.findOne({token:token})

        if (!userDataFinding) {
            res.json({success:false, message:'can not find user data'})
        }

        res.json({success:true, userDataFinding})
        
    } catch (error) {
        console.log(error.message);
        
    }
}


const acceptremove = async (req, res)=> {

    try {
        
    } catch (error) {
        
    }
   
}

const userIgnore = async (req, res)=> {

    const removeReq = req.params.userIgnoreData
    const token = req.headers.token

    try {
        
     const removeUserREQ = await REQ.findOneAndDelete({token:removeReq, request:token})
     if (!removeUserREQ) {
        res.json({success:false, message:'data not find'})
     }

     res.json({success:true, message:'remove user notification'})
        
    } catch (error) {
        console.log(error.message);
    }

}

export {
    userREQ, REQList, userREQDelete, userAccept, userIgnore, userMessageAllow, userProfileDatas
}
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

            const requestUser = await UserDataSignLogin.findOne({token:token})
            console.log('////////////////////');  
            console.log(requestUser?.token);
             console.log('////////////////////');

            const saveUsersREQ = await new REQ({
                firstName: requestUser.firstName,
                lastName: requestUser.lastName,
                email: requestUser.email,
                token:requestUser.token,
                request:userData.token,
                reciver:userData.email
            })

            const savedREQ = await saveUsersREQ.save();
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

        const reciver = req.params.cancelREQ;       

        if (!reciver) {
            res.json({ success: false, message: 'not found' })
        }

  await REQ.findOneAndDelete({ reciver: reciver })
      
        res.json({ success: true, message: 'request removed' })  

    } catch (error) {
        console.log(error.message);
    }

}

const userAccept = async (req, res)=> {

    const {userAcceptData, token, storeRequest} = req.body;
console.log('/////////////');
console.log(storeRequest);
console.log('/////////////');

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
            itmes.accepted === true && itmes.token === hereUserToken
        ))      
        console.log('///////////////'); 
        console.log(filterConnectionAllow);
        console.log('///////////////');


        
        
        if (!filterConnectionAllow) {
            res.json({ success: false, message: 'can not find' })
        }

        res.json({ success: true, filterConnectionAllow })

    } catch (error) {
        console.log(error.message);

    }

}

// const acceptedDataRemove = async (req, res)=> {
    
//     const frontendData = req.params.permanent

//     console.log('**************************');
//     console.log(frontendData);
//     console.log('**************************');

//     try {

//         const findAcceptedDataAndRemove = await REQ.findOneAndDelete({token:frontendData})
// console.log('----------------------------------------');
// console.log(findAcceptedDataAndRemove);
// console.log('----------------------------------------');


//         res.json({success:true, findAcceptedDataAndRemove})

//     } catch (error) {
//         console.log(error.message);
        
//     }
    
// }

const acceptremove = async (req, res)=> {

    try {
        
    } catch (error) {
        
    }
   
}

const userIgnore = async ()=> {

}

export {
    userREQ, REQList, userREQDelete, userAccept, userIgnore, userMessageAllow
}
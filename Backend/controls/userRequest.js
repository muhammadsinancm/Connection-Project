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
            // console.log('////////////////////');  
            // console.log(requestUser[0]?.token);
            //  console.log('////////////////////');

            const saveUsersREQ = await new REQ({
                firstName: requestUser.firstName,
                lastName: requestUser.lastName,
                email: requestUser.email,
                token:requestUser.token,
                request:userData.token,
                reciver:userData.email
            })
// console.log('***********************');
// console.log(saveUsersREQ);
// console.log('***********************');


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

        // const orginal = listOfREQ.filter((items, index, self) => (
        //     index === self.findIndex(prev => prev.email === items.email)
        // ))

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

export {
    userREQ, REQList, userREQDelete
}
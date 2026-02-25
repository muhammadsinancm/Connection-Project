import usersText from "../models/userText.js";



const userInputsForStoring = async (req, res)=> {

    try {

        const {saveUserText, sendingUserToken, recivedUserToken} = req.body;

        if (!saveUserText && sendingUserToken && recivedUserToken) {
            res.json({success:false, message:'Text not found'})
        }

        const saveUserTextData = await new usersText({
            userText: saveUserText,
            sendingUserToken:sendingUserToken,
            recivedUserToken:recivedUserToken
        })

        const savedUserTextandDatas = await saveUserTextData.save();

        res.json({success:true, message:'Text arrived there', savedUserTextandDatas})
        
    } catch (error) {
        console.log(error.message);
        
    }

}

const userInputsShow = async (req, res) => {

    try {

        const {sendingUserToken, recivedUserToken, token} = req.body;
// console.log(token);

        const userTextsToFrontend = await usersText.find()
        if (!userTextsToFrontend) {
            res.json({ success: false, message: 'message can not find' })
        }


        const userMessage = userTextsToFrontend.filter((itmes)=> (
          itmes.recivedUserToken === token
        ))

        res.json({ success: true, userTextsToFrontend, userMessage })

    } catch (error) {
        console.log(error.message);

    }

}

const userInputsDelete = (req, res)=> {

}

export {
    userInputsForStoring,
    userInputsShow,
    userInputsDelete
}
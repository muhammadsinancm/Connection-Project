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
            recivedUserToken:recivedUserToken,
            date:Date.now()
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

const userInputsDelete = async (req, res)=> {

    try {

        const reciver = req.params.EventDelete
        console.log('*****************-*-*-*----------------');
        console.log(reciver);
                console.log('*****************-------------');
        
        if (!reciver) {
            res.json({success:false, message:'data can not reached'})
        }

        await usersText.findByIdAndDelete({_id:reciver})

        res.json({success:true, message:'message deleted'})

        
        
    } catch (error) {
        console.log(error.message);
        
    }

}

export {
    userInputsForStoring,
    userInputsShow,
    userInputsDelete
}
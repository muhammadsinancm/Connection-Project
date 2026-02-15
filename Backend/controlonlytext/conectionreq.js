import UserDataSignLogin from "../models/userdatasignlogin.js";

const store = []

const userconectionreq = async (req, res) => {
  const { userData, token } = req.body;
store.push(userData)
  try {

    const userFindConection = await UserDataSignLogin.findOne({ token: userData.token })

    if (!userFindConection) {
      res.json({ success: false, message: 'not found' })
      console.log('not found');
      return res.json({ success: false, message: 'not found' });

    }

    if (userFindConection) {
      userFindConection.notification = token
      await userFindConection.save()
    console.log(userFindConection);
    
       console.log('true');
   return res.json({ success: true, message:'sent your token key', userFindConection})

    }


  } catch (error) {
    console.log(error.message);

  }

}

export {
  userconectionreq
}
import Texts from '../models/userinput.js'

const textAdd = async (req, res) => {
    const { userInput } = req.body;
    console.log(userInput);

    const newText = new Texts({
        userInput,
    })
    const text = await newText.save()
    console.log(text);

    res.json({ success: true, message: 'save' })

}

const textDelete = async () => {

}

export {
    textAdd, textDelete
}
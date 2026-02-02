import express from 'express'
import { textAdd } from '../controlonlytext/text.js'

const TextRouter = express.Router()

TextRouter.post('/text', textAdd)

export default TextRouter
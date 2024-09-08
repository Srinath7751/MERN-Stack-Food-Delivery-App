import express from 'express'
import { addToCart,reomoveFromCart,getCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js'
const cartRouter = express.Router()

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,reomoveFromCart)
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter;
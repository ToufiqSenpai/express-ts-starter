import {Router} from "express";
import UserController from "../controllers/UserController";

const userRoute = Router()

userRoute.get('/me', UserController.getMe)

export default userRoute
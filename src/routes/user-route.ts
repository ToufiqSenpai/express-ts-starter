import {Router} from "express";
import UserController from "../controllers/UserController";

const userRoute = Router()

userRoute.get('/me', UserController.getMe)

userRoute.put('/me/profile-picture', UserController.putProfilePicture)

export default userRoute
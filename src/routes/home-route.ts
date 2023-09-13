import { Router } from "express"
import HomeController from "../controllers/HomeController"

const homeRouter = Router()

homeRouter.get('/', HomeController.get)

export default homeRouter
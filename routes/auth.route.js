import {Router} from "express"
import { registerHospital ,login} from "../controllers/registration.controller.js"

const router = Router()

router.route("/register").post(registerHospital)
router.route("/login").post(login)

export default router
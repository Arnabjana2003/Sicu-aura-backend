import {Router} from "express"
import { getAllHospitals,search} from "../controllers/admin.controller.js"


const router = Router()

router.route("/all").get(getAllHospitals)
router.route("/search").post(search)

export default router
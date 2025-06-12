import { Router } from "express";
import { userHealthController, login, signup } from "../controllers/userController";

const router = Router();

router.get('/', userHealthController)
.post('/signup', signup)
.post('/login', login)

export default router;
import { Router } from "express";
import { userHealthController, login, signup, getAllUsers } from "../controllers/userController";
import auth from "../auth/authMiddleWare";

const router = Router();

router.get('/', userHealthController)
router.post('/signup', signup)
router.post('/login', login)
router.get('/get-users', auth, getAllUsers)

export default router;
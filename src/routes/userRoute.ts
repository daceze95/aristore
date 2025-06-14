import { Router } from "express";
import { userHealthController, login, signup, getInventory } from "../controllers/userController";
import auth from "../auth/authMiddleWare";

const router = Router();

router.get('/', userHealthController)
.post('/signup', signup)
.post('/login', login)
router.get('/store', auth, getInventory)

export default router;
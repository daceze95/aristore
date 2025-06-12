import { RequestHandler, Router } from "express";
import { userHealthController, login, signup, getInventory } from "../controllers/userController";
import auth from "../auth/authMiddleWare";

const router = Router();

router.get('/', userHealthController)
.post('/signup', signup)
.post('/login', login)
router.get('/store', auth as unknown as RequestHandler, getInventory as unknown as RequestHandler)

export default router;
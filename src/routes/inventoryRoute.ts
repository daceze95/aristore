import { Router } from "express";
import {getAllInventory } from "../controllers/inventoryController";
import auth from "../auth/authMiddleWare";

const router = Router();

router.get('/', getAllInventory)
router.get('/store', auth, getAllInventory )

export default router;
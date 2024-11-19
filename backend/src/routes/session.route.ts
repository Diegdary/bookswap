import {Router} from "express";
import { ResultSetHeader } from "mysql2";
import { postSession,getSession } from "../controllers/session.controller";

const router = Router();

router.post("/login",postSession);
router.get("/profile",getSession);

export default router;
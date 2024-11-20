import {Router} from "express";
import { ResultSetHeader } from "mysql2";
import { postSession,getSession,deleteExit, getIslogged } from "../controllers/session.controller";

const router = Router();

router.post("/login",postSession);
router.get("/profile",getSession); 
router.delete("/exit",deleteExit);
router.get("/vlogin",getIslogged);
 
export default router;
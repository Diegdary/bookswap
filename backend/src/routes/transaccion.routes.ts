import { Router } from "express";
import { deleteTrans, getTrans, getTransM, postTrans, putTrans } from "../controllers/transaccion.controller";

const router = Router();

router.get("/",getTransM);
router.get("/:id",getTrans);
router.delete("/:id",deleteTrans);
router.post("/",postTrans);
router.put("/:id",putTrans);

export default router;
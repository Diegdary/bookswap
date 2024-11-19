import { Router } from "express";
import {getTrans_libro, deleteTrans_libro, getTrans_libros, postTrans_libro, putTrans_libro} from "./../controllers/trans_libro.controller";

const router = Router();

router.get("/",getTrans_libros);
router.get("/:id_transc/:id_libro",getTrans_libro);
router.delete("/:id_transc/:id_libro",deleteTrans_libro);
router.post("/",postTrans_libro);
router.put("/:id_transc/:id_libro",putTrans_libro);

export default router;
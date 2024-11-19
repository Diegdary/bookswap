import { Router } from "express";
import {getLibros, getLibro, deleteLibro, postLibro, putLibro} from "../controllers/libro.controller"


const router = Router();

router.get("/",getLibros);
router.get("/:id",getLibro);
router.delete("/:id",deleteLibro);
router.post("/",postLibro);
router.put("/:id",putLibro);

export default router;
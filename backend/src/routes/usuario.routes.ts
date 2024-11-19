import {Router} from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuario.controller";

const router =Router();

router.get("/", getUsuarios);
router.get("/:id", getUsuario);
router.delete("/:id", deleteUsuario);
router.post("/",postUsuario);
router.put("/:id",putUsuario);

export default router;
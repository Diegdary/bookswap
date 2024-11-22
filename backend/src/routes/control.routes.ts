import { Router } from "express";
import {getUltimaCompra, getUltimaVenta, getLibrosDisponibles} from "../controllers/control.controller"


const router = Router();


router.get("/ultimacompra",getUltimaCompra);
router.get("/ultimaventa",getUltimaVenta);
router.get("/librosdisponibles",getLibrosDisponibles);

export default router;
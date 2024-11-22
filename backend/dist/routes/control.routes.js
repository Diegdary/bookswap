"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const control_controller_1 = require("../controllers/control.controller");
const router = (0, express_1.Router)();
router.get("/ultimacompra", control_controller_1.getUltimaCompra);
router.get("/ultimaventa", control_controller_1.getUltimaVenta);
router.get("/librosdisponibles", control_controller_1.getLibrosDisponibles);
exports.default = router;

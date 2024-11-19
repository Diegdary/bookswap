"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const libro_controller_1 = require("../controllers/libro.controller");
const router = (0, express_1.Router)();
router.get("/", libro_controller_1.getLibros);
router.get("/:id", libro_controller_1.getLibro);
router.delete("/:id", libro_controller_1.deleteLibro);
router.post("/", libro_controller_1.postLibro);
router.put("/:id", libro_controller_1.putLibro);
exports.default = router;
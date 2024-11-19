"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = require("../controllers/session.controller");
const router = (0, express_1.Router)();
router.post("/login", session_controller_1.postSession);
router.get("/profile", session_controller_1.getSession);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = exports.postSession = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const nanoid_1 = require("nanoid");
const sessions = [];
const postSession = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        res.json({ msg: "Credenciales no válidas." });
    try {
        connection_1.default.query("SELECT nombre,email, contrasena FROM usuario WHERE email = ? AND contrasena = ?;", [email, password], (error, data) => {
            if (data.length == 0) {
                res.json({ msg: "User not found" });
            }
            else {
                const sessionId = (0, nanoid_1.nanoid)();
                sessions.push({ sessionId });
                res.cookie("sessionId", sessionId);
                res.json({
                    msg: `User ${data[0].nombre} autenticado.`
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            msg: "Algo salió mal..."
        });
    }
};
exports.postSession = postSession;
const getSession = (req, res) => {
    console.log(req.cookies);
};
exports.getSession = getSession;

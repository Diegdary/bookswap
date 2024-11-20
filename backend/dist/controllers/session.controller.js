"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSession = exports.deleteExit = exports.getIslogged = exports.postSession = void 0;
const connection_1 = __importDefault(require("../db/connection"));
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
                const sessionId = crypto.randomUUID();
                sessions.push({ sessionId, email });
                res.cookie("sessionId", sessionId, { httpOnly: true });
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
const getIslogged = (req, res) => {
    const { cookies } = req;
    if (!sessions.find(element => cookies.sessionId == element.sessionId)) {
        res.json({
            logged: 0,
            msg: "Not logged."
        });
        return;
    }
    //
    res.json({
        logged: 1,
        msg: "Is logged."
    });
};
exports.getIslogged = getIslogged;
const deleteExit = (req, res) => {
    const { cookies } = req;
    const index = sessions.findIndex(element => {
        console.log("//");
        console.log(cookies.sessionId);
        console.log(element.sessionId);
        return cookies.sessionId == element.sessionId;
    });
    console.log("index: ", index);
    if (index == -1) {
        res.json({
            msg: "Already logged out."
        });
    }
    else {
        const deleted = sessions.splice(index, 1);
        res.json({
            msg: "Session deleted.",
            deletedSession: deleted[0].email
        });
    }
};
exports.deleteExit = deleteExit;
const getSession = (req, res) => {
    const { cookies } = req;
    console.log(cookies);
    console.log(sessions);
    res.send();
};
exports.getSession = getSession;

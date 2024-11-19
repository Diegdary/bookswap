"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUsuario = exports.postUsuario = exports.deleteUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getUsuarios = (req, res) => {
    connection_1.default.query("SELECT * FROM usuario;", (error, data) => {
        res.json(data);
    });
};
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => {
    const { id } = req.params;
    connection_1.default.query('SELECT * FROM usuario WHERE id = ?;', id, (error, data) => {
        if (error)
            throw error;
        if (data.length == 0) {
            res.json({
                msg: "No rows to show."
            });
        }
        else {
            res.json(data[0]);
        }
    });
};
exports.getUsuario = getUsuario;
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    connection_1.default.query("DELETE FROM usuario WHERE id = ?", id, (error, data) => {
        if (error)
            throw error;
        let msg = "Book deleted successfully!";
        if (data.affectedRows == 0) {
            msg = "No changes made (id doesn't exist).";
        }
        res.json({
            msg: msg,
            previous_id: id,
            affectedRows: data.affectedRows
        });
    });
};
exports.deleteUsuario = deleteUsuario;
const postUsuario = (req, res) => {
    const { body } = req;
    connection_1.default.query("INSERT INTO usuario set ?", [body], (error, data) => {
        if (error)
            throw error;
        res.json({
            msg: "User posted succesfully!",
            content: Object.assign({}, body)
        });
    });
};
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    connection_1.default.query("UPDATE usuario set ? WHERE id = ?", [body, id], (error, data) => {
        if (error)
            throw error;
        let msg = "Book has been updated successfully!";
        if (data.affectedRows == 0) {
            msg = "No changes made (id doesn't exist).";
        }
        res.json({
            msg: msg,
            affectedRows: data.affectedRows,
            content: Object.assign({}, body)
        });
    });
};
exports.putUsuario = putUsuario;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTrans_libro = exports.postTrans_libro = exports.deleteTrans_libro = exports.getTrans_libro = exports.getTrans_libros = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getTrans_libros = (req, res) => {
    connection_1.default.query("SELECT * FROM trans_libro;", (error, data) => {
        if (error)
            throw error;
        res.json(data);
    });
};
exports.getTrans_libros = getTrans_libros;
const getTrans_libro = (req, res) => {
    const { id_transc, id_libro } = req.params;
    connection_1.default.query("SELECT * FROM trans_libro WHERE id_transc = ? AND id_libro = ?;", [id_transc, id_libro], (error, data) => {
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
exports.getTrans_libro = getTrans_libro;
const deleteTrans_libro = (req, res) => {
    const { id_transc, id_libro } = req.params;
    connection_1.default.query("DELETE FROM trans_libro WHERE id_transc = ? AND id_libro = ?;", [id_transc, id_libro], (error, data) => {
        if (error)
            throw error;
        let msg = "Trans_lb deleted successfully!";
        if (data.affectedRows == 0) {
            msg = "No changes made (IDS doesn't exist).";
        }
        res.json({
            msg: msg,
            previous_id: [id_transc, id_libro],
            affectedRows: data.affectedRows
        });
    });
};
exports.deleteTrans_libro = deleteTrans_libro;
const postTrans_libro = (req, res) => {
    const { body } = req;
    connection_1.default.query("INSERT INTO transaccion set ?", [body], (error, data) => {
        if (error)
            throw error;
        res.json({
            msg: "Transaccion added successfully!",
            content: Object.assign({}, body)
        });
    });
};
exports.postTrans_libro = postTrans_libro;
const putTrans_libro = (req, res) => {
    const { id_transc, id_libro } = req.params;
    const { body } = req;
    connection_1.default.query("UPDATE transaccion SET ? WHERE id_transc = ? AND id_libro = ?;", [body, id_transc, id_libro], (error, data) => {
        if (error)
            throw error;
        let msg = "transaccion has been updated successfully!";
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
exports.putTrans_libro = putTrans_libro;

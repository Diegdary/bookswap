"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTrans = exports.postTrans = exports.deleteTrans = exports.getTrans = exports.getTransM = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getTransM = (req, res) => {
    connection_1.default.query("SELECT * FROM transaccion;", (error, data) => {
        if (error)
            throw error;
        res.json(data);
    });
};
exports.getTransM = getTransM;
const getTrans = (req, res) => {
    const { id } = req.params;
    connection_1.default.query("SELECT * FROM transaccion WHERE id = ?;", id, (error, data) => {
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
exports.getTrans = getTrans;
const deleteTrans = (req, res) => {
    const { id } = req.params;
    connection_1.default.query("DELETE FROM transaccion WHERE id = ?;", id, (error, data) => {
        if (error)
            throw error;
        let msg = "Transaccion deleted successfully!";
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
exports.deleteTrans = deleteTrans;
const postTrans = (req, res) => {
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
exports.postTrans = postTrans;
const putTrans = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    connection_1.default.query("UPDATE transaccion SET ? WHERE id = ?;", [body, id], (error, data) => {
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
exports.putTrans = putTrans;

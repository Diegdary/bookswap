"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putLibro = exports.postLibro = exports.deleteLibro = exports.getLibro = exports.getLibros = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getLibros = (req, res) => {
    connection_1.default.query("SELECT * FROM libro;", (error, data) => {
        if (error)
            throw error;
        res.json(data);
    });
};
exports.getLibros = getLibros;
const getLibro = (req, res) => {
    const { id } = req.params;
    connection_1.default.query("SELECT * FROM libro WHERE id = ?;", id, (error, data) => {
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
exports.getLibro = getLibro;
const deleteLibro = (req, res) => {
    const { id } = req.params;
    connection_1.default.query("DELETE FROM libro WHERE id = ?;", id, (error, data) => {
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
exports.deleteLibro = deleteLibro;
const postLibro = (req, res) => {
    const { body } = req;
    connection_1.default.query("INSERT INTO libro set ?", [body], (error, data) => {
        if (error)
            throw error;
        res.json({
            msg: "Book added successfully!",
            content: Object.assign({}, body)
        });
    });
};
exports.postLibro = postLibro;
const putLibro = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    connection_1.default.query("UPDATE libro SET ? WHERE id = ?;", [body, id], (error, data) => {
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
exports.putLibro = putLibro;

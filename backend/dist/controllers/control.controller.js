"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLibrosDisponibles = exports.getUltimaVenta = exports.getUltimaCompra = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getUltimaCompra = (req, res) => {
    connection_1.default.query("SELECT * FROM ultima_compra;", (error, data) => {
        if (error)
            throw error;
        res.json(data);
    });
};
exports.getUltimaCompra = getUltimaCompra;
const getUltimaVenta = (req, res) => {
    connection_1.default.query("SELECT * FROM ultima_venta;", (error, data) => {
        if (error)
            throw error;
        res.json(data);
    });
};
exports.getUltimaVenta = getUltimaVenta;
const getLibrosDisponibles = (req, res) => {
    connection_1.default.query("SELECT * FROM libros_disponibles;", (error, data) => {
        if (error)
            throw error;
        res.json(data);
    });
};
exports.getLibrosDisponibles = getLibrosDisponibles;

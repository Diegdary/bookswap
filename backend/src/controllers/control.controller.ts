import { Request, Response } from "express";
import connection from "../db/connection";



export const getUltimaCompra = (req:Request, res:Response) => {
    connection.query("SELECT * FROM ultima_compra;", (error,data)=>{
        if (error) throw error;
        res.json(data);
    });
}

export const getUltimaVenta = (req:Request, res:Response) => {
    connection.query("SELECT * FROM ultima_venta;", (error,data)=>{
        if (error) throw error;
        res.json(data);
    });
}

export const getLibrosDisponibles = (req:Request, res:Response) => {
    connection.query("SELECT * FROM libros_disponibles;", (error,data)=>{
        if (error) throw error;
        res.json(data);
    });
}
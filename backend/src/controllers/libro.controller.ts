import connection from "../db/connection";
import { Request, Response } from "express";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export const getLibros = (req:Request, res:Response) => {
    connection.query("SELECT * FROM libro;", (error,data)=>{
        if (error) throw error;
        res.json(data);
    });
}

export const getLibro = (req:Request, res:Response) => {
    const { id } = req.params;
    connection.query<RowDataPacket[]>("SELECT * FROM libro WHERE id = ?;",id, (error,data)=>{
        if (error) throw error;
        if (data.length == 0) {
            res.json({
                msg:"No rows to show."
            });
        } else {
            res.json(data[0]);
        }
        
    });
}

export const deleteLibro = (req:Request, res:Response) => {
    const { id } = req.params;
    connection.query<ResultSetHeader>("DELETE FROM libro WHERE id = ?;",id, (error,data)=>{
        if (error) throw error;

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
}

export const postLibro = (req:Request, res:Response)=>{
    const { body } = req;
    connection.query("INSERT INTO libro set ?", [body], (error,data)=>{
        if(error) throw error;
        res.json({
            msg:"Book added successfully!",
            content: {...body}
        });
    });
};

export const putLibro = (req:Request, res:Response)=>{
    const { id } = req.params;
    const { body } = req;

    connection.query<ResultSetHeader>("UPDATE libro SET ? WHERE id = ?;",[body,id],(error,data)=>{
        if(error) throw error;
        
        let msg = "Book has been updated successfully!";
        if (data.affectedRows == 0) {
            msg = "No changes made (id doesn't exist).";
        }
        res.json({
            msg: msg,
            affectedRows: data.affectedRows,
            content: {...body}
        });
    });
}
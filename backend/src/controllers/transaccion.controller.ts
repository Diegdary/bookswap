import { Request, Response } from "express";
import connection from "../db/connection";
import {RowDataPacket, ResultSetHeader} from "mysql2";


export const getTransM = (req:Request, res:Response) => {
    connection.query("SELECT * FROM transaccion;", (error,data)=>{
        if (error) throw error;
        res.json(data);
    });
}

export const getTrans = (req:Request, res:Response) => {
    const { id } = req.params;
    connection.query<RowDataPacket[]>("SELECT * FROM transaccion WHERE id = ?;",id, (error,data)=>{
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

export const deleteTrans = (req:Request, res:Response) => {
    const { id } = req.params;
    connection.query<ResultSetHeader>("DELETE FROM transaccion WHERE id = ?;",id, (error,data)=>{
        if (error) throw error;

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
}

export const postTrans = (req:Request, res:Response)=>{
    const { body } = req;
    connection.query("INSERT INTO transaccion set ?", [body], (error,data)=>{
        if(error) throw error;
        res.json({
            msg:"Transaccion added successfully!",
            content: {...body}
        });
    });
};

export const putTrans = (req:Request, res:Response)=>{
    const { id } = req.params;
    const { body } = req;

    connection.query<ResultSetHeader>("UPDATE transaccion SET ? WHERE id = ?;",[body,id],(error,data)=>{
        if(error) throw error;
        
        let msg = "transaccion has been updated successfully!";
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
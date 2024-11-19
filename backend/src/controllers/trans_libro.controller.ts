import { Request,Response } from "express";
import connection from "../db/connection";
import {RowDataPacket, ResultSetHeader} from "mysql2";


export const getTrans_libros = (req:Request, res:Response) => {
    connection.query("SELECT * FROM trans_libro;", (error,data)=>{
        if (error) throw error;
        res.json(data);
    });
}

export const getTrans_libro = (req:Request, res:Response) => {
    const { id_transc , id_libro } = req.params;
    connection.query<RowDataPacket[]>("SELECT * FROM trans_libro WHERE id_transc = ? AND id_libro = ?;",[id_transc , id_libro ], (error,data)=>{
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

export const deleteTrans_libro = (req:Request, res:Response) => {
    const { id_transc , id_libro } = req.params;
    connection.query<ResultSetHeader>("DELETE FROM trans_libro WHERE id_transc = ? AND id_libro = ?;",[id_transc , id_libro ], (error,data)=>{
        if (error) throw error;

        let msg = "Trans_lb deleted successfully!";
        if (data.affectedRows == 0) {
            msg = "No changes made (IDS doesn't exist).";
        }

        res.json({
            msg: msg,
            previous_id: [id_transc , id_libro ],
            affectedRows: data.affectedRows
        });
    });
}

export const postTrans_libro = (req:Request, res:Response)=>{
    const { body } = req;
    connection.query("INSERT INTO transaccion set ?", [body], (error,data)=>{
        if(error) throw error;
        res.json({
            msg:"Transaccion added successfully!",
            content: {...body}
        });
    });
};

export const putTrans_libro = (req:Request, res:Response)=>{
    const { id_transc , id_libro } = req.params;
    const { body } = req;

    connection.query<ResultSetHeader>("UPDATE transaccion SET ? WHERE id_transc = ? AND id_libro = ?;",[body,id_transc , id_libro],(error,data)=>{
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
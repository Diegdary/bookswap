import {json, Request, Response} from "express"
import connection from "../db/connection";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export const getUsuarios = (req: Request,res: Response)=>{

    connection.query("SELECT * FROM usuario;",(error,data)=>{
        res.json(data)
    });
}

export const getUsuario =(req:Request, res:Response)=>{
    const { id }= req.params;

    connection.query<RowDataPacket[]>('SELECT * FROM usuario WHERE id = ?;',id,(error,data)=>{
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

export const deleteUsuario =(req:Request, res:Response)=>{
    const { id } = req.params; 

    connection.query<ResultSetHeader>("DELETE FROM usuario WHERE id = ?", id, (error,data)=>{
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

export const postUsuario = (req:Request, res:Response)=>{
    const { body } = req;
    connection.query("INSERT INTO usuario set ?",[body],(error,data)=>{
        if (error) throw error;
        res.json({
        msg:"User posted succesfully!",
        content: {...body}});
    });
    
}

export const putUsuario = (req:Request, res:Response)=>{
    const {body} = req;
    const { id } = req.params;

    connection.query<ResultSetHeader>("UPDATE usuario set ? WHERE id = ?",[body,id],(error,data)=>{
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























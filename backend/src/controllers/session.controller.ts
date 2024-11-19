import { Response, Request } from "express";
import connection from "../db/connection";
import { ResultSetHeader,RowDataPacket} from "mysql2";
import {nanoid} from "nanoid";

const sessions = [];

export const postSession = (req:Request, res:Response)=>{
    const {email , password} = req.body;

    if(!email || !password) res.json({msg: "Credenciales no válidas."});

    try {
        
        connection.query<RowDataPacket[]>("SELECT nombre,email, contrasena FROM usuario WHERE email = ? AND contrasena = ?;",[email , password], (error,data)=>{
            if(data.length == 0) {res.json({msg:"User not found"})}
            else{
                const sessionId= nanoid();
                sessions.push({sessionId});
                res.cookie("sessionId", sessionId);
                res.json({
                    msg:`User ${data[0].nombre} autenticado.` 
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            msg:"Algo salió mal..."
        });
    }
}

export const getSession = (req: Request, res:Response)=>{
    console.log(req.cookies);
}
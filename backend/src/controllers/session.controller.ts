import { Response, Request } from "express";
import connection from "../db/connection";
import { ResultSetHeader,RowDataPacket} from "mysql2";

interface sessionValidation{
    sessionId:string,
    email:string
}

const sessions:sessionValidation[] = [];

export const postSession = (req:Request, res:Response)=>{
    const {email , password} = req.body;
    console.log(req.body);
    if(!email || !password) {
        res.json({
            success:0,
            msg: "Credenciales no válidas."
        })
        return;
    };

    try {
        
        connection.query<RowDataPacket[]>("SELECT nombre,email, contrasena FROM usuario WHERE email = ? AND contrasena = ?;",[email , password], (error,data)=>{
            if(data.length == 0) {res.json({msg:"User not found"})}
            else{
                const sessionId= crypto.randomUUID();
                sessions.push({sessionId,email});
                res.cookie("sessionId", sessionId);
                res.json({ 
                    success:1,
                    msg:`User ${data[0].nombre} autenticado.` 
                });
            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            success:0,
            msg:"Algo salió mal..."
        });
    }
}

export const getIslogged = (req: Request, res:Response)=>{
    const {cookies} = req;
    if (!sessions.find(element => cookies.sessionId == element.sessionId)){
        res.json({
            success:0,
            logged:0,
            msg:"Not logged."
        })
        return;
    }
    //
    res.json({
        success:0,
        logged:1,
        msg:"Is logged."
    })

}

export const getInfo = (req:Request, res:Response)=>{
    console.log("all sesions:!");
    console.log(sessions)
    const { cookies } = req;
    const index:number = sessions.findIndex(element => {
        console.log("//")
        console.log(cookies.sessionId);
        console.log(element.sessionId);
        return cookies.sessionId == element.sessionId;
    });
    console.log("index:",index);
    
    if(index == -1){
        res.json({
            successful: 0,
            msg:"didn't find a log"
        });
    }
    else{
        console.log("correo",sessions);
        const correo = sessions[index].email;
        connection.query<RowDataPacket[]>("SELECT nombre, telefono, direccion, tipo FROM usuario WHERE email = ?",correo,(error,data)=>{
            if (error) throw error;
            res.json(
                { 
                    successful: 1,
                    msg:"didn't find a log",
                    user: data[0]});
        });
    }
}

export const deleteExit = (req:Request,res:Response)=>{
    const {cookies} = req;
    const index:number = sessions.findIndex(element => {
        console.log("//")
        console.log(cookies.sessionId);
        console.log(element.sessionId);
        return cookies.sessionId == element.sessionId;
    });
    console.log("index: ",index);
    if(index == -1){
        res.json({
            msg:"Already logged out."
        });
    }
    else{
        const deleted = sessions.splice(index,1);
        res.json({
            msg:"Session deleted.",
            deletedSession: deleted[0].email
        })
    }
}
 
export const getSession = (req: Request, res:Response)=>{
    const {cookies} = req;
    console.log(cookies);
    console.log(sessions);
    res.send();
}
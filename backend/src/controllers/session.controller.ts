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

    if(!email || !password) res.json({msg: "Credenciales no válidas."});

    try {
        
        connection.query<RowDataPacket[]>("SELECT nombre,email, contrasena FROM usuario WHERE email = ? AND contrasena = ?;",[email , password], (error,data)=>{
            if(data.length == 0) {res.json({msg:"User not found"})}
            else{
                const sessionId= crypto.randomUUID();
                sessions.push({sessionId,email});
                res.cookie("sessionId", sessionId,{httpOnly:true});
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

export const getIslogged = (req: Request, res:Response)=>{
    const {cookies} = req;
    if (!sessions.find(element => cookies.sessionId == element.sessionId)){
        res.json({
            logged:0,
            msg:"Not logged."
        })
        return;
    }
    //
    res.json({
        logged:1,
        msg:"Is logged."
    })

    

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
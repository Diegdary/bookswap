import express from "express";
import connection from "../db/connection";
import routesUsuarios from "./../routes/usuario.routes";
import routesLibros from "../routes/libro.routes";
import routesTransacciones from "../routes/transaccion.routes";
import routesTrans_libro from "./../routes/transc_libro.routes"; 
import routesSession from "../routes/session.route";
import cookieParser from "cookie-parser";
import cors from "cors";



class Server {
    private app: express.Application;
    private port:string

    constructor() {
        this.app=express();
        this.port = process.env.PORT || "4000";
        this.middlewares();
        this.routes();
        this.dbconnection();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("App running in port:", this.port);
        });
    }
    //PARSE OF THE BODY
    middlewares(){
        this.app.use(cors({origin: "http://localhost:5173",credentials:true}));
        this.app.use(express.json());
        this.app.use(cookieParser());
    } 

    routes(){
        this.app.use('/api/usuarios',routesUsuarios);
        this.app.use('/api/libros',routesLibros);
        this.app.use('/api/transacciones',routesTransacciones);
        this.app.use('/api/trans_libros',routesTrans_libro);
        this.app.use('/api/session',routesSession)
    }

    dbconnection(){
        connection.connect((error)=>{
            if (error) {
                throw error;
            }
            console.log("connected to database!");
        });
    }
    
}



export default Server; 
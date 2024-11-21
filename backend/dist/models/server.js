"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../db/connection"));
const usuario_routes_1 = __importDefault(require("./../routes/usuario.routes"));
const libro_routes_1 = __importDefault(require("../routes/libro.routes"));
const transaccion_routes_1 = __importDefault(require("../routes/transaccion.routes"));
const transc_libro_routes_1 = __importDefault(require("./../routes/transc_libro.routes"));
const session_route_1 = __importDefault(require("../routes/session.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "4000";
        this.middlewares();
        this.routes();
        this.dbconnection();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("App running in port:", this.port);
        });
    }
    //PARSE OF THE BODY
    middlewares() {
        this.app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
    }
    routes() {
        this.app.use('/api/usuarios', usuario_routes_1.default);
        this.app.use('/api/libros', libro_routes_1.default);
        this.app.use('/api/transacciones', transaccion_routes_1.default);
        this.app.use('/api/trans_libros', transc_libro_routes_1.default);
        this.app.use('/api/session', session_route_1.default);
    }
    dbconnection() {
        connection_1.default.connect((error) => {
            if (error) {
                throw error;
            }
            console.log("connected to database!");
        });
    }
}
exports.default = Server;

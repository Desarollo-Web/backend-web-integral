import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes   from './routes/authRoutes';
import bodyParser from 'body-parser';
import usuarioRoutes from './routes/usuarioRoutes';

/*
 * gdhsgfhds
* Clase Server que define una aplicación express,
*/
class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();  
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
  });
  }

  config(): void {
      // configuración del puerto para el servidor
      this.app.set("port", 3000);
      
      // muestra las peticiones en consola
      this.app.use(morgan("dev"));

      // puertos de conexión de la API
      this.app.use(cors());

      // solo se pertimen peticiones en formato JSON  
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({extended: false,}),
);
  }

  routes(): void {
    this.app.use("/", authRoutes);
    this.app.use("/usuarios", usuarioRoutes);
  }

}
const server = new Server();
import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController";

class UsuarioRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    private config() {
        // listado
        this.router.get('/', usuarioController.listar);
        // insercion
        this.router.post('/', usuarioController.insertar);
        // actualizar
        this.router.put('/', usuarioController.actualizar);
        // eliminar
        this.router.delete('/:username', usuarioController.eliminar);
    }
}
const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;
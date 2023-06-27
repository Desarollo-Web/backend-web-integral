import { Request, Response } from "express";
import dao from '../models/usuarioDao';
import validator from 'validator';
import { utils } from '../utils/utils';

class UsuarioController {

    /**
     * @description Lista los usuarios disponibles
     * @param req 
     * @param res 
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async listar(req: Request, res: Response) {
        try {

            const result = await dao.listar();

            res.json(result);
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

    /**
     *  @description Inserción de usuarios a la bd
     * @param req 
     * @param res 
     * @returns Promise<Response<any, Record<string, any>> | undefined>
     */
    public async insertar(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            var usuario = req.body;
            console.log(usuario);

            // validar que los datos no sean nulos o indefinidos
            if (!usuario.username
                || !usuario.password
                || !usuario.role) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // encriptar nuestra contraseña
            var encryptedText = await utils.hashPassword(usuario.password);
            usuario.password = encryptedText;
            console.log("Contraseña encriptada " + typeof usuario.password);
            
            const newUser = {
                username: usuario.username,
                password: usuario.password,
                role: usuario.role
            }

            console.log(newUser);

            // inserción de los datos
            const result = await dao.insertar(newUser);

            if (result.affectedRows > 0) {
                return res.json({message: "Los datos se guardaron correctamente", code: 0});
            } else {
                return res.status(404).json({ message: result.message, code: 1});
            }
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

    public async actualizar(req: Request, res: Response) {
        try {
            // se obtienen los datos del body
            var usuario = req.body;

            // validar que los datos no sean nulos o indefinidos
            if (!usuario.username
                || !usuario.password) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // se verifica que los datos no se encuentren vacios
            if ( validator.isEmpty(usuario.username) || validator.isEmpty(usuario.password)){
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            let encryptedText = await utils.hashPassword(usuario.password);
            usuario.password = encryptedText;
            
            const newUser = {
                password: usuario.password
            }

            // actualización de los datos
            const result = await dao.actualizar(newUser, usuario.username);

            if (result.affectedRows > 0) {
                return res.json({message: "Los datos se actualizaron correctamente", code: 0});
            } else {
                return res.status(404).json({ message: result.message, code: 1});
            }
        } catch (error: any) {
            return res.status(500).json({ message : `${error.message}` });
        }
    }

    public async eliminar(req: Request, res: Response) {
        try {
            // se obtienen los datos del 
            
            const username  = req.params.username;
            console.log(username);

            // validar que los datos no sean nulos o indefinidos
            if (!username) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // se verifica que los datos no se encuentren vacios
            if (validator.isEmpty(username)) {
                    return res.status(404).json({ message: "Todos los datos son requeridos", code: 1});
            }

            // actualización de los datos
            const result = await dao.eliminar(username);

            if (result.affectedRows > 0) {
                return res.json({message: "Los datos se eliminaron correctamente", code: 0});
            } else {
                return res.status(404).json({ message: result.message, code: 1});
            }
        } catch (error: any) {
            console.log("Error");
            return res.status(500).json({ message : `${error.message}` });
        }
    }

}
export const usuarioController = new UsuarioController();
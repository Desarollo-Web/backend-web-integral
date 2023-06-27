import { Request, Response } from "express";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import db from '../utils/database';
import dao from "../models/authDao";
import {utils} from '../utils/utils';

class AuthController {

  public async iniciarSesion(req: Request, res: Response) {
    try {
        const {username, password }= req.body;

        // Verificar que los datos "username" y "password" existan
        let msg = "";
        if (!username) {
        msg = "Nombre de usuario requerido";
        }
        if (!password) {
        msg = "\nContraseña Requerida";
        }

        // verificar que los datos no esten vacios
        /*if (validator.isEmpty(username.trim()) ||
            validator.isEmpty(password.trim())) {
        return res
            .status(400)
            .json({ message: "Todos los campos son requeridos", code: 1 });
        }*/

        const lstUsers = await dao.getuserByusername(username);
        
        
        if (lstUsers.length <= 0) {
            return res.status(404).json({ message : "El usuario y/o contraseña es incorrecto", code: 1});
        }
        console.log(lstUsers[0].username, lstUsers[0].password);
        
        if (await utils.checkPassword(password, lstUsers[0].password)) {
          const newUser =  {
            username: lstUsers[0].username,
            password: lstUsers[0].password,
            role: lstUsers[0].role
          }
          let token = jwt.sign(newUser, db.keys.secret, {expiresIn:'1h'});

          return res.json({message: 'Autenticación Correcta', token, code:0});
        }
        return res.json({message: 'Autenticación Correcta', code:0});

    } catch (error: any) {
        return res.status(500).json({ message : `${error.message}` });
    }
  }

  public async registro(req: Request, res: Response) {
    const { usuario, password, rol } = req.body;

    return res.json({
      message: "Registro exitoso",
      usuario: "usuario",
      password: "password",
      role: rol,
    });
  }
}
export const authController = new AuthController();

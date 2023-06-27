import pool from '../utils/connection';

class UsuarioDAO {

    public async listar() {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " SELECT u.username, u.password, u.role "
                + " FROM tbl_usuario u ")  });
        return result;
    }

    public async insertar(usuario: any) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " INSERT INTO tbl_usuario SET ? ", [usuario]);
        });
        return result;
    }

    public async actualizar(usuario: any, username: string) {
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " UPDATE tbl_usuario SET ? WHERE username = ? ", [usuario, username]);
        });
        return result;
    }

    public async eliminar(username: string) {
        console.log('Eliminando DAO');
        const result = await pool.then( async (connection) => {
            return await connection.query(
                " DELETE FROM tbl_usuario WHERE username = ? ", [username]);
        });
        return result;
    }

}
const dao = new UsuarioDAO();
export default dao;
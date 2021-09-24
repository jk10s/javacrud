package controlador;

import DAO.DAOUsuarios;
import java.util.ArrayList;
import to.TOUsuarios;


public class CtrlUsuarios {

    DAOUsuarios usuariosDAO;

    public CtrlUsuarios() {
        usuariosDAO = new DAOUsuarios();
    }

    public int insertarUsuario(TOUsuarios ToUsuario) {

        return usuariosDAO.insertarUsuario(ToUsuario);
    }

    public boolean actualizarUsuario(TOUsuarios ToUsuario) {
        return usuariosDAO.actualizarUsuario(ToUsuario);
    }

    public boolean eliminarUsuario(int idUsuario) {
        return usuariosDAO.eliminarUsuario(idUsuario);
    }

    public ArrayList<TOUsuarios> consultarUsuarios() {

        return usuariosDAO.consultarUsuarios();

    }

}

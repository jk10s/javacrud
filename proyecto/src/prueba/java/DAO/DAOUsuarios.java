package DAO;

import db.ConexionDB;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import to.TOUsuarios;

public class DAOUsuarios {

    private ConexionDB con;
    private final String nombretabla = "Usuarios";
    private final String[] columnas = {"nombres", "apellidos", "usuario", "clave", "tipoDocuento", "documento", "correo"};

    public DAOUsuarios() {
        try {
            con = new ConexionDB();
        } catch (SQLException ex) {
            System.out.println("error en DAOusuarios.contructor " + ex.getMessage());
        }
    }

    public int insertarUsuario(TOUsuarios ToUsuario) {

        String[] Valores = {ToUsuario.getNombre(), ToUsuario.getApellido(), ToUsuario.getUsuario(), ToUsuario.getClave(), ToUsuario.getTipoidentificacion(), ToUsuario.getIdentificacion(), ToUsuario.getCorreo()};
        try {
            return con.insertar(nombretabla, columnas, Valores);
        } catch (Exception ex) {
            System.out.println("error en DAOusuarios.insertarUsuario " + ex.getMessage());
            return 0;
        }
    }

    public boolean actualizarUsuario(TOUsuarios ToUsuario) {

        String[] Valores = {ToUsuario.getNombre(), ToUsuario.getApellido(), ToUsuario.getUsuario(), ToUsuario.getClave(), ToUsuario.getTipoidentificacion(), ToUsuario.getIdentificacion(), ToUsuario.getCorreo()};
        try {
            return con.actualizar(nombretabla, columnas, Valores, ToUsuario.getIdusuario());
        } catch (Exception ex) {
            System.out.println("error en DAOusuarios.actualizarUsuario " + ex.getMessage());
            return false;
        }
    }

    public boolean eliminarUsuario(int idUsuario) {

        try {
            return con.eliminar(nombretabla, idUsuario);
        } catch (Exception ex) {
            System.out.println("error en DAOusuarios.eliminarUsuario " + ex.getMessage());
            return false;
        }
    }

    public ArrayList<TOUsuarios> consultarUsuarios() {
        ArrayList<TOUsuarios> usuarios = new ArrayList();
        TOUsuarios usuario;
        try {
            ResultSet rs = con.consultartabla(nombretabla);
            while (rs.next()) {
                usuario = new TOUsuarios();
                usuario.setIdusuario(rs.getInt("Idusuario"));
                usuario.setNombre(rs.getString("nombres"));
                usuario.setApellido(rs.getString("apellidos"));
                usuario.setClave(rs.getString("clave"));
                usuario.setIdentificacion(rs.getString("documento"));
                usuario.setTipoidentificacion(rs.getString("tipoDocumento"));
                usuario.setCorreo(rs.getString("correo"));
                usuarios.add(usuario);
            }
            return usuarios;
        } catch (SQLException ex) {
            System.out.println("error en DAOUsuarios.consultarUsuarios " + ex.getMessage());
            return null;
        } catch (Exception ex) {
            System.out.println("error en DAOusuarios.consultarUsuarios " + ex.getMessage());
            return null;
        }
    }

}

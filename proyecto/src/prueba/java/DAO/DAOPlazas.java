/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;
import db.ConexionDB;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import to.TOPlazas;
public class DAOPlazas {
    private ConexionDB con;
    private final String nombretabla = "plazas";
    private final String[] columnas = {"TipoPlaza", "CodigoPlaza", "Estado"};

    public DAOPlazas() {
        try {
            con = new ConexionDB();
        } catch (SQLException ex) {
            System.out.println("error en DAOPlazas.contructor " + ex.getMessage());
        }
    }
    
    public int insertarPlazas(TOPlazas ToPlazas) {

        String[] Valores = {ToPlazas.getTipoplaza(), ToPlazas.getCodigo(), ToPlazas.getEstado()};
        try {
            return con.insertar(nombretabla, columnas, Valores);
        } catch (Exception ex) {
            System.out.println("error en DAOPlazas.insertarPlazas " + ex.getMessage());
            return 0;
        }
    }
    
    public boolean actualizarUsuario(TOPlazas ToPlazas) {

        String[] Valores = {ToPlazas.getTipoplaza(), ToPlazas.getCodigo(), ToPlazas.getEstado()};
        try {
            return con.actualizar(nombretabla, columnas, Valores, ToPlazas.getIdplazas());
        } catch (Exception ex) {
            System.out.println("error en DAOPlazas.actualizarUsuario " + ex.getMessage());
            return false;
        }
    }
    
    public boolean eliminarPlazas(int idPlazas) {

        try {
            return con.eliminar(nombretabla, idPlazas);
        } catch (Exception ex) {
            System.out.println("error en DAOPlazas.eliminarPlazas " + ex.getMessage());
            return false;
        }
    }
    
    public ArrayList<TOPlazas> consultarPlazas() {
        ArrayList<TOPlazas> plazas = new ArrayList();
        TOPlazas plaza;
        try {
            ResultSet rs = con.consultartabla(nombretabla);
            while (rs.next()) {
                plaza = new TOPlazas();
                plaza.setIdplazas(rs.getInt("Plazas"));
                plaza.setTipoplaza(rs.getString("tipoplaza"));
                plaza.setCodigo(rs.getString("codigo"));
                plaza.setEstado(rs.getString("estado"));
                plazas.add(plaza);
            }
            return plazas;
        } catch (SQLException ex) {
            System.out.println("error en TOPlazas.consultarPlazas " + ex.getMessage());
            return null;
        } catch (Exception ex) {
            System.out.println("error en TOPlazas.consultarPlazas " + ex.getMessage());
            return null;
        }
    }
}

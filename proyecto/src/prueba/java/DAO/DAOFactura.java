
package DAO;
import db.ConexionDB;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import to.TOFactura;

public class DAOFactura {
    
    private ConexionDB con;
    private final String nombretabla = "factura";
    private final String[] columnas = {"placa", "tipoVehiculo", "costo", "fechaEntrada", "fechaSalida", "idPlazaFactura", "idUserFactura"};

    public DAOFactura() {
        try {
            con = new ConexionDB();
        } catch (SQLException ex) {
            System.out.println("error en DAOFactura.contructor " + ex.getMessage());
        }
    }

    public int insertarFactura(TOFactura ToFactura) {

        String[] Valores = {ToFactura.getPlaca(), ToFactura.getTipoVehiculo() };
        try {
            return con.insertar(nombretabla, columnas, Valores);
        } catch (Exception ex) {
            System.out.println("error en DAOFactura.insertarFactura " + ex.getMessage());
            return 0;
        }
    }

    public boolean actualizarFactura(TOFactura ToFactura) {

        String[] Valores = {ToFactura.getPlaca(), ToFactura.getTipoVehiculo(), String.valueOf(ToFactura.getCosto()), String.valueOf(ToFactura.getFechaEntrada()), String.valueOf(ToFactura.getFechaSalida()), String.valueOf(ToFactura.getIdPlazaFactura()), String.valueOf(ToFactura.getIdfacuser())};
        try {
            return con.actualizar(nombretabla, columnas, Valores, ToFactura.getIdFactura());
        } catch (Exception ex) {
            System.out.println("error en DAOFactura.actualizarFactura " + ex.getMessage());
            return false;
        }
    }

    public boolean eliminarFactura(int idFactura) {

        try {
            return con.eliminar(nombretabla, idFactura);
        } catch (Exception ex) {
            System.out.println("error en DAOFactura.eliminarFactura " + ex.getMessage());
            return false;
        }
    }

    public ArrayList<TOFactura> consultarFactura() {
        ArrayList<TOFactura> facturas = new ArrayList();
        TOFactura factura;
        try {
            ResultSet rs = con.consultartabla(nombretabla);
            while (rs.next()) {
                factura = new TOFactura();
                factura.setIdFactura(rs.getInt("idFactura"));
                factura.setPlaca(rs.getString("placa"));
                factura.setCosto(rs.getDouble("costoTotal"));
                factura.setFechaEntrada(rs.getDate("fechaEntrada"));
                factura.setFechaSalida(rs.getDate("fechaSalida"));
                factura.setIdPlazaFactura(rs.getInt("idPlazaFactura"));
                factura.setIdfacuser(rs.getInt("idUserFactura"));
                facturas.add(factura);
            }
            return facturas;
        } catch (SQLException ex) {
            System.out.println("error en DAOFactura.consultarFactura " + ex.getMessage());
            return null;
        } catch (Exception ex) {
            System.out.println("error en DAOFactura.consultarFactura " + ex.getMessage());
            return null;
        }
    }

}

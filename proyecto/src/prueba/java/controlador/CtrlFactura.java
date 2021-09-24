/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import DAO.DAOFactura;
import java.util.ArrayList;
import to.TOFactura;

/**
 *
 * @author jk10s
 */
public class CtrlFactura {
    DAOFactura facturaDAO;

    public CtrlFactura() {
        facturaDAO = new DAOFactura();
    }
    
    public int insertarFactura(TOFactura ToFactura) {
        return facturaDAO.insertarFactura(ToFactura);
    }
    
    public boolean actualizarFactura(TOFactura ToFactura) {
        return facturaDAO.actualizarFactura(ToFactura);
    }
    
    public boolean eliminarFactura(int idFactura) {
        return facturaDAO.eliminarFactura(idFactura);
    }
    
    public ArrayList<TOFactura> consultarFactura() {
        return facturaDAO.consultarFactura();
    }
}

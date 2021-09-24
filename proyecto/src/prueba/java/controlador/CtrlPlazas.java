
package controlador;

import DAO.DAOPlazas;
import java.util.ArrayList;
import to.TOPlazas;
public class CtrlPlazas {
    DAOPlazas plazasDAO;

    public CtrlPlazas() {
        plazasDAO = new DAOPlazas();
    }
    
     public int insertarPlazas(TOPlazas ToPlazas) {
         return plazasDAO.insertarPlazas(ToPlazas);
     }
    
     public boolean actualizarUsuario(TOPlazas ToPlazas) {
         return plazasDAO.actualizarUsuario(ToPlazas);
     }
     
     public boolean eliminarPlazas(int idPlazas) {
         return plazasDAO.eliminarPlazas(idPlazas);
     }
     
     public ArrayList<TOPlazas> consultarPlazas() {
         return plazasDAO.consultarPlazas();
     }
}

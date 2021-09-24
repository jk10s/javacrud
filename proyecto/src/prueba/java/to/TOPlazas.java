package to;

/**
 *
 * @author jk10s
 */
public class TOPlazas {
    private int idplazas;
    private String tipoplaza;
    private String codigo;
    private String estado;

    public TOPlazas() {
    }

    public TOPlazas(int idplazas, String tipoplaza, String codigo, String estado) {
        this.idplazas = idplazas;
        this.tipoplaza = tipoplaza;
        this.codigo = codigo;
        this.estado = estado;
    }

    public int getIdplazas() {
        return idplazas;
    }

    public void setIdplazas(int idplazas) {
        this.idplazas = idplazas;
    }

    public String getTipoplaza() {
        return tipoplaza;
    }

    public void setTipoplaza(String tipoplaza) {
        this.tipoplaza = tipoplaza;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    
    
}


/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package to;

import java.sql.Date;

/**
 *
 * @author jk10s
 */
public class Vehiculos {
    private int idvehiculo;
    private String placa;
    private String tipovehiculo;
    private int idplazasvehiculo;
    private Date fechaingresp ;
    private Date fechasalidap ;

    public Vehiculos() {
    }

    public int getIdvehiculo() {
        return idvehiculo;
    }

    public void setIdvehiculo(int idvehiculo) {
        this.idvehiculo = idvehiculo;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getTipovehiculo() {
        return tipovehiculo;
    }

    public void setTipovehiculo(String tipovehiculo) {
        this.tipovehiculo = tipovehiculo;
    }

    public int getIdplazasvehiculo() {
        return idplazasvehiculo;
    }

    public void setIdplazasvehiculo(int idplazasvehiculo) {
        this.idplazasvehiculo = idplazasvehiculo;
    }

    public Date getFechaingresp() {
        return fechaingresp;
    }

    public void setFechaingresp(Date fechaingresp) {
        this.fechaingresp = fechaingresp;
    }

    public Date getFechasalidap() {
        return fechasalidap;
    }

    public void setFechasalidap(Date fechasalidap) {
        this.fechasalidap = fechasalidap;
    }
    
    
    
    
}

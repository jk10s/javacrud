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
public class TOFactura {
    private int idFactura;
    private String placa;
    private String tipoVehiculo;
    private double costo;
    private Date fechaEntrada;
    private Date fechaSalida;
    private int idPlazaFactura;
    private int idfacuser;

    public TOFactura() {
    }

    public TOFactura(int idFactura, String placa, String tipoVehiculo, double costo, Date fechaEntrada, Date fechaSalida, int idPlazaFactura, int idfacuser) {
        this.idFactura = idFactura;
        this.placa = placa;
        this.tipoVehiculo = tipoVehiculo;
        this.costo = costo;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.idPlazaFactura = idPlazaFactura;
        this.idfacuser = idfacuser;
    }

    public TOFactura(String placa, String tipoVehiculo, double costo, Date fechaEntrada, Date fechaSalida, int idPlazaFactura, int idfacuser) {
        this.placa = placa;
        this.tipoVehiculo = tipoVehiculo;
        this.costo = costo;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
        this.idPlazaFactura = idPlazaFactura;
        this.idfacuser = idfacuser;
    }
    
    

    public int getIdFactura() {
        return idFactura;
    }

    public void setIdFactura(int idFactura) {
        this.idFactura = idFactura;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getTipoVehiculo() {
        return tipoVehiculo;
    }

    public void setTipoVehiculo(String tipoVehiculo) {
        this.tipoVehiculo = tipoVehiculo;
    }

    public double getCosto() {
        return costo;
    }

    public void setCosto(double costo) {
        this.costo = costo;
    }

    public Date getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(Date fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public Date getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(Date fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public int getIdPlazaFactura() {
        return idPlazaFactura;
    }

    public void setIdPlazaFactura(int idPlazaFactura) {
        this.idPlazaFactura = idPlazaFactura;
    }

    public int getIdfacuser() {
        return idfacuser;
    }

    public void setIdfacuser(int idfacuser) {
        this.idfacuser = idfacuser;
    }
    
    

    }

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package to;

/**
 *
 * @author jk10s
 */
public class TOTarifa {
    
    private int idtarifa;
    private double precio;
    private double preciofraccion;
    private int fraciiion;

    public TOTarifa() {
    }

    public TOTarifa(int idtarifa, double precio, double preciofraccion, int fraciiion) {
        this.idtarifa = idtarifa;
        this.precio = precio;
        this.preciofraccion = preciofraccion;
        this.fraciiion = fraciiion;
    }

    public int getIdtarifa() {
        return idtarifa;
    }

    public void setIdtarifa(int idtarifa) {
        this.idtarifa = idtarifa;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public double getPreciofraccion() {
        return preciofraccion;
    }

    public void setPreciofraccion(double preciofraccion) {
        this.preciofraccion = preciofraccion;
    }

    public int getFraciiion() {
        return fraciiion;
    }

    public void setFraciiion(int fraciiion) {
        this.fraciiion = fraciiion;
    }
    
    
    
    
    
}

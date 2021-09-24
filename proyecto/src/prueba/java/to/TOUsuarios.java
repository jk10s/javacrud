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
public class TOUsuarios {
    
    private int idusuario;
    private String nombre;
    private String apellido;
    private String usuario;
    private String clave;
    private String tipoidentificacion;
    private String identificacion;
    private String correo;

    public TOUsuarios() {
    }
    

    public TOUsuarios(String nombre, String apellido, String usuario, String tipoidentificacion, String identificacion) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
        this.tipoidentificacion = tipoidentificacion;
        this.identificacion = identificacion;
    }

    public TOUsuarios(int idusuario, String nombre, String apellido, String usuario, String clave, String tipoidentificacion, String identificacion, String correo) {
        this.idusuario = idusuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
        this.clave = clave;
        this.tipoidentificacion = tipoidentificacion;
        this.identificacion = identificacion;
        this.correo = correo;
    }

    

    public int getIdusuario() {
        return idusuario;
    }

    public void setIdusuario(int idusuario) {
        this.idusuario = idusuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public String getTipoidentificacion() {
        return tipoidentificacion;
    }

    public void setTipoidentificacion(String tipoidentificacion) {
        this.tipoidentificacion = tipoidentificacion;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

   
    
    
    
        
    }

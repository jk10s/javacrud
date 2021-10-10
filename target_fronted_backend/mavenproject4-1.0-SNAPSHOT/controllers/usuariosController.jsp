<%@page import="com.google.gson.Gson"%>
<%@page import="to.TOUsuarios"%>
<%@page import="java.util.ArrayList"%>
<%@page import="controlador.CtrlUsuarios"%>
<%CtrlUsuarios usuariosCtrl = new CtrlUsuarios();
String opcion = request.getParameter("opcion");
if("listar".equals(opcion)){
    ArrayList<TOUsuarios> usuarios = usuariosCtrl.consultarUsuarios();
    out.print(new Gson().toJson(usuarios));
}else if("insertar".equals(opcion)){
    String datos = request.getParameter("data");
    TOUsuarios usuariosTo = new Gson().fromJson(datos, TOUsuarios.class);   
    usuariosCtrl.insertarUsuario(usuariosTo);
}else if("login".equals(opcion)){
    String datos = request.getParameter("data"); 
    TOUsuarios usuario = new Gson().fromJson(datos, TOUsuarios.class);
    usuario = usuariosCtrl.verificarUsuario(usuario.getUsuario(), usuario.getClave());
    out.print(new Gson().toJson(usuario));
}else
{
    out.print("Opcion no valida");
}

%>

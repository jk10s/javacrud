<%@page import="to.TOUsuarios"%>
<%@page import="java.util.ArrayList"%>
<%@page import="controlador.CtrlUsuarios"%>
<%@page import="com.google.gson.Gson"%>
<% CtrlUsuarios controladorUsuarios = new CtrlUsuarios();
String opcion = request.getParameter("opcion");
if("listar".equals(opcion)){
ArrayList<TOUsuarios> usuarios = controladorUsuarios.consultarUsuarios();
out.print(new Gson().toJson(usuarios));
    }else if("insertar".equals(opcion)){
    }else if("actualizar".equals(opcion)){
    }else if("eliminar".equals(opcion)){
    }else {
     out.println("esta opcion no esta disponible");
    
    }
    
%>


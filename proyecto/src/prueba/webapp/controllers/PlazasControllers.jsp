<%@page import="controlador.CtrlPlazas"%>
<%@page import="to.TOPlazas"%>
<%@page import="java.util.ArrayList"%>
<%@page import="controlador.CtrlUsuarios"%>
<%@page import="com.google.gson.Gson"%>
<% CtrlPlazas controladorPlazas = new CtrlPlazas();
String opcion = request.getParameter("opcion");
if("listar".equals(opcion)){
ArrayList<TOPlazas> plazas = controladorPlazas.consultarPlazas();
out.print(new Gson().toJson(plazas));
    }else if("insertar".equals(opcion)){
    }else if("actualizar".equals(opcion)){
    }else if("eliminar".equals(opcion)){
    }else {
     out.println("esta opcion no esta disponible");
    
    }
    
%>
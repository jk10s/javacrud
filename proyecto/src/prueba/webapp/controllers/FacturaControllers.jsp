<%@page import="controlador.CtrlFactura"%>
<%@page import="controlador.CtrlPlazas"%>
<%@page import="to.TOFactura"%>
<%@page import="java.util.ArrayList"%>
<%@page import="controlador.CtrlUsuarios"%>
<%@page import="com.google.gson.Gson"%>
<% CtrlFactura controladorPFacturas = new CtrlFactura();
String opcion = request.getParameter("opcion");
if("listar".equals(opcion)){
ArrayList<TOFactura> facturas = controladorPFacturas.consultarFactura();
out.print(new Gson().toJson(facturas));
    }else if("insertar".equals(opcion)){
    }else if("actualizar".equals(opcion)){
    }else if("eliminar".equals(opcion)){
    }else {
     out.println("esta opcion no esta disponible");
    
    }
    
%>
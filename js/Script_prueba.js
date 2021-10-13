function obtenerDatos() {
    var user=document.getElementById("user").value;
    var pass=document.getElementById("pass").value;
    var seleccion=document.getElementById("seleccion").value;
    if (parseInt(seleccion,10)==1){
        window.location="perfil_Usuario.html";
    }
    else if(parseInt(seleccion,10)==2){
        window.location="perfil_Administrador.html";
        a=window.document.getElementById("iniciarSesion");
        b=window.document.getElementById("registrarse");
    }
    else{
        alert("No has seleccionado rol");
        window.location="Login.html";
    }
    


    alert("Sus datos de inicio de seccion son los siguientes: \nUsuario "+user+"\nContraseña: "+pass);
    alert("Se ha iniciado sesion.")

}
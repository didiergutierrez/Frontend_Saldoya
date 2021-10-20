function obtenerDatos() {
    var user=document.getElementById("user").value;
    var pass=document.getElementById("pass").value;
    var seleccion=document.getElementById("seleccion").value;
    if (parseInt(seleccion,10)==1){
        window.location="perfil_Usuario.html";
        alert("Sus datos de inicio de seccion son los siguientes: \nUsuario "+user+"\nContraseña: "+pass);
        alert("Se ha iniciado sesion.")

    }
    else if(parseInt(seleccion,10)==2){
        window.location="perfil_Administrador.html";
        a=window.document.getElementById("iniciarSesion");
        b=window.document.getElementById("registrarse");
        alert("Sus datos de inicio de seccion son los siguientes: \nUsuario "+user+"\nContraseña: "+pass);
        alert("Se ha iniciado sesion.")

    }
    else{
        alert("No has seleccionado rol");
        window.location="Login.html?id=12";
        var urlactual=window.location;
        var idParameter = getUrlParameters("id", urlactual, true);
        alert(idParameter)

    }
    


   
}


function getUrlParameters(parameter, staticURL, decode){

    var currLocation = (staticURL.length)? staticURL : window.location.search,
        parArr = currLocation.split("?")[1].split("&"),
        returnBool = true;

    for(var i = 0; i < parArr.length; i++){
         parr = parArr[i].split("=");
         if(parr[0] == parameter){
             return (decode) ? decodeURIComponent(parr[1]) : parr[1];
             returnBool = true;
         }else{
             returnBool = false;            
         }
    }

    if(!returnBool) return false;  
 }
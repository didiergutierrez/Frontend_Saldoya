function obtenerDatos() {
    var user=document.getElementById("user").value;
    var pass=document.getElementById("pass").value;
    var seleccion=document.getElementById("seleccion").value;
    var userBD;
    var passBD;
    if (parseInt(seleccion,10)==1){

        var endpoint="http://localhost:8080/cliente/"+user;
        $.get(endpoint,function(cliente){
            userBD=cliente.cedula;
            passBD=cliente.contraseña;
            alert(userBD+"    "+passBD)
        })
        
        
        window.location="perfil_Usuario.html?user="+userBD+"&rol=cliente";
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
        var a=12;
        var b=54;
        window.location="Login.html?id="+a+"&calle="+b;
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


 $(function(){
    var userBD="";
    var passBD="";
    $("#buscar").on("click",function(){
    var user=document.getElementById("user").value;
    var pass=document.getElementById("pass").value;
    var seleccion=document.getElementById("seleccion").value;
    

    if (parseInt(seleccion,10)==1){
        var endpoint="http://localhost:8080/cliente/"+user;
        console.log(endpoint);
        $.get(endpoint,function(cliente){
            userBD=cliente.cedula;
            passBD=cliente.contraseña;
            alert("Contraseña ingresada: "+pass+"  usuario ingresado: "+user+"  usuario "+userBD);
            if(userBD==user && pass==passBD){
                alert("Datos Correcto....Iniciando sesion")
                window.location="perfil_Usuario.html?id="+userBD+"&rol=cliente";
            }else{
               alert("Datos incorrectos, intentelo de nuevo: \n"+user);
            }
        })
    }
    else if(parseInt(seleccion,10)==2){
        alert("Sus datos de inicio de seccion son los siguientes: \nUsuario "+user+"\nContraseña: "+pass);
        alert("Se ha iniciado sesion.")
        window.location="perfil_Administrador.html?id="+user;
    }
    else if(parseInt(seleccion,10)==3){
        alert("Sus datos de inicio de seccion son los siguientes: \nUsuario "+user+"\nContraseña: "+pass);
        alert("Se ha iniciado sesion.")
        window.location="perfil_Administrador.html?id="+user;
    }
    else{
        alert("No has seleccionado rol");
        var urlactual=window.location;
        var idParameter = getUrlParameters("id", urlactual, true);
        alert(idParameter)
        console.log(idParameter)
        window.location="Login.html?id="+user;
    }


    })
})
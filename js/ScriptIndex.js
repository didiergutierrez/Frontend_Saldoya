$().ready(function(){
    var urlactual=window.location;
    try{
        var user = getUrlParameters("id", urlactual, true);
        var rol= getUrlParameters("rol", urlactual, true);
    }
    catch{
        user=false;
    }
    if(user==false){
        $("#perfil").hide();
        alert("no ha iniciado sesion");
    }
    else{
        $("#registrarse").hide();
        $("#inicioSesion").hide();
        if(rol=="adminTienda"){
            $("#perfil").val("Registrar Saldo");  
        }
    }
})

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
    
    $("#perfil").on("click",function(){
        var urlactual=window.location;
        var user = getUrlParameters("id", urlactual, true);
        var rol = getUrlParameters("rol", urlactual, true);
        if(rol=="cliente"){
        window.location="Perfil_Usuario.html?id="+user+"&rol="+rol;
        }
        else if(rol=="admin"){
        window.location="Perfil_Administrador.html?id="+user+"&rol="+rol;
        }
        else{
            window.location="RegistrarSaldo.html?id="+user+"&rol="+rol;
        }
         })
    
    $("#inicio").on("click",function(){
        var urlactual=window.location;
        var user = getUrlParameters("id", urlactual, true);
        var rol = getUrlParameters("rol", urlactual, true);
        window.location="index.html?id="+user+"&rol="+rol;
         })

        })
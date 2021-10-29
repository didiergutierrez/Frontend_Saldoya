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

$().ready(function(){
    var urlactual=window.location;
    try{
        var user = getUrlParameters("id", urlactual, true);
    }
    catch{
        user=false;
    }
    if(user!=false){
        $("#registrarse").hide();
        $("#login").hide();
        $("#guardarCambios").hide();
        var endpoint="http://localhost:8080/cliente/"+user;
    $.get(endpoint,function(cliente){
        Nombre=cliente.nombreCompleto;
        tipoDocumento=cliente.tipoDocumento;
        correo=cliente.correo;
        contraseña=cliente.contraseña;
        telefono=cliente.numeroCelular;
        direccion=cliente.direccion;
        sexo=cliente.sexo;
        saldo=cliente.saldo;
        alert("Bienvenido "+Nombre);

        $("#NombreCliente").val(Nombre);
        if(tipoDocumento="CC"){
            $("#tipoDocumento option[value='"+1+"']").attr("selected", true);
        }
        else if(tipoDocumento="TI"){
            $("#tipoDocumento option[value='"+2+"']").attr("selected", true);
        }
        else{
            $("#tipoDocumento option[value='"+3+"']").attr("selected", true);
        }
        $("#NumeroDocumento").val(user);
        $("#correo").val(correo);
        $("#contraseña").val(contraseña);
        $("#telefono").val(telefono);
        $("#direccion").val(direccion);
        $("#saldo").val("$"+saldo);
        if(sexo="masculino"){
            $("#sexo option[value='"+1+"']").attr("selected", true);
        }
        else if(sexo="femenino"){
            $("#tipoDocumento option[value='"+2+"']").attr("selected", true);
        }
        else{
            $("#tipoDocumento option[value='"+3+"']").attr("selected", true);
        }
       
    })
    }
    else{
        $("#perfil").hide();
        alert("no ha iniciado sesion");
    }
    
 });

 $(function(){
    
    $("#perfil").on("click",function(){
        var urlactual=window.location;
        var user = getUrlParameters("id", urlactual, true);
        var rol = getUrlParameters("rol", urlactual, true);
        window.location="Perfil_Usuario.html?id="+user+"&rol="+rol;
         })
    
    $("#inicio").on("click",function(){
        var urlactual=window.location;
        var user = getUrlParameters("id", urlactual, true);
        var rol = getUrlParameters("rol", urlactual, true);
        window.location="index.html?id="+user+"&rol="+rol;
         })

    $("#cerrarSesion").on("click",function(){
        window.location="index.html";
    })

    $("#editar").on("click",function(){
        $("#correo").attr("disabled",false);
        $("#contraseña").attr("disabled",false);
        $("#telefono").attr("disabled",false);
        $("#direccion").attr("disabled",false);
        $("#sexo").attr("disabled", false);
        $("#guardarCambios").show();
        $("#nuevaContraseña").show();
        $("#editar").hide();
        $("#info").css("height","80%");


        })
});

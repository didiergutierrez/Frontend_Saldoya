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
        var endpoint="http://localhost:8080/admin/"+user;
    $.get(endpoint,function(admin){
        Nombre=admin.nombreCompleto;
        tipoDocumento=admin.tipoDocumento;
        correo=admin.correo;
        contraseña=admin.contraseña;
        telefono=admin.numeroCelular;
        direccion=admin.direccion;
        sexo=admin.sexo;
        saldo=admin.saldo;
        alert("Bienvenido "+Nombre);

        $("#nombre").val(Nombre);
        if(tipoDocumento=="CC"){
            $("#tipoDocumento option[value='"+1+"']").attr("selected", true);
        }
        else if(tipoDocumento=="TI"){
            $("#tipoDocumento option[value='"+2+"']").attr("selected", true);
        }
        else{
            $("#tipoDocumento option[value='"+3+"']").attr("selected", true);
        }
        $("#cedula").val(user);
        $("#correo").val(correo);
        $("#contraseña").val(contraseña);
        $("#telefono").val(telefono);
        $("#direccion").val(direccion);
        if(sexo=="masculino"){
            $("#sexo option[value='"+1+"']").attr("selected", true);
        }
        else if(sexo=="femenino"){
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
        window.location="Perfil_Administrador.html?id="+user+"&rol="+rol;
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

    $("#guardarCambios").on("click",function(e){
        e.preventDefault();
        var nombre=$("#nombre").val();
        var tipoDocumento=$("#tipoDocumento").val();
        var cedula=$("#cedula").val();
        var correo=$("#correo").val();
        var contraseña=$("#contraseña").val();
        var telefono=$("#telefono").val();
        var direccion=$("#direccion").val();
        var sexo=$("#sexo").val();
        var contraseña1=$("#contraseña1").val();
        var contraseña2=$("#contraseña2").val();
        var td="";
        if(tipoDocumento="1"){
            $("#tipoDocumento option[value='"+1+"']").attr("selected", true);
            td="CC";
        }
        else if(tipoDocumento="2"){
            td="TI";
        }
        else{
            td="CE";
        }
        if(contraseña1!="" && contraseña2!=""){
            if(contraseña1==contraseña2){
                contraseña=contraseña1;
            }
        }
        else{
            alert("Las contraseñas no coinciden");
        }

        if(sexo=="1"){
            sexo="Masculino"
        }
        else if (sexo=="2"){
            sexo="Femenino"
        }
        else{
            sexo="Otro"
        }
        var endpoint="http://localhost:8080/admin/"+cedula;
        $.get(endpoint,function(cliente){
            var id=cliente.id;
            fetch("http://localhost:8080/admin",{
                method:"POST",
                mode:"cors",
                cache:"no-cache",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({id:id,cedula:cedula,correo:correo,direccion:direccion,contraseña:contraseña,tipoDocumento:td,sexo:sexo,nombreCompleto:nombre,numeroCelular:telefono})

            }).then(response=>response.json());
            $("#correo").attr("disabled",true);
            $("#contraseña").attr("disabled",true);
            $("#telefono").attr("disabled",true);
            $("#direccion").attr("disabled",true);
            $("#sexo").attr("disabled", true);
            $("#guardarCambios").hide();
            $("#nuevaContraseña").hide();
            $("#editar").show();
            $("#info").css("height","70%");
            })
    
        })

        $("#registrarTienda").on("click",function(e){
            e.preventDefault();
            var nombreTienda=$("#nombreTienda").val();
            var RU=$("#RU").val();
            var tipoNegocio=$("#tipoNegocio").val();
            var contraseñaTienda=$("#contraseñaTienda").val();

            fetch("http://localhost:8080/tienda",{
                method:"POST",
                mode:"cors",
                cache:"no-cache",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({ru:RU,tipoNegocio:tipoNegocio,nombreTienda:nombreTienda,contraseña:contraseñaTienda})

            }).then(response=>response.json());

            $("#nombreTienda").val("");
            $("#RU").val("");
            $("#tipoNegocio").val("");
            $("#contraseñaTienda").val("");



        })

});

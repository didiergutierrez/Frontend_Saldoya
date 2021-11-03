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
        var endpoint="http://localhost:8080/tienda/"+user;
        $.get(endpoint,function(tienda){
            nombreTienda=tienda.nombreTienda;
            alert("Bienvenido  "+nombreTienda);
            $("#idTienda").val(user);
        })
    }
    else{
        $("#perfil").hide();
        alert("no ha iniciado sesion");
    }
    var rol = getUrlParameters("rol", urlactual, true);
    if(rol=="adminTienda"){
        $("#perfil").text('Registrar Saldo');
    }
})


$(function(){
    
    $("#perfil").on("click",function(){
        var urlactual=window.location;
        var user = getUrlParameters("id", urlactual, true);
        var rol = getUrlParameters("rol", urlactual, true);
        window.location=window.location;
         })
    
    $("#inicio").on("click",function(){
        var urlactual=window.location;
        var user = getUrlParameters("id", urlactual, true);
        var rol = getUrlParameters("rol", urlactual, true);
        window.location="index.html?id="+user+"&rol="+rol;
         })

    $("#salir").on("click",function(){
        window.location="index.html";
    })

    $("#buscarCliente").on("click",function(e){
        e.preventDefault();
        cedula=$("#idCliente").val();
        var endpoint="http://localhost:8080/cliente/"+cedula;
        $.get(endpoint,function(cliente){
            if(cliente!=null){
                $("#habilitar").val("Habilitado");
                $("#idCliente").attr("disabled",true);
                alert("El cliente esta registrado");
            }
            else{
                $("#habilitar").val("Inhabilitado");
                alert("El cliente no esta registrado");
            }

        });

    })

    $("#registrarSaldo").on("click",function(e){
        e.preventDefault();
        var aux=$("#habilitar").val();
        var idTienda=$("#idTienda").val();
        var cedula=$("#idCliente").val();
        var saldo=$("#saldo").val();
        if(aux=="Habilitado"){
            fetch("http://localhost:8080/saldo",{
                method:"POST",
                mode:"cors",
                cache:"no-cache",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({idTienda:idTienda,cedula:cedula,valorSaldo:saldo})
            }).then(response=>response.json());
            var endpoint="http://localhost:8080/cliente/"+cedula;
            $.get(endpoint,function(cliente){
                var id=cliente.id;
                var cedula=cliente.cedula;
                var correo=cliente.correo;
                var direccion=cliente.direccion;
                var contraseña=cliente.contraseña;
                var tipoDocumento=cliente.tipoDocumento;
                var numeroCelular=cliente.numeroCelular;
                var sexo=cliente.sexo;
                var saldoBd=parseFloat(cliente.saldo);
                var nombreCompleto=cliente.nombreCompleto;
                saldoBd=saldoBd+parseFloat(saldo);

                fetch("http://localhost:8080/cliente",{
                method:"POST",
                mode:"cors",
                cache:"no-cache",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({id:id,cedula:cedula,correo:correo,direccion:direccion,contraseña:contraseña,saldo:saldoBd,tipoDocumento:tipoDocumento,sexo:sexo,nombreCompleto:nombreCompleto,numeroCelular:numeroCelular})
            }).then(response=>response.json()).then(()=>alert("Saldo registrado con exito."));


            })
            $("#habilitar").val("Inhabilitado");
            $("#idCliente").attr("disabled",false);
        }
        else{
            alert("Por favor, ingrese un cliente registrado");
        }
        

    })


    $("#guardarCambios").on("click",function(e){
        e.preventDefault();
        var nombreCliente=$("#NombreCliente").val();
        var tipoDocumento=$("#tipoDocumento").val();
        var numeroDocumento=$("#NumeroDocumento").val();
        var correo=$("#correo").val();
        var contraseña=$("#contraseña").val();
        var telefono=$("#telefono").val();
        var direccion=$("#direccion").val();
        var sexo=$("#sexo").val();
        var saldo=$("#saldoCliente").val();
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

        if(contraseña1==contraseña2){
            contraseña=contraseña1;
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
        var endpoint="http://localhost:8080/cliente/"+numeroDocumento;
        $.get(endpoint,function(cliente){
            var id=cliente.id;
            try{
                fetch("http://localhost:8080/cliente",{
                method:"POST",
                mode:"cors",
                cache:"no-cache",
                headers:{"Content-type":"application/json"},
                body:JSON.stringify({id:id,cedula:numeroDocumento,correo:correo,direccion:direccion,contraseña:contraseña,saldo:saldo,tipoDocumento:td,sexo:sexo,nombreCompleto:nombreCliente,numeroCelular:telefono})

            }).then(response=>response.json()).then(()=>alert("Actualizacion completada"));
        }

        catch{

        }
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
});
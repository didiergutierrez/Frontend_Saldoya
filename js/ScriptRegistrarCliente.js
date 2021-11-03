$(function(){
    
    $("#registrarse").on("click",function(e){
        e.preventDefault();
        var id=$("#id").val();
        var nombreCliente=$("#NombreCliente").val();
        var tipoDocumento=$("#tipoDocumento").val();
        var numeroDocumento=$("#NumeroDocumento").val();
        var correo=$("#correo").val();
        var contraseña=$("#contraseña").val();
        var telefono=$("#telefono").val();
        var direccion=$("#direccion").val();
        var sexo=$("#sexo").val();
        var saldo=0;
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

        

        if(sexo=="1"){
            sexo="Masculino"
        }
        else if (sexo=="2"){
            sexo="Femenino"
        }
        else{
            sexo="Otro"
        }
        alert(correo+"  "+numeroDocumento+"  "+telefono+"  "+saldo+"  "+contraseña+"  "+td+"  "+nombreCliente+"  "+direccion+"  "+sexo);

        fetch("http://localhost:8080/cliente",{
            method:"POST",
            mode:"cors",
            cache:"no-cache",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({cedula:numeroDocumento,correo:correo,direccion:direccion,contraseña:contraseña,saldo:saldo,tipoDocumento:td,sexo:sexo,nombreCompleto:nombreCliente,numeroCelular:telefono})

        }).then(response=>response.json()).then(()=>alert("Cliente registrado correctamente"));
        
    })
})
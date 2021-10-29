$(function(){
    
    $("#registrarse").on("click",function(e){
        e.preventDefault();

        nombre=$("#NombreCliente").val();
        tipoDocumento=$("#tipoDocumento").val();
        if(tipoDocumento="1"){
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
})
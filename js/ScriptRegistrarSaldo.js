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
            
        })
    }
    else{
        $("#perfil").hide();
        alert("no ha iniciado sesion");
    }
})

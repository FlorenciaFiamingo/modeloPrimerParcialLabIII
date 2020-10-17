window.addEventListener("load",function(){
   
    mostrarOcultarDiv();
    ajax();
    
    var btn2 = document.getElementById("btnMas");
    btn2.addEventListener("click", mostrarOcultarDiv);
    btn2.addEventListener("click", resetForm);

    var btn3 = document.getElementById('btnEliminar');
    btn3.addEventListener('click', eliminarRegistro);

    var btn4 = document.getElementById('btnModificar');
   /* btn4.addEventListener("click", function(event){
        event.preventDefault()
    });*/
    btn4.addEventListener('click', modificarRegistro);

    cargarTabla();

});

var miEvento;


function enviarDatos(){
    var dato = obtenerDatos();
    ajaxEnviarJSON(dato,"http://localhost:3000/nueva");
    resetForm();
    obtenerUltimoID();
}

function obtenerUltimoID(){
    var tabla = document.getElementById('tbody');
    //console.log(tabla.lastChild.firstChild.innerHTML);
    var ultimoID = tabla.lastChild.firstChild;
    if(ultimoID===null){
        ultimoID=0;
    }else{

        ultimoID.innerHTML;
    }
    return ultimoID;
}

function obtenerDatos(){
    var dato = {};
    dato["id"] = document.getElementById('id').value;
    //obtenerUltimoID() + 1;
    dato["nombre"] = document.getElementById("nombre").value;
    dato["cuatrimestre"] = document.getElementById("cuatrimestre").value;
    dato["fecha"] = document.getElementById("fecha").value;
    //dato["sexo"] = document.getElementByName("sexo").value;
    var man = document.getElementById('turnom');
    var noc = document.getElementById('turnon');

    if(man.checked == true){
        dato["turno"] = 'Mañana';
    }else if(noc.checked == true){
        dato["turno"] = 'Noche';
    }

    return dato;
}

function insertarNuevoDato(data){

    var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    var fila = document.createElement('tr');

    for (var i in data) {
            var celda = document.createElement('td');
            celda.style.textAlign = 'left';
            var dato = document.createTextNode(data[i]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        table.appendChild(fila);
}

function cargarTabla(){

    //CABECERA
    var thead = document.getElementById('cabecera');

    var th1 = document.createElement('th');
    var txtTh1 = document.createTextNode('Id');
    th1.appendChild(txtTh1);

    var th2 = document.createElement('th');
    var txtTh2 = document.createTextNode('Nombre');
    th2.appendChild(txtTh2);

    var th3 = document.createElement('th');
    var txtTh3 = document.createTextNode('Cuatrimestre');
    th3.appendChild(txtTh3);

    var th4 = document.createElement('th');
    var txtTh4 = document.createTextNode('Fecha Final');
    th4.appendChild(txtTh4);

    var th5 = document.createElement('th');
    var txtTh5 = document.createTextNode('Turno');
    th5.appendChild(txtTh5);

    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3);
    thead.appendChild(th4);
    thead.appendChild(th5);

}

function cargarTablaJSON(data){
    var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];

    for (var i in data) {
        var fila = document.createElement('tr');
        for (var j in data[i]) {
            var celda = document.createElement('td');
            var dato = document.createTextNode(data[i][j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        table.appendChild(fila);
    }

    var id = obtenerUltimoID();
    console.log(id);
}

function resetForm(){
    
    document.getElementById("cuatrimestre").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("id").value = "";
    document.getElementsByTagName('sexo').value = '';
}

function eliminarRegistro(){

    var dato = obtenerDatos();
    var fila = miEvento.parentNode; 
    console.log(fila);
    var tabla = document.getElementById('tbody');
    ajaxEnviarJSON(dato,"http://localhost:3000/eliminar"); 
    tabla.removeChild(fila);
    resetForm();
    setTimeout(location.reload(), 3000);
}

function modificarRegistro(){
    
    cambiarInputs();
    
    if(validarDatos()=== true){
        var datos = obtenerDatos();
        ajaxEnviarJSON(datos,"http://localhost:3000/editar");
        resetForm();
    }
}

function cambiarInputs(){
    var nombre = document.getElementById('nombre');
    nombre.style.borderColor = 'black';
}

function validarDatos(){
    
    var dato = obtenerDatos();
   
    var min = 6
    var nombre = document.getElementById('nombre');
    var nombreString = new String(dato.nombre);
    
    var retorno;

    if(nombreString.length > 0 && nombreString.length < min){
        nombre.style.borderColor = 'red';
        //nombre.parentNode.innerHTML = nombre.parentNode.innerHTML + "<p style='color:red'>La cantidad mínima de caracteres es de " + min + "</p>";
        alert('La cantidad mínima de caracteres para el nombre de la materia es de : ' + min);
        console.log(nombreString);
        retorno = false;
    }else{
        nombre.style.borderColor = 'black';
        retorno = true;
    }

    return retorno;
    
}

function mostrarOcultarDiv(){
    var div = document.getElementById("divForm");
    div.style.display = (div.style.display == 'none') ? 'block' : 'none';
}
/*
function mostrarSpinner(){
    var contenedor = document.getElementById('contenedor_spinner');
    contenedor.style.visibility = visible;
    contenedor.style.opacity='0';
}*/

function levantarDatos(event) { 
    if(document.getElementById("divForm").style.display == 'none'){
        mostrarOcultarDiv();
    }
    var x = event.target.parentElement;
    
    var x1 = x.firstChild; //id
    var x2 = x1.nextSibling; //nombre
    var x3 = x2.nextSibling; //cuatri
    var x4 = x3.nextSibling; //fecha
    var x5 = x.lastChild; // turno

    var x1txt = x1.innerHTML; //id txt
    var x2txt = x2.innerHTML; //nombre txt
    var x3txt = x3.innerHTML;//apellido txt
    var x4txt = x4.innerHTML; //fecha
    var x5txt = x5.innerHTML;//turno

    var id = document.getElementById("id");
    var nombre = document.getElementById("nombre");
    var cuatrimestre = document.getElementById("cuatrimestre");
    var fecha = document.getElementById("fecha");
    var turnom = document.getElementById("turnom");
    var turnon = document.getElementById("turnon");

    var arrayFecha = x4txt.split("/", 3);
    var dia = arrayFecha[0];
    var mes = arrayFecha[1];
    var ano = arrayFecha[2];
    var mesdiaano = mes + "/"+dia+"/"+ano;
    console.log(arrayFecha);
    
    id.value = x1txt;
    nombre.value = x2txt;
    cuatrimestre.value = x3txt;
    fecha.valueAsDate = new Date(mesdiaano); // Me está levantando al revés el mes y el día
    if(x5txt=='Mañana'){
        turnom.checked = true;
    }else{
        turnon.checked = true;
    }
    miEvento = event.target;
  }


// ************** AJAX ****************


  function ajax(){

    var datos = {};
   // console.log(datos.name + datos.pass);
    var peticionHttp = new XMLHttpRequest();
    
    peticionHttp.onreadystatechange = callback;
    
    peticionHttp.open("GET","http://localhost:3000/materias?id="+ datos.id +"&nombre="+datos.nombre+"&cuatrimestre="+ datos.cuatrimestre+"&fechaFinal="+datos.fecha+"&turno="+ datos.turno, true);
    peticionHttp.setRequestHeader("Content-type","application/json");// si es json "application/json
    peticionHttp.send(JSON.stringify({"id:": datos.id, "nombre": datos.nombre , "cuatrimestre" : datos.cuatrimestre , 
    "fechaFinal" : datos.fecha , "turno" : datos.turno}));
    function callback(){
        if(peticionHttp.readyState=== 4){
            if(peticionHttp.status === 200){
               var datos = JSON.parse(peticionHttp.response);
               //console.log(datos);
               cargarTablaJSON(datos);
            }
        }
    }
}

function ajaxEnviarJSON(datos, url){

    var peticionHttp = new XMLHttpRequest();
    
    peticionHttp.onreadystatechange = callback;
    var fecha = new String(datos.fecha);
    var arrayFecha = fecha.split("-", 3);
    var dia = arrayFecha[2];
    var mes = arrayFecha[1];
    var ano = arrayFecha[0];
    var mesdiaano = dia + "/"+mes+"/"+ano;
    
    peticionHttp.open("POST",url, true);
    peticionHttp.setRequestHeader("Content-type","application/json");// si es json "application/json
    peticionHttp.send(JSON.stringify({"id": datos.id, "nombre": datos.nombre , "cuatrimestre" : datos.cuatrimestre , 
    "fechaFinal" : mesdiaano, "turno": datos.turno}));
    function callback(){
        if(peticionHttp.readyState=== 4){
            if(peticionHttp.status === 200){
                console.log("ok");
                insertarNuevoDato(datos);
                location.reload();
                
            }
        }
    }

}



window.addEventListener("load",function(){
    mostrarOcultarDiv();
    ajax();

    var btn =document.getElementById("btn");
    btn.addEventListener("click", enviarDatos);
    
    var btn2 =document.getElementById("btnMas");
    btn2.addEventListener("click", mostrarOcultarDiv);

    var btn3 =document.getElementById("btnEliminar");
    btn3.addEventListener("click", eliminarRegistro);


    cargarTabla();

});

function enviarDatos(){
    var dato = obtenerDatos();
    insertarNuevoDato(dato);
    ajaxEnviarJSON(dato);
    resetForm();
}

function obtenerDatos(){
    var dato = {};
    dato["nombre"] = document.getElementById("nombre").value;
    dato["apellido"] = document.getElementById("apellido").value;
    dato["fecha"] = document.getElementById("fecha").value;
    dato["telefono"] = document.getElementById("telefono").value;
    
    return dato;
}

function insertarNuevoDato(data){

    var table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    var fila = document.createElement('tr');

    for (var i in data) {
            var celda = document.createElement('td');
            celda.style.textAlign = 'center';
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
    var txtTh3 = document.createTextNode('Apellido');
    th3.appendChild(txtTh3);

    var th4 = document.createElement('th');
    var txtTh4 = document.createTextNode('Fecha');
    th4.appendChild(txtTh4);

    var th5 = document.createElement('th');
    var txtTh5 = document.createTextNode('Sexo');
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

}

function resetForm(){
    document.getElementById("apellido").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("sexo").value = "";
}

function onDelete(td){
    if(confirm("Está seguro que desea eliminar el registro?")){
    
        var row = td.parentElement.parentElement;
        document.getElementById("tabla").deleteRow(row.rowIndex);
        resetForm();
    }
}

function eliminarRegistro(event){

    var fila = event.target.parentNode.parentNode;
    var tabla = document.getElementById('tbody');
    tabla.removeChild(fila);
    resetForm();
}

function mostrarOcultarDiv(){
    var div = document.getElementById("divForm");
    div.style.display = (div.style.display == 'none') ? 'block' : 'none';
}

function levantarDatos(event) { 
    if(document.getElementById("divForm").style.display == 'none'){
        mostrarOcultarDiv();
    }
    var x = event.target.parentElement;
    
    var x1 = x.firstChild;
    var x2 = x1.nextSibling;
    var x3 = x2.nextSibling;
    var x4 = x3.nextSibling;
    var x5 = x.lastChild;

    var x1txt = x1.innerHTML;// no muestro el ID
    var x2txt = x2.innerHTML;
    var x3txt = x3.innerHTML;
    var x4txt = x4.innerHTML;
    var x5txt = x5.innerHTML;

    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var fecha = document.getElementById("fecha");
    var sexo = document.getElementById("sexo");

    nombre.value = x2txt;
    apellido.value = x3txt;
    fecha.valueAsDate = new Date(x4txt);
    sexo.value = x5txt;
    if(x5txt=='Female'){
        
    }

    console.log(x3txt);
/*
    // BOTONES MODIFICAR Y ELIMINAR
    var divBoton = document.getElementById('divBoton');

    var btnModificar= document.createElement('button');
    btnModificar.setAttribute('id','btnModificar');
    var modif = 'Modificar';
    btnModificar.append(modif);

    var btnEliminar= document.createElement('button');
    btnEliminar.setAttribute('id','btnEliminar');
    var elim = 'Eliminar';
    btnEliminar.append(elim);

    var btnCancelar= document.createElement('button');
    btnCancelar.setAttribute('id','btnCancelar');
    var canc = 'Cancelar';
    btnCancelar.append(canc);
    
    
    divBoton.appendChild(btnModificar);
    divBoton.appendChild(btnEliminar);
    divBoton.appendChild(btnCancelar);
    */
    
  }

// ************** AJAX ****************


  function ajax(){

    var datos = {};
   // console.log(datos.name + datos.pass);
    var peticionHttp = new XMLHttpRequest();
    
    peticionHttp.onreadystatechange = callback;
    
    peticionHttp.open("GET","http://localhost:3000/personas?id="+ datos.id +"&nombre="+datos.nombre+"&apellido="+ datos.apellido+"&fecha="+datos.fecha+"&sexo="+ datos.sexo, true);
    peticionHttp.setRequestHeader("Content-type","application/json");// si es json "application/json
    peticionHttp.send(JSON.stringify({"id:": datos.id, "nombre": datos.nombre , "apellido" : datos.apellido , 
    "fecha" : datos.fecha , "sexo" : datos.sexo}));
    
    function callback(){
        if(peticionHttp.readyState=== 4){
            if(peticionHttp.status === 200){
               var datos = JSON.parse(peticionHttp.response);
               //console.log(datos[0].nombre);
               cargarTablaJSON(datos);
            }
        }
    }
}

function ajaxEnviarJSON(datos){

   //    var datos = {};
   // console.log(datos.name + datos.pass);
    var peticionHttp = new XMLHttpRequest();
    
    peticionHttp.onreadystatechange = callback;
    
    peticionHttp.open("POST","http://localhost:3000/nuevaPersona", true);
    peticionHttp.setRequestHeader("Content-type","application/json");// si es json "application/json
    peticionHttp.send(JSON.stringify({"nombre": datos.nombre , "apellido" : datos.apellido , 
    "fecha" : datos.fecha , "telefono" : datos.telefono}));
    //peticionHttp.send(JSON.stringify({"nombre" : "Florencia" , "apellido" : "Fiamingo" , "fecha" : "07/07/2020" , "telefono" : "111111"}));
    
    function callback(){
        if(peticionHttp.readyState=== 4){
            if(peticionHttp.status === 200){
                // alert(peticionHttp.responseText); MOSTRAR RESULTADO ENVIADOR POR SVR
                //var datos = JSON.parse(peticionHttp.response);
                console.log("ok");
               // cargarTablaJSON(datos);
            }
        }
    }
}
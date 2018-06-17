

  var config = {
    apiKey: "AIzaSyAhfE_suTjV7EsT-gOluBtnecTeCiI6TKk",
    authDomain: "polilibro.firebaseapp.com",
    databaseURL: "https://polilibro.firebaseio.com",
    projectId: "polilibro",
    storageBucket: "polilibro.appspot.com",
    messagingSenderId: "616532161554"
  };
  firebase.initializeApp(config);

  var db2 = firebase.database();

  var grupo = document.getElementById('grupo');
  var tareaname = document.getElementById('tareaname');
  var tareasForm = document.getElementById('tareasForm');

  var deleteForm = document.getElementById('deleteForm');
  var grupoDelete = document.getElementById('grupoDelete');
  var tareaDelete = document.getElementById('tareaDelete');







    var refGrupos= db2.ref('Grupos/');
    refGrupos.on("child_added",function(snapshot){
    var z = document.createElement("option");
    var z2 = document.createElement("option");

    z.setAttribute("value", snapshot.key);
    z2.setAttribute("value", snapshot.key);

    var t = document.createTextNode(snapshot.val().name);
    var t2 = document.createTextNode(snapshot.val().name);

    z.appendChild(t);
    z2.appendChild(t2);
    document.getElementById("grupo").appendChild(z);
    document.getElementById("grupoDelete").appendChild(z2);


  });


  tareasForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!grupo.value || !tareaname.value) return null



    var refAlumnos= db2.ref('Grupos/'+grupo.value+ "/Alumnos");
    refAlumnos.on("child_added",function(snapshot){
    //db2.ref('Grupos/'+grupo.value+ "/Alumnos/"+snapshot.key+"/Tareas/").push({
      db2.ref('Grupos/'+grupo.value+ "/Alumnos/"+snapshot.key+"/Tareas/"+tareaname.value).set({

        Nombre:tareaname.value,
        Calificacion: "Sin calificar",
        Comentario: "Sin Comentario"

      });
    });
    alert("Fue añadida con exito");
    grupo.value="";
    tareaname.value="";



});

// Metodos para eliminar las tareas del grupo seleccionado

//Funcion para que por cada grupo seleccioando despliegue las tareas de cada grupo
function selecttarea() {
  while (tareaDelete.hasChildNodes()) {
      tareaDelete.removeChild(tareaDelete.firstChild);
  }
  //Esta ref y con la funcion de abajo haria que se recorriean todos los alumnos pero las tareas se repetirian por eso se pone un limitToFirst porque con eso solo obtendra las del primer alumno pero esta bien porque todos los alumnos deben de tener las mismas tareas
var refTarea= db2.ref('Grupos/'+grupoDelete.value+"/Alumnos/").limitToFirst(1);
//console.log(refTarea);
refTarea.on("child_added",function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        childSnapshot.forEach(function(childchildSnapshot) {
            var u = document.createElement("option");
            u.setAttribute("value",childchildSnapshot.val().Nombre);
            var w = document.createTextNode(childchildSnapshot.val().Nombre);
            u.appendChild(w);
            tareaDelete.appendChild(u);
          });

        });
  });

  refTarea.on("child_changed",function(snapshot){
    while (tareaDelete.hasChildNodes()) {
        tareaDelete.removeChild(tareaDelete.firstChild);
    }
        snapshot.forEach(function(childSnapshot) {

          childSnapshot.forEach(function(childchildSnapshot) {
              var u = document.createElement("option");
              u.setAttribute("value",childchildSnapshot.val().Nombre);
              var w = document.createTextNode(childchildSnapshot.val().Nombre);
              u.appendChild(w);
              document.getElementById("tareaDelete").appendChild(u);
            });

          });
    });

    refTarea.on("child_removed",function(snapshot){
      while (tareaDelete.hasChildNodes()) {
          tareaDelete.removeChild(tareaDelete.firstChild);
      }
          snapshot.forEach(function(childSnapshot) {

            childSnapshot.forEach(function(childchildSnapshot) {
                var u = document.createElement("option");
                u.setAttribute("value",childchildSnapshot.val().Nombre);
                var w = document.createTextNode(childchildSnapshot.val().Nombre);
                u.appendChild(w);
                document.getElementById("tareaDelete").appendChild(u);
              });

            });
      });

}


// Borrar la tarea seleccionada
deleteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!grupoDelete.value || !tareaDelete.value) return null
  var refAlumnos2= db2.ref('Grupos/'+grupoDelete.value+ "/Alumnos");
  refAlumnos2.on("child_added",function(snapshot){
  db2.ref('Grupos/'+grupoDelete.value+ "/Alumnos/"+snapshot.key+"/Tareas/"+tareaDelete.value).remove();

  });
  alert("Fue eliminada con exito");


});

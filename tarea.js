

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
      db2.ref('Grupos/'+grupo.value+ "/Alumnos/"+snapshot.key+"/Tareas/"+tareaname.value).set({
        Calificacion: "Sin calificar",
        Comentario: "Sin Comentario"

      });
    });
    alert("Fue añadida con exito");
    grupo.value="";
    tareaname.value="";
});

// Metodos para eliminar las tareas del grupo seleccionado





var refTarea= db2.ref('Grupos/'+grupoDelete.value+"/Alumnos");

console.log(grupoDelete.value);

  refTarea.on("child_added",function(snapshot){

    console.log(snapshot.val());



  });

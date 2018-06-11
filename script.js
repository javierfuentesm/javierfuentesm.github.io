var config = {
  apiKey: "AIzaSyAhfE_suTjV7EsT-gOluBtnecTeCiI6TKk",
  authDomain: "polilibro.firebaseapp.com",
  databaseURL: "https://polilibro.firebaseio.com",
  projectId: "polilibro",
  storageBucket: "polilibro.appspot.com",
  messagingSenderId: "616532161554"
};
firebase.initializeApp(config);
var db = firebase.database();

console.log("groupname");
var groupForm = document.getElementById('groupForm');

groupForm.addEventListener('submit', (e) => {



var groupname = document.getElementById('groupname').value;
var password = document.getElementById('password').value;

firebase.database().ref('Grupos/'+ groupname).set({
  contra: password,
  name: groupname
});

});


groupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!groupname.value || !password.value) return null


  db.ref('Grupos/'+ groupname).set({
    contra: password
  });

  groupname = "";
  password = "";
});


var grupos = document.getElementById('grupos');
var gruposRef = db.ref('/Grupos');

gruposRef.on('child_added', (data) => {
  var li = document.createElement('li')
  li.id = data.key;
  li.innerHTML = gruposTemplate(data.val())
  grupos.appendChild(li);
})
function gruposTemplate({name,contra}) {
  return `
  <div class='name'>${name}</div>

    <div class='contra'>${contra}</div>
  `
}
/*

class Grupo{
  var groupname2;
  var alumnos[];
  var password;

}

class Alumno{
  var idalumno;
  var tareas[];

}
class Tareas{
  var tareaname;
  var comentario;
  var calificacion;

}

var Grupo = new Grupo();

Grupo.groupname2= groupname;
Grupo.password=password;
*/

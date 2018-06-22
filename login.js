var config =
{
    apiKey: "AIzaSyAhfE_suTjV7EsT-gOluBtnecTeCiI6TKk",
    authDomain: "polilibro.firebaseapp.com",
    databaseURL: "https://polilibro.firebaseio.com",
    projectId: "polilibro",
    storageBucket: "polilibro.appspot.com",
    messagingSenderId: "616532161554"
};
firebase.initializeApp(config);
var db = firebase.database();
var btnlogin = document.getElementById("btn-login");
var username = document.getElementById("login-username");
var password = document.getElementById("login-password");
var ref = db.ref("admin/");

firebase.auth().onAuthStateChanged(function (user)
{
    if (user)
    {
        console.log("Tenemos usuario");
        // console.log(user.uid);
        var administrador;
        ref.once("value").then(function(snapshot)
        {
            if (snapshot.hasChild(user.uid))
            {
                console.log("Bienvenido eres administrador");
                location.href ="grupos.html";
            }
            else
            {
                console.log("Eres alumno no profesor no puedes acceder aqui");
                firebase.auth().signOut();
            }
        });
    }
    else
    {
        console.log("No tenemos usuario");
    }
});
btnlogin.addEventListener("click",function()
{
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(username.value, password.value).catch(function(error)
    {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
});

get('todoform').addEventListener('submit',addToDo);

function addToDo(e){
	var todoText=get('todotext').value;
	
	var todo={
		text:todoText
	}
	if(!todoText)
		return;

 	var database=firebase.database();
   	var todoRef=database.ref("tasks");
  	var todos=todoRef.child(window.currentUser.id);
  	var newTodoId=todoRef.push().key;

  	todos.child(newTodoId).set(todo);

	/*if(localStorage.getItem('todolist')===null){
		var todolist=[];
		todolist.push(todo);

		localStorage.setItem("todolist",JSON.stringify(todolist));
	}
	else{
		var todolist=JSON.parse(localStorage.getItem('todolist'));
		todolist.push(todo);
		localStorage.setItem("todolist",JSON.stringify(todolist));
	}*/
	get('todoform').reset();
	e.preventDefault();
}
function deletetodo(tid){
	var database=firebase.database();
   	var todoRef=database.ref("tasks");
  	var todos=todoRef.child(window.currentUser.id);

  	todos.child(tid).remove();
	/*var todolist=JSON.parse(localStorage.getItem('todolist'));
	for(var i=0;i<todolist.length;i++){
		if(todolist[i].text==text){
			todolist.splice(i,1);
		}
	}
	localStorage.setItem("todolist",JSON.stringify(todolist));
	fetchList();*/	
}
function fetchList(fn){
	var database=firebase.database();
  	var todosRef=database.ref("tasks");

  	todosRef.child(window.currentUser.id).on('value',function(snapshot){
    var todos=snapshot.val();

    fn(todos);
  });
	/*var todolist=JSON.parse(localStorage.getItem('todolist'));
	var listdiv=get('todolist');
	listdiv.innerHTML='';
	for(var i=0;i<todolist.length;i++){
		var text=todolist[i].text;
		listdiv.innerHTML+='<div class="well">'+'<h4>'+text+' <a onclick="deletetodo(\''+text+'\')"class="btn btn-danger"  href="#">Remove</a></h4></div>'
	}*/
}

function renderTodo(todo,tid){
	var text=todo.text;
  	var html='<div class="well">'+'<h4>'+text+' <a onclick="deletetodo(\''+tid+'\')"class="btn btn-danger"  href="#">Remove</a></h4></div>';

  	return html;
}
function get(x){
	return document.getElementById(x);
}

function signIn(){
var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {

  // The signed-in user info.
 	 var user = result.user;
  createUser(user.uid,user.displayName,user.email);
}).catch(function(error) {
    console.log(error.message);
});
}

function createUser(uid,uname,email){

  var database = firebase.database();

  var usersRef=database.ref("users");

  var user = {
    name: uname,
    email: email,
    id: uid
  };

  usersRef.child(uid).set(user).then(function(){
    window.location="list.html";
  });

}

function isLoggedIn(fn){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in
    
    window.currentUser = {
      id:user.uid,
      name:user.displayName,
      email:user.email
    };
    fn();
  } else {
    // No user is signed in.
    window.location="index.html";
  }
});
}
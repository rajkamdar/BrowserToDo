get('todoform').addEventListener('submit',addToDo);

function addToDo(e){
	var todoText=get('todotext').value;
	
	var todo={
		text:todoText
	}


	if(localStorage.getItem('todolist')===null){
		var todolist=[];
		todolist.push(todo);

		localStorage.setItem("todolist",JSON.stringify(todolist));
	}
	else{
		var todolist=JSON.parse(localStorage.getItem('todolist'));
		todolist.push(todo);
		localStorage.setItem("todolist",JSON.stringify(todolist));
	}
	get('todoform').reset();
	fetchList();
	//prevents auto-refresh
	e.preventDefault();
}
function deletetodo(text){
	var todolist=JSON.parse(localStorage.getItem('todolist'));
	for(var i=0;i<todolist.length;i++){
		if(todolist[i].text==text){
			todolist.splice(i,1);
		}
	}
	localStorage.setItem("todolist",JSON.stringify(todolist));
	fetchList();	
}
function fetchList(){
	var todolist=JSON.parse(localStorage.getItem('todolist'));
	var listdiv=get('todolist');
	listdiv.innerHTML='';
	for(var i=0;i<todolist.length;i++){
		var text=todolist[i].text;
		listdiv.innerHTML+='<div class="well">'+'<h4>'+text+' <a onclick="deletetodo(\''+text+'\')"class="btn btn-danger"  href="#">Remove</a></h4></div>'
	}
}

function get(x){
	return document.getElementById(x);
}
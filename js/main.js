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


	//prevents auto-refresh
	e.preventDefault();
}
function fetchList(){
	var todolist=JSON.parse(localStorage.getItem('todolist'));
	var listdiv=get('todolist');
	listdiv.innerHTML='';
	for(var i=0;i<todolist.length;i++){
		var text=todolist[i].text;
		console.log(text);
		listdiv.innerHTML+='<div class="well">'+'<h4>'+text+'</h4></div>'
	}
}
function get(x){
	return document.getElementById(x);
}
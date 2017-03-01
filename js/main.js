get('todoform').addEventListener('submit',addToDo);

function addToDo(e){
	var todoText=get('todotext').value;
	
	var todo={
		text:todoText
	}

	console.log(todo.text);

	localStorage.setItem('test','Hey');
	alert(localStorage.getItem('test'));
	localStorage.removeItem('test');
	alert(localStorage.getItem('test'));

	e.preventDefault();
}

function get(x){
	return document.getElementById(x);
}
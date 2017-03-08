
isLoggedIn(function(){

   fetchList(function(todos){
   	
     var todosList="";
     var i=0;
     for(var uid in todos){
       var todo=todos[uid];
         todosList+=renderTodo(todo,uid);
         i++;
     }

     get("todolist").innerHTML=todosList;

   });
});

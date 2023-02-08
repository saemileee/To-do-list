//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener("click", addTodo);

//Functions
function addTodo(event) {
  event.preventDefault();
  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  //Create Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class = "fas fa-check"> </i>';
  completedButton.classList.add("complete-btn");
  //Create Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
  trashButton.classList.add("trash-btn");
  //Append To LIST
  todoDiv.appendChild(newTodo);
  todoList.appendChild(todoDiv);
  todoDiv.appendChild(completedButton);
  todoDiv.appendChild(trashButton);
  //Clear Todo input value
  todoInput.value = "";
}

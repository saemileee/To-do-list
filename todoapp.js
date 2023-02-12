//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

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
  todoDiv.appendChild(newTodo);
  //ADD TODO TO LOCALSTORAGE
  saveLocalTodos(todoInput.value);
  //Create Check Mark Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class = "fas fa-check"> </i>';
  completedButton.classList.add("complete-btn");
  //Create Trash Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
  trashButton.classList.add("trash-btn");
  //Append To LIST
  todoList.appendChild(todoDiv);
  todoDiv.appendChild(completedButton);
  todoDiv.appendChild(trashButton);
  //Clear Todo input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //DELETE TODO
  //target은 클릭한 html 요소와 클래스 네임을 보여줌, 따라서 classList[0]은 e.target에서 클릭한 클래스 네임이 들어감
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    // //(fall하는 애니매이션을 다 보여준 뒤 div 요소를 지워야해서 추가함)
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //CHECK MARK 투두 div 자체를 completed로 만듦
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = Array.from(todoList.children);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "block";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  //CHECK---HEY Do I already have thing in there?
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

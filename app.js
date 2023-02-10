const todoInputElem = document.querySelector(".todo-input");
const todoListElem = document.querySelector(".todo-list");

const todo = {
  id: 0,
  isCompleted: false,
  content: String,
};

function init(e) {
  if (e.key == "Enter") {
    todo.content = e.target.value;
    todo.id += 1;
    todoInputElem.value = "";
    paintTodos();
  }
}

function paintTodos() {
  const todoItemElem = document.createElement("li");
  todoItemElem.classList.add("todo-item");

  const checkboxElem = document.createElement("div");
  checkboxElem.classList.add("checkbox");

  const todoElem = document.createElement("div");
  todoElem.classList.add("todo");
  todoElem.innerText = todo.content;

  const delBtnElem = document.createElement("button");
  delBtnElem.classList.add("delBtn");
  delBtnElem.innerText = "X";

  todoListElem.appendChild(todoItemElem);
  todoItemElem.appendChild(checkboxElem);
  todoItemElem.appendChild(todoElem);
  todoItemElem.appendChild(delBtnElem);
}

todoInputElem.addEventListener("keypress", init);

//배열에 할 일 리스트 저장해 놓는 것 필요
//del 누른 배열에서 해당 리스트 삭제

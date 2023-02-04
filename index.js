const todoInputElem = document.querySelector(".todo-input");
const todoListElem = document.querySelector(".todo-list");

let todos = [];
let id = 0;

const init = () => {
  todoInputElem.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      appendTodos(e.target.value);
      todoInputElem.value = "";
    }
  });
};

init();

const setTodos = (newTodos) => {
  todos = newTodos;
};

const getAllTodos = () => {
  return todos;
};

const appendTodos = (text) => {
  const newId = id++;
  const newTodos = getAllTodos().concat({
    id: newId,
    isCompleted: false,
    content: text,
  });
  setTodos(newTodos);
  paintTodos();
};

const paintTodos = () => {
  todoListElem.innerHTML = null;
  const allTodos = getAllTodos();

  allTodos.forEach((todo) => {
    const todoItemElem = document.createElement("li");
    todoItemElem.classList.add("todo-item");

    const checkboxElem = document.createElement("div");
    checkboxElem.classList.add("checkbox");

    const todoElem = document.createElement("div");
    todoElem.classList.add("todo");
    todoElem.innerText = todo.content;

    const delBtnEle = document.createElement("button");
    delBtnEle.classList.add("delBtn");
    delBtnEle.innerHTML = "X";

    if (todo.isCompleted) {
      todoItemElem.classList.add("delBtn");
      checkboxElem.innerText = "✔";
    }

    todoItemElem.appendChild(checkboxElem);
    todoItemElem.appendChild(todoElem);
    todoItemElem.appendChild(delBtnEle);

    todoListElem.appendChild(todoItemElem);
  });
};

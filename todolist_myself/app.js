const todoFormElem = document.querySelector(".todo-form");
const todoInputElem = document.querySelector(".todo-input");
// const todoListElem = document.querySelector(".todo-list");
const todoListContainerElem = document.querySelector(".list-container");

function onSubmitTodoForm(e) {
  e.preventDefault();

  const todoListElem = document.createElement("li");
  todoListElem.classList.add("todo-list");
  todoListContainerElem.appendChild(todoListElem);

  const completeBtnElem = document.createElement("button");
  completeBtnElem.classList.add("complete-btn");
  completeBtnElem.innerText = "🤔";
  todoListElem.appendChild(completeBtnElem);

  const todoContentElem = document.createElement("div");
  todoContentElem.classList.add("todo-content");
  todoContentElem.innerText = todoInputElem.value;
  todoListElem.appendChild(todoContentElem);

  const delBtnElem = document.createElement("button");
  delBtnElem.classList.add("del-btn");
  delBtnElem.innerText = "❌";
  todoListElem.appendChild(delBtnElem);

  todoInputElem.value = "";
}

todoFormElem.addEventListener("submit", onSubmitTodoForm);
//투두리스트 인풋받아서 리스트 만들기

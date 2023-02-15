const todoFormElem = document.querySelector(".todo-form");
const todoInputElem = document.querySelector(".todo-input");
const todoListContainerElem = document.querySelector(".list-container");

// class todoData {
//   constructor(number, isCompleted, content) {
//     this.number = 0;
//     this.isCompleted = false;
//     this.content = content;
//   }
// }

// let todoDB = [];

// const saveTodoData = (newTodo) => {
//   let newTodoData = new todoData(todoDB.length, false, todoInputElem.value);
//   todoDB.push(newTodoData);
// };

let todoData = {
  id: 0,
  isCompleted: false,
  content: String,
};

let todoDB = [];

const saveTodoData = (newTodo) => {
  const newID = todoData.id + 1;
  let newTodoData = {
    id: newID,
    isCompleted: false,
    content: todoInputElem.value,
  };
  todoData = newTodoData;
  todoDB.push(newTodoData);
};

const paintTodo = (newTodo) => {
  const todoListElem = document.createElement("li");
  todoListElem.classList.add("todo-list");
  todoListElem.setAttribute("data-id", todoData.id);
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

  //완료 기능
  completeBtnElem.addEventListener("click", onClickCompleteBtn);
  function onClickCompleteBtn(e) {
    const clickedTodoList = e.target.parentElement;
    const clickedTodoListID = clickedTodoList.getAttribute("data-id");
    console.log(clickedTodoList);
    if (
      todoDB.forEach((data) => {
        if (data.id == clickedTodoListID) {
          if (data.isCompleted == false) {
            data.isCompleted = true;
            completeBtnElem.innerText = "😍";
          } else {
            data.isCompleted = false;
            completeBtnElem.innerText = "🤔";
          }
        }
      })
    );
  }

  //지우기 기능
  delBtnElem.addEventListener("click", onClickDelBtn);
  function onClickDelBtn(e) {
    const clickedTodoList = e.target.parentElement;
    const clickedTodoListID = clickedTodoList.getAttribute("data-id");
    todoDB = todoDB.filter((todo) => todo.id !== Number(clickedTodoListID));
    console.log(todoDB);
    clickedTodoList.remove();
  }
};

function onSubmitTodoForm(e) {
  e.preventDefault();
  saveTodoData();
  paintTodo();
}

todoFormElem.addEventListener("submit", onSubmitTodoForm);

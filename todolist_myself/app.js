const todoFormElem = document.querySelector(".todo-form");
const todoInputElem = document.querySelector(".todo-input");
const todoListContainerElem = document.querySelector(".list-container");
const allListCount = document.querySelector(".all-count");
const completedListCount = document.querySelector(".completed-count");
const uncompletedListCount = document.querySelector(".uncompleted-count");
const completeAllBtnElem = document.querySelector(".complete-all-btn");
const allShowBtnElem = document.querySelector(".all-show-btn");
const completedShowBtnElem = document.querySelector(".completed-show-btn");
const uncompletedShowBtnElem = document.querySelector(".uncompleted-show-btn");

completedShowBtnElem.addEventListener("click", onClickCompletedShowBtn);
uncompletedShowBtnElem.addEventListener("click", onClickUncompletedShowBtn);
allShowBtnElem.addEventListener("click", onClickAllShowBtnElem);

function onClickAllShowBtnElem() {
  let todoListElems = todoListContainerElem.children;
  for (let i = 0; i < todoListElems.length; i++) {
    todoListElems[i].style.display = "block";
  }
}

function onClickCompletedShowBtn() {
  let todoListElems = todoListContainerElem.children;
  for (let i = 0; i < todoListElems.length; i++) {
    todoListElems[i].childNodes[0].innerText == "🤔"
      ? (todoListElems[i].style.display = "none")
      : (todoListElems[i].style.display = "block");
  }
}

function onClickUncompletedShowBtn() {
  let todoListElems = todoListContainerElem.children;
  for (let i = 0; i < todoListElems.length; i++) {
    todoListElems[i].childNodes[0].innerText == "😍"
      ? (todoListElems[i].style.display = "none")
      : (todoListElems[i].style.display = "block");
  }
}

let todoData = {
  id: 0,
  isCompleted: false,
  content: String,
};

let todoDB =
  localStorage.getItem("todoDB") === null
    ? (todos = [])
    : JSON.parse(localStorage.getItem("todoDB"));
const saveTodoData = (newTodo) => {
  const newID = new Date().getTime();
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
    const clickedTodoListID = Number(clickedTodoList.getAttribute("data-id"));
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

    //탭 개수
    todoTabPaint(todoDB);
    saveLocalTodoData(todoDB);
  }

  //지우기 기능
  delBtnElem.addEventListener("click", onClickDelBtn);
  function onClickDelBtn(e) {
    const clickedTodoList = e.target.parentElement;
    const clickedTodoListID = Number(clickedTodoList.getAttribute("data-id"));
    todoDB = todoDB.filter((todo) => todo.id !== clickedTodoListID);
    clickedTodoList.remove();
    todoTabPaint(todoDB);
    saveLocalTodoData(todoDB);
  }

  todoTabPaint(todoDB);

  //로컬스토리지 저장
  saveLocalTodoData(todoDB);
};

//전체완료기능
completeAllBtnElem.addEventListener("click", onCompleteAllBtnElem);
function onCompleteAllBtnElem(todoListElem) {
  let todoListElems = todoListContainerElem.children;

  const completedCount = todoDB.filter(
    (todo) => todo.isCompleted == true
  ).length;
  const uncompletedCount = todoDB.filter(
    (todo) => todo.isCompleted == false
  ).length;

  todoDB.forEach((data) => {
    if (completedCount == todoDB.length) {
      data.isCompleted = false;
      for (let i = 0; i < todoListElems.length; i++) {
        todoListElems[i].childNodes[0].innerText = "🤔";
      }
      completeAllBtnElem.innerText = "😍";
    } else if (uncompletedCount >= 0) {
      data.isCompleted = true;
      for (let i = 0; i < todoListElems.length; i++) {
        todoListElems[i].childNodes[0].innerText = "😍";
      }
      completeAllBtnElem.innerText = "🤔";
    }

    todoTabPaint(todoDB);
  });
}

function todoDBPaint(todoDB) {
  todoDB.forEach((todo) => {
    const todoListElem = document.createElement("li");
    todoListElem.classList.add("todo-list");
    todoListElem.setAttribute("data-id", todo.id);
    todoListContainerElem.appendChild(todoListElem);

    const completeBtnElem = document.createElement("button");
    completeBtnElem.classList.add("complete-btn");
    if (todo.isCompleted == false) {
      completeBtnElem.innerText = "🤔";
    } else {
      completeBtnElem.innerText = "😍";
    }
    todoListElem.appendChild(completeBtnElem);

    const todoContentElem = document.createElement("div");
    todoContentElem.classList.add("todo-content");
    todoContentElem.innerText = todo.content;
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

      //탭 개수
      todoTabPaint(todoDB);
      saveLocalTodoData(todoDB);
    }

    //지우기 기능
    delBtnElem.addEventListener("click", onClickDelBtn);
    function onClickDelBtn(e) {
      const clickedTodoList = e.target.parentElement;
      const clickedTodoListID = Number(clickedTodoList.getAttribute("data-id"));
      todoDB = todoDB.filter((todo) => todo.id !== clickedTodoListID);
      clickedTodoList.remove();
      todoTabPaint(todoDB);
      saveLocalTodoData(todoDB);
    }

    todoTabPaint(todoDB);
  });
}

function todoTabPaint() {
  if (todoDB == null) {
    allListCount.innerText = 0;
  } else {
    allListCount.innerText = todoDB.length;
  }

  const completedCount =
    todoDB == null
      ? (allListCount.innerText = 0)
      : todoDB.filter((todo) => todo.isCompleted == true).length;

  completedListCount.innerText = completedCount;

  const uncompletedCount =
    todoDB == null
      ? (allListCount.innerText = 0)
      : todoDB.filter((todo) => todo.isCompleted == false).length;
  uncompletedListCount.innerText = uncompletedCount;
}

function onSubmitTodoForm(e) {
  e.preventDefault();
  saveTodoData();
  paintTodo();
}

function saveLocalTodoData(todoDB) {
  localStorage.setItem("todoDB", JSON.stringify(todoDB));
}

function getLocalTodoData() {
  // todoDBPaint(todoDB);
  todoDB.forEach((todo) => {
    const todoListElem = document.createElement("li");
    todoListElem.classList.add("todo-list");
    todoListElem.setAttribute("data-id", todo.id);
    todoListContainerElem.appendChild(todoListElem);

    const completeBtnElem = document.createElement("button");
    completeBtnElem.classList.add("complete-btn");
    if (todo.isCompleted == false) {
      completeBtnElem.innerText = "🤔";
    } else {
      completeBtnElem.innerText = "😍";
    }
    todoListElem.appendChild(completeBtnElem);

    const todoContentElem = document.createElement("div");
    todoContentElem.classList.add("todo-content");
    todoContentElem.innerText = todo.content;
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

      //탭 개수
      todoTabPaint(todoDB);
      saveLocalTodoData(todoDB);
    }

    //지우기 기능
    delBtnElem.addEventListener("click", onClickDelBtn);
    function onClickDelBtn(e) {
      const clickedTodoList = e.target.parentElement;
      const clickedTodoListID = Number(clickedTodoList.getAttribute("data-id"));
      todoDB = todoDB.filter((todo) => todo.id !== clickedTodoListID);
      clickedTodoList.remove();
      todoTabPaint(todoDB);
      saveLocalTodoData(todoDB);
    }

    todoTabPaint(todoDB);
  });
  todoDB = JSON.parse(localStorage.getItem("todoDB"));
}

function removeLocaltodos() {}

todoFormElem.addEventListener("submit", onSubmitTodoForm);

getLocalTodoData();
todoTabPaint(todoDB);

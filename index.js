const todoInputElem = document.querySelector(".todo-input");
const todoListElem = document.querySelector(".todo-list");
const completeAllBtnElem = document.querySelector(".complete-all-btn");
const leftItemsElem = document.querySelector(".left-items");

const getActiveTodos = () => {
  return todos.filter((todo) => todo.isCompleted === false);
};

const setLeftItems = () => {
  const leftTodos = getActiveTodos();
  leftItemsElem.innerHTML = `${leftTodos.length} items left`;
};

let todos = [];
let id = 0;

const setTodos = (newTodos) => {
  todos = newTodos;
};

const getAllTodos = () => {
  return todos;
};

const getCompletedTodos = () => {
  return todos.filter((todo) => todo.isCompleted === true);
};

let isAllCompleted = "";

const setIsAllComplete = (bool) => {
  isAllCompleted = bool;
};

const completeAll = () => {
  completeAllBtnElem.classList.add("checked");
  const newTodos = getAllTodos().map((todo) => ({
    ...todo,
    isCompleted: true,
  }));
  setTodos(newTodos);
};

const incompleteAll = () => {
  completeAllBtnElem.classList.remove("checked");
  const newTodos = getAllTodos().map((todo) => ({
    ...todo,
    isCompleted: false,
  }));
  setTodos(newTodos);
};

const checkIsAllCompleted = () => {
  if (getAllTodos().length === getCompletedTodos().length) {
    setIsAllComplete(true);
    completeAllBtnElem.classList.add("checked");
  } else {
    setIsAllComplete(false);
    completeAllBtnElem.classList.remove("checked");
  }
};

const onClickCompleteAll = () => {
  if (!getAllTodos().length) return;

  if (isAllCompleted === true) incompleteAll();
  else completeAll(); //하나라도 체크되어 있다면 completeAll실행
  setIsAllComplete(!isAllCompleted); //isAllCompleted토글 (false => true)
  paintTodos();
  setLeftItems();
};

const appendTodos = (text) => {
  const newId = id++;
  const newTodos = getAllTodos().concat({
    id: newId,
    isCompleted: false,
    content: text,
  });
  setTodos(newTodos);
  checkIsAllCompleted();
  setLeftItems();
  paintTodos();
};

const deleteTodo = (todoId) => {
  const newTodos = getAllTodos().filter((todo) => todo.id !== todoId);
  setTodos(newTodos);
  setLeftItems();
  paintTodos();
};

const completeTodo = (todoId) => {
  const newTodos = getAllTodos().map((todo) =>
    todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  setTodos(newTodos);
  paintTodos();
  setLeftItems();
  checkIsAllCompleted();
};

const onDblclickTodo = (e, todoId) => {
  const todoElem = e.target;
  const inputText = e.target.innerText;
  const todoItemElem = todoElem.parentNode;
  const inputElem = document.createElement("input");
  inputElem.value = inputText;
  inputElem.classList.add("edit-input");

  inputElem.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      updateTodo(e.target.value, todoId);
      document.body.removeEventListener("click", onClickBody);
    }
  });

  const onClickBody = (e) => {
    if (e.target !== inputElem) {
      todoItemElem.removeChild(inputElem);
      document.body.removeEventListener("click", onClickBody);
    }
  };

  document.body.addEventListener("click", onClickBody);
  todoItemElem.appendChild(inputElem);
};

const updateTodo = (text, todoId) => {
  const newTodos = getAllTodos().map((todo) =>
    todo.id === todoId ? { ...todo, content: text } : todo
  );
  setTodos(newTodos);
  paintTodos();
};

const paintTodos = () => {
  todoListElem.innerHTML = "";
  const allTodos = getAllTodos();

  allTodos.forEach((todo) => {
    const todoItemElem = document.createElement("li");
    todoItemElem.classList.add("todo-item");

    const checkboxElem = document.createElement("div");
    checkboxElem.classList.add("checkbox");
    checkboxElem.addEventListener("click", () => completeTodo(todo.id));

    const todoElem = document.createElement("div");
    todoElem.classList.add("todo");
    todoElem.innerText = todo.content;
    todoElem.addEventListener("dblclick", (event) =>
      onDblclickTodo(event, todo.id)
    );

    const delBtnEle = document.createElement("button");
    delBtnEle.classList.add("delBtn");
    delBtnEle.addEventListener("click", () => deleteTodo(todo.id));
    delBtnEle.innerHTML = "X";

    if (todo.isCompleted) {
      todoItemElem.classList.add("checked");
      checkboxElem.innerText = "✔";
    }

    todoItemElem.appendChild(checkboxElem);
    todoItemElem.appendChild(todoElem);
    todoItemElem.appendChild(delBtnEle);

    todoListElem.appendChild(todoItemElem);
  });
};

const init = () => {
  todoInputElem.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      appendTodos(e.target.value);
      todoInputElem.value = "";
    }
  });

  completeAllBtnElem.addEventListener("click", onClickCompleteAll);
  setLeftItems();
};

init();

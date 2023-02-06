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

const completeTodo = (todoId) => {
  const newTodos = getAllTodos().map((todo) =>
    todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
  );
  setTodos(newTodos);
  paintTodos();
};

const deleteTodo = (todoId) => {
  const newTodos = getAllTodos().filter((todo) => todo.id !== todoId);
  setTodos(newTodos);
  paintTodos();
};

const onDblclickTodo = (e, todoId) => {
  console.log(e);
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

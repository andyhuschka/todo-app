let todos = [];
let filter = "all";

window.onload = () => {
  loadTodosFromLocalStorage();
  renderTodos();
};

document.getElementById("add-todo-btn").addEventListener("click", addTodo);

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filter = e.target.getAttribute("data-filter");
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    renderTodos();
  });
});

document
  .getElementById("remove-done-btn")
  .addEventListener("click", removeDoneTodos);

function addTodo() {
  const todoInput = document.getElementById("todo-input");
  let description = todoInput.value.trim();

  if (
    description === "" ||
    todos.some(
      (todo) => todo.description.toLowerCase() === description.toLowerCase()
    )
  ) {
    alert("Todo cannot be empty or duplicate!");
    return;
  }

  const newTodo = { id: generateId(), description: description, done: false };
  todos.push(newTodo);
  saveTodosToLocalStorage();
  renderTodos();
  todoInput.value = "";
}

function renderTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "open") return !todo.done;
    if (filter === "done") return todo.done;
  });

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", todo.done);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => toggleTodoDone(todo.id));

    const description = document.createElement("span");
    description.textContent = todo.description;

    li.appendChild(checkbox);
    li.appendChild(description);
    todoList.appendChild(li);
  });
}

function toggleTodoDone(id) {
  const todo = todos.find((todo) => todo.id === id);
  todo.done = !todo.done;
  saveTodosToLocalStorage();
  renderTodos();
}

function removeDoneTodos() {
  todos = todos.filter((todo) => !todo.done);
  saveTodosToLocalStorage();
  renderTodos();
}

function generateId() {
  return Date.now();
}

function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
}

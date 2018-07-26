//Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();
//Load all Event Listeners
function loadEventListeners() {
  //DOM LOAD
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task Event
  form.addEventListener("submit", addTask);
  //Remove Task Event
  taskList.addEventListener("click", removeTask);
  //Clear Task Event
  clearBtn.addEventListener("click", clearTask);
  //Filter
  filter.addEventListener("keyup", filterTasks);
}
//Get Tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(item) {
    const li = document.createElement("li");
    //Add Class
    li.className = "collection-item";
    //Create Text Node
    li.appendChild(document.createTextNode(item));
    //Create new link element
    const link = document.createElement("a");
    //Add a class
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
  });
}
//Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  const li = document.createElement("li");
  //Add Class
  li.className = "collection-item";
  //Create Text Node
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement("a");
  //Add a class
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);
  //Store In Local
  storeTaskInLocalStorage(taskInput.value);
  //Clear Input
  taskInput.value = "";
  //Append li to ul
  taskList.appendChild(li);

  e.preventDefault();
}
//Local
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure ?")) {
      e.target.parentElement.parentElement.remove();
    }
    //Remove from Local
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Clear Task
function clearTask(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear from Local
  clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
//Filter
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
  console.log(text);
}

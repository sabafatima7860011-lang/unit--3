const input = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const count = document.getElementById("count");

const filters = document.querySelectorAll(".filter");

let tasks = [];

let currentFilter = "all";

// Load Data
loadTasks();

// Add Button
addBtn.addEventListener("click", addTask);

// Enter Key
input.addEventListener("keypress", function(e){

if(e.key==="Enter"){

addTask();

}

});

// Filter Buttons

filters.forEach(button=>{

button.addEventListener("click",()=>{

filters.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

currentFilter=button.dataset.filter;

showTasks();

});

});

function addTask(){

const text=input.value.trim();

if(text===""){

alert("Enter Task");

return;

}

tasks.push({

text:text,

completed:false

});

input.value="";

saveTasks();

showTasks();

}

function showTasks(){

taskList.innerHTML="";

let filtered=tasks;

if(currentFilter==="active"){

filtered=tasks.filter(task=>!task.completed);

}

if(currentFilter==="completed"){

filtered=tasks.filter(task=>task.completed);

}

filtered.forEach(task=>{

const realIndex=tasks.indexOf(task);

const li=document.createElement("li");

const left=document.createElement("div");

left.className="left";

const check=document.createElement("input");

check.type="checkbox";

check.checked=task.completed;

check.addEventListener("change",()=>{

tasks[realIndex].completed=

!tasks[realIndex].completed;

saveTasks();

showTasks();

});

const span=document.createElement("span");

span.innerText=task.text;

if(task.completed){

span.classList.add("completed");

}

const del=document.createElement("button");

del.innerText="Delete";

del.className="delete";

del.addEventListener("click",()=>{

tasks.splice(realIndex,1);

saveTasks();

showTasks();

});

left.appendChild(check);

left.appendChild(span);

li.appendChild(left);

li.appendChild(del);

taskList.appendChild(li);

});

updateCount();

}

function updateCount(){

const active=tasks.filter(task=>!task.completed).length;

count.innerText=

`Remaining Tasks : ${active}`;

}

function saveTasks(){

localStorage.setItem(

"tasks",

JSON.stringify(tasks)

);

}

function loadTasks(){

const stored=

localStorage.getItem("tasks");

if(stored){

tasks=JSON.parse(stored);

}

showTasks();

}
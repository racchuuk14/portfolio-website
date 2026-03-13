let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

let input = document.getElementById("taskInput");
let text = input.value.trim();

if(text === "") return;

tasks.push({
text: text,
completed: false
});

input.value = "";

saveTasks();
displayTasks();
}

function displayTasks(filter = "all"){

let list = document.getElementById("taskList");
list.innerHTML = "";

tasks.forEach((task,index)=>{

if(filter === "active" && task.completed) return;
if(filter === "completed" && !task.completed) return;

let li = document.createElement("li");

li.innerHTML = `
<span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
${task.text}
</span>

<button onclick="deleteTask(${index})">Delete</button>
`;

list.appendChild(li);

});
}

function toggleTask(index){

tasks[index].completed = !tasks[index].completed;

saveTasks();
displayTasks();
}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();
displayTasks();
}

function filterTasks(type){

displayTasks(type);
}

displayTasks();
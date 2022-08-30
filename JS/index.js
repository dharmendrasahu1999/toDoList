// on app load , get all tasks from local storage
window.onload = loadTasks;

//on form submit add task
document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log('clicked');
    addTask();
});

//loading tasks from local storage
function loadTasks() {
    //check if local storage has any tasks
    //if not then return
    if (localStorage.getItem("tasks") == null) return;

    //get the tasks from localstorage and convert it to array
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    // console.log(tasks);

    //loop through the tasks and add them to the list
    tasks.forEach(task => {
        const list = document.querySelector('ul');
        const li = document.createElement('li');
        li.innerHTML = ` <input type="checkbox" onClick="taskComplete(this)" class="check" ${task.completed ? 'checked' : '' }>
    <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
        list.insertBefore(li, list.children[0]);
    });

}
//adding task
function addTask() {
    const task = document.querySelector('form input');
    const list = document.querySelector('ul');
    //alert popup for the empty task
    if (task.value === "") {
        alert("please add some task");
        return false;
    }
    if (document.querySelector(`input[value="${task.value}"]`)) {
        alert("Task already existed");
        return false;
    }

    //add task to local storage
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));
    //create list item , add innerHTML and append ul
    const li = document.createElement('li');
    li.innerHTML = ` <input type="checkbox" onClick="taskComplete(this)" class="check">
    <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    //insert at the end
    // list.append(li);

    //for inserting above
    list.insertBefore(li, list.children[0]);
    //clear input text value
    task.value = "";
}

//taskComplete function
function taskComplete(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task=>{
        if(task.task===event.nextElementSibling.value)
        {
            task.completed=!task.completed;
        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
    event.nextElementSibling.classList.toggle("completed");
}

//removeTask
function removeTask(event){
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task=>{
        if(task.task===event.parentNode.children[1].value)
        {
            //delete task
            tasks.splice(tasks.indexOf(task),1);
        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
    event.parentNode.remove();
    
}

//store current task to tack changes
let currentTask=null;

//get current task
function getCurrentTask(event)
{
    currentTask=event.value;
}

//edit the task and update the local storage
function editTask(event){
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    //check if task is empty
    if(event.value==="")
    {
        alert("Task is empty!");
        event.value=currentTask;
        return;
    }
   // if task already exist
    tasks.forEach(task=>{
        if(task.task===event.value)
        {
            alert("Task already exist!");
            event.value=currentTask;
            return;
        }
    });

    //update task
    tasks.forEach(task=>{
        if(task.task===currentTask)
        {
            task.task=event.value;
        }
    });

    //update local storage
    localStorage.setItem("tasks",JSON.stringify(tasks));

}
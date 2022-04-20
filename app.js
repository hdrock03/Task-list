// Define UI Variables

const form =document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all even listeners
loadEventListeners();

// Load all even listeners
function loadEventListeners() {

    //Add task Event
    form.addEventListener('submit' , addTask)

    // Remove task Event
    taskList.addEventListener('click', removeTask);

    //Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter tasks event
    filter.addEventListener('keyup', filterTasks)

    //DOM Load event
    document.addEventListener('DOMContentLoaded' , getTasks)
    
}

//Get Tasks from Local Storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks= [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create li element
    const li = document.createElement('li')// isko yaha banaye hai qki ul ke under list item jayega na dynamically
    //Add Class
    li.className = 'collection-item' ;
    //Create Text Node and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML= '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
    })
}

// Add Task
function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a Task');
        
    }

    //create li element
    const li = document.createElement('li')// isko yaha banaye hai qki ul ke under list item jayega na dynamically
    //Add Class
    li.className = 'collection-item' ;
    //Create Text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add Class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML= '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInputvalue= '';
    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
    // console.log('1')
    let tasks;
    //yaha check kar raha hai ki local storage me task hai ya nhi if nhi to array bna dega 
    if(localStorage.getItem('tasks') === null){
        tasks= [];
    }
    // agar local staorage me kuch hga to taks me save ho jayega but local storage me string ke form me save hota h to json.parse use kie h taki object ban jaye
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);// jobhi taks dale wo sara array ke form me tasks me jaye

    localStorage.setItem('tasks',JSON.stringify(tasks));// yaha pe local stroge me save kr rhe h since local stoprage string le rha isilye object to stringyfy se string me change kr rhe h
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

        // Remove tasks from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

}

//Remove from Localstorage
function removeTaskFromLocalStorage(taskItem){
    //checking local storage
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks= [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        if(taskItem.textContent === task)
        tasks.splice(index, 1);
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e){
    //slower way
    // taskList.innerHTML='';

    // Faster way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }

    // clear from local storage
    clearTasksFromLocalStorage();
    
}

// clear tasks from localstorage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


// Filter Tasks
function filterTasks(e){
    const text= e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item= task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}


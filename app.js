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
    form.addEventListener('submit' , addTask)
    
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
    link.innerHTML= '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //clear input
    taskInputvalue= '';
    e.preventDefault();
}
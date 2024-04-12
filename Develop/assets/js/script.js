// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const task = $('.task')
const dueDate = $('.dueDate')
const description = $('.description')


// Todo: create a function to generate a unique task id
function generateTaskId() {

}



// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $('<div>')
    .addClass('card draggable m-3');
    const cardHeader = $('<div>').addClass('cardHeader h4').text(task);
    const cardBody = $('<div>').addClass('cardBody');
    const cardDate = $('<p>').addClass('cardDate').text(dueDate);
    const cardDesc = $('<p>').addClass('cardDesc').text(description);
    const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-project-id', project.id);
  cardDeleteBtn.on('click', handleDeleteTask);    
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  event.preventDefault();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

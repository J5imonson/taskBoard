// Retrieve tasks and nextId from localStorage
const taskInput = $('.task');
const dueDateInput = $('.dueDate');
const descriptionInput = $('.description');
const taskFormEl = $('formModal');


// Todo: create a function to generate a unique task id
function generateTaskId() {
  const id = (() => {
    let i = 0;
    return () => {
      return i++;
    }
  })();
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = $('<div>')
    .addClass('card draggable m-3')
    .attr('data-task-id', task.id);
  const cardHeader = $('<div>').addClass('cardHeader h4').text(task);
  const cardBody = $('<div>').addClass('cardBody');
  const cardDate = $('<p>').addClass('cardDate').text(dueDate);
  const cardDesc = $('<p>').addClass('cardDesc').text(description);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
  cardDeleteBtn.on('click', handleDeleteTask);

  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  cardBody.append(cardDesc, cardDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable

// ? Grab references to the important DOM elements.
function readTaskFromStorage() {
  let string = localStorage.getItem("tasks");
  let taskList = JSON.parse(string) || [];
  return taskList;
}

function saveTaskToStorage(taskList) {
  let string = JSON.stringify(taskList);
  localStorage.setItem("tasks", string);
}

function renderTaskList() {
  let taskList = readTaskFromStorage("tasks");
  for (let task of taskList) {
    if (task.status === 'to-do') {
      todoList.append(createtasksCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createtasksCard(task));
    } else if (task.status === 'done') {
      doneList.append(createtasksCard(task));
    }
  }

  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}


// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
const taskName = taskInput.val().trim();
const dueDate = dueDateInput.val();
const description = descriptionInput.val();
const newTask = {
  task: taskName,
  dueDate: dueDate,
  description: description,
  status: "to-do",
};

const tasks = readTaskFromStorage();
tasks.push(newTask);
saveTaskToStorage(tasks);
renderTaskList();
};

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  const taskId = $(this).attr('data-taskid');
  const tasks = readTaskFromStorage();

  tasks.forEach((task) => {
    if (task.id === taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  saveTaskToStorage(tasks);
  renderTaskList();
};

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const tasks = readTaskFromStorage();
  const taskId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;

  for(let task of tasks) {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker

taskFormEl.on('click', '.btn-save', handleAddTask);

$(document).ready(function () {
  renderTaskList();

  $('.dueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
 
});

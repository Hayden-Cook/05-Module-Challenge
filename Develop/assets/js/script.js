// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const taskId = nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return taskId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>').addClass("card draggable");
    const taskCardBody = $('<div>').addClass("taskcard-body");
    const taskCardTitle = $('<h4').addClass("taskcard-title").text(task.title);
    const taskCardContent = $('<p>').addClass("taskcard-content").text(task.content);
    const taskCardDueDate = $('<p>').addClass("taskcard-duedate").text("Task Due: " + task.dueDate);
    const deleteBtn = $("<button>").addClass("btn btn-danger btn-small").text("Delete");
    deleteBtn.click(handleDeleteTask);

    if (task.status && task.dueDate !== "done") {
        let currentDay = dayjs();
        let taskDueDate = dayjs(task.dueDate, "MM-DD-YYYY");

        if (taskDueDate.isBefore(currentDay, "day")) {
            taskCard.addClass("bg-danger text-white");
        } else if (taskDueDate.isSame(currentDay, "day")) {
            taskCard.addClass("bg-warning text-white");
        } else if (taskDueDate.isAfter(currentDay, "day")) {
            taskCard.addClass("bg-light text-dark");
        }
    }
    taskCardBody.append(taskCardTitle, taskCardContent, taskCardDueDate, deleteBtn);
    taskCard.append(taskCardBody);
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    // This should clear any cards on the page before rendering the new list.
    $("#done-cards").empty();
    $("#in-progress-cards").empty();
    $("#done-cards").empty();

    taskList.forEach(task => {
        const card = createTaskCard(task);
        //this will run through each task and apply the status before "-cards" and will then append it to the correct container.
        $(`#${task.status}-cards`).append(card);
    });
    // this will make the cards draggable
    $(".draggable").draggable({
        zIndex: 100,
    })
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const taskTitle = $("#taskTitle").val().trim();
    const taskDueDate = $("#taskDueDate").val().trim();
    const taskDescription = $("#taskDescription").val().trim();

    if (!taskDescription || !taskDueDate || !taskTitle) {
        alert("Please complete all fields to continue.");
        return;
    }
    const newTaskCard = {
        id: generateTaskId(),
        taskTitle,
        taskDueDate,
        taskDescription,
        status: "to-do"
    };

    taskList.push(newTaskCard);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    // this will clear the contents and hide the modal box
    $("#taskTitle").val("");
    $("#taskDueDate").val("");
    $("#taskDescription").val("");
    $("#formModal").modal("hide");

    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

const apiUrl = "http://localhost:3000/tasks";

// fetchTasks function to fetch tasks from the API
function fetchTasks() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      return response.json();
    })
    .then((tasks) => displayTasks(tasks))
    .catch((error) => console.error("Error fetching tasks:", error));
}

// addTask function to add a new task
function addTask() {
  const inputBox = document.getElementById("input-box");
  const taskText = inputBox.value.trim();
  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskText, completed: false }),
  })
    .then((response) => response.json())
    .then((task) => {
      console.log("Task added:", task);
      inputBox.value = ""; // Clear input box after adding
      fetchTasks(); // Refresh the list of tasks
      displayTasks();
    })
    .catch((error) => console.error("Error adding task:", error));
}

// updateTaskTitle function to update a task title
function updateTaskTitle(id, taskText, completed) {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: taskText, completed: completed }),
  })
    .then((response) => response.json())
    .then(() => fetchTasks()) // Refresh the list of tasks
    .catch((error) => console.error("Error updating task:", error));
}

// updateTask function to update a task completion status
function updateTask(id, completed) {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  })
    .then((response) => response.json())
    .then(() => fetchTasks()) // Refresh the list of tasks
    .catch((error) => console.error("Error updating task:", error));
}

// deleteTask function to delete a task
function deleteTask(id) {
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  })
    .then(() => fetchTasks()) // Refresh the list of tasks
    .catch((error) => console.error("Error deleting task:", error));
}

// displayTasks function to render tasks in the DOM
function displayTasks(tasks) {
  // Get the list container element
  const listContainer = document.getElementById("list-container");
  listContainer.innerHTML = ""; // Clear existing tasks
  if (tasks) {
    tasks.forEach((task) => {
      const taskElement = document.createElement("li");

      taskElement.onclick = () => updateTask(task.id, !task.completed); // Toggle completion on click
      if (task.completed) {
        taskElement.classList.add("checked");
      }

      const taskText = document.createElement("span");
      taskText.textContent = task.title;
      taskText.classList.add("task-text"); // Add a class to the text content
      taskElement.appendChild(taskText);
      // edit button
      const editButton = document.createElement("button");
      editButton.classList.add("edit-button");
      editButton.onclick = (event) => {
        // updating task
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const input = document.createElement("input");
        input.classList.add("edit-input");
        input.setAttribute("type", "text");

        const saveButton = document.createElement("button");
        saveButton.classList.add("save-button");
        saveButton.textContent = "Update";
        saveButton.onclick = () => {
          const newTaskName = input.value.trim();
          if (newTaskName) {
            updateTaskTitle(task.id, newTaskName, task.completed);
            modal.remove(); // Close the modal after saving
          } else {
            alert("Please enter a new task name.");
          }
        };
        modal.appendChild(input);
        modal.appendChild(saveButton);
        document.body.appendChild(modal);
      };
      taskElement.appendChild(editButton);
      // delete button for each task
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = (event) => {
        event.stopPropagation(); // Prevent toggling the task completion
        deleteTask(task.id);
      };
      taskElement.appendChild(deleteButton);
      listContainer.appendChild(taskElement);
    });
  } else {
    console.error("No tasks to display");
  }
}

// Initial fetch of tasks when the page loads
document.addEventListener("DOMContentLoaded", fetchTasks);

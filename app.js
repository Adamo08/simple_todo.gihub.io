document.addEventListener("DOMContentLoaded", function () {

    // Define global variables for task counts
    let totalTasks = 0; 
    let completedTasks = 0;
    let canceledTasks = 0;

    // Add new task button event listener
    document.querySelector(".add-task").addEventListener("click", function () {
        const taskName = prompt("Enter the task name:");
        const teamMember = prompt("Enter the team member's name:");
        const priority = prompt("Enter priority (High, Middle, Low):");

        if (taskName && teamMember && priority) {
            addTask(teamMember, taskName, priority);
        }
    });

    // Add task to the table
    function addTask(member, task, priority) {
        const taskTable = document.querySelector(".tasklist-table tbody");
        const newRow = document.createElement("tr");
        newRow.classList.add("fw-normal", "tasklist-row");

        // Define priority badge based on input
        let priorityBadge = "high-priority";
        if (priority.toLowerCase() === "low") {
            priorityBadge = "low-priority";
        } else if (priority.toLowerCase() === "middle") {
            priorityBadge = "middle-priority";
        }

        // Add new task row
        newRow.innerHTML = `
            <th><span class="ms-2 tasklist-member">${member}</span></th>
            <td class="align-middle"><span class="tasklist-task">${task}</span></td>
            <td class="align-middle"><h6 class="mb-0"><span class="badge ${priorityBadge}">${priority.charAt(0).toUpperCase() + priority.slice(1)} priority</span></h6></td>
            <td class="align-middle tasklist-actions">
                <a data-mdb-tooltip-init title="Done" class="mark-done">
                    <i class="fas fa-check fa-lg text-success me-3"></i>
                </a>
                <a data-mdb-tooltip-init title="Remove" class="remove-task">
                    <i class="fas fa-trash-alt fa-lg text-danger me-3"></i>
                </a>
                <a data-mdb-tooltip-init title="Update" class="update-task">
                    <i class="fas fa-edit fa-lg text-primary"></i>
                </a>
            </td>
        `;

        taskTable.appendChild(newRow);
        totalTasks++;
        updateTaskCount();

        // Add event listeners to the new row for interactions
        newRow.querySelector(".mark-done").addEventListener("click", markTaskDone);
        newRow.querySelector(".remove-task").addEventListener("click", removeTask);
        newRow.querySelector(".update-task").addEventListener("click", updateTask);
    }

    // Mark task as completed
    function markTaskDone(e) {
        const row = e.target.closest("tr");

        // Check if the task is already marked as completed
        if (!row.classList.contains("completed")) {
            // Mark the task as completed
            row.style.textDecoration = "line-through";
            row.style.color = "gray";

            // Add the class to indicate completion
            row.classList.add("completed");

            // Increment completed tasks count
            completedTasks++;
        } else {
            // Unmark the task as completed
            row.style.textDecoration = "none";
            row.style.color = "black"; // Reset color to default or original

            // Remove the 'completed' class
            row.classList.remove("completed");

            // Decrement completed tasks count
            completedTasks--;
        }

        // Update the task count display
        updateTaskCount();
    }


    // Remove a task
    function removeTask(e) {
        const row = e.target.closest("tr");
        row.remove();
        totalTasks--;
        canceledTasks++;
        updateTaskCount();
    }

    // Update a task
    function updateTask(e) {
        const row = e.target.closest("tr");
        const newTask = prompt("Update the task:", row.querySelector(".tasklist-task").textContent);
        const newMember = prompt("Update the team member:", row.querySelector(".tasklist-member").textContent);

        if (newTask && newMember) {
            row.querySelector(".tasklist-task").textContent = newTask;
            row.querySelector(".tasklist-member").textContent = newMember;
        }
    }

    // Update the task info badges for total, completed, and canceled tasks
    function updateTaskCount() {
        document.querySelector(".task-info-badge.total").textContent = totalTasks;
        document.querySelector(".task-info-badge.completed").textContent = completedTasks;
        document.querySelector(".task-info-badge.canceled").textContent = canceledTasks;
    }

    // Initial setup: add event listeners to the existing task actions
    document.querySelectorAll(".mark-done").forEach(btn => btn.addEventListener("click", markTaskDone));
    document.querySelectorAll(".remove-task").forEach(btn => btn.addEventListener("click", removeTask));
    document.querySelectorAll(".update-task").forEach(btn => btn.addEventListener("click", updateTask));
});

document.addEventListener("DOMContentLoaded", function () {

    // Define global variables for task counts
    let totalTasks = 0;
    let completedTasks = 0;
    let canceledTasks = 0;

    // Add new task button event listener
    document.querySelector(".add-task").addEventListener("click", function () {
        const taskName = prompt("Enter the task name:");
        const teamMember = prompt("Enter the team member's name:");

         // Define a list of valid priorities
        const validPriorities = ["high", "middle", "low"];
        
        // Initialize the priority variable
        let priority = prompt("Enter priority (High, Middle, Low):").toLowerCase();

        // Check for valid input, and prompt the user until they enter a correct value
        while (!validPriorities.includes(priority)) {
            alert("Invalid priority. Please enter 'High', 'Middle', or 'Low'.");
            priority = prompt("Enter priority (High, Middle, Low):").toLowerCase();
        }

        if (taskName && teamMember && priority) {
            addTask(teamMember, taskName, priority);

            // Show success alert when task is added
            Swal.fire({
                icon: 'success',
                title: 'Task added!',
                text: `The task "${taskName}" has been added successfully.`,
                showConfirmButton: false,
                timer: 2000
            });
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

            // Show success alert when task is marked as done
            Swal.fire({
                icon: 'success',
                title: 'Task Completed!',
                text: 'This task has been marked as completed.',
                showConfirmButton: false,
                timer: 2000
            });

        } else {
            // Unmark the task as completed
            row.style.textDecoration = "none";
            row.style.color = "black"; // Reset color to default or original

            // Remove the 'completed' class
            row.classList.remove("completed");

            // Decrement completed tasks count
            completedTasks--;

            // Show alert when completion is undone
            Swal.fire({
                icon: 'warning',
                title: 'Task Unmarked!',
                text: 'This task has been unmarked as completed.',
                showConfirmButton: false,
                timer: 2000
            });
        }

        // Update the task count display
        updateTaskCount();
    }

    // Remove a task
    function removeTask(e) {
        const row = e.target.closest("tr");

        // Check if the task is marked as completed before removing
        if (row.classList.contains("completed")) {
            completedTasks--;  // Decrement completed tasks count if the task is completed
        }

        // Confirm task removal with SweetAlert
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                row.remove();
                totalTasks--;
                canceledTasks++;
                updateTaskCount();

                // Show success alert when task is removed
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The task has been removed.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    }


    // Update a task
    function updateTask(e) {
        const row = e.target.closest("tr");
        const newTask = prompt("Update the task:", row.querySelector(".tasklist-task").textContent);
        const newMember = prompt("Update the team member:", row.querySelector(".tasklist-member").textContent);

        if (newTask && newMember) {
            row.querySelector(".tasklist-task").textContent = newTask;
            row.querySelector(".tasklist-member").textContent = newMember;

            // Show success alert when task is updated
            Swal.fire({
                icon: 'info',
                title: 'Task Updated!',
                text: 'The task details have been updated.',
                showConfirmButton: false,
                timer: 2000
            });
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

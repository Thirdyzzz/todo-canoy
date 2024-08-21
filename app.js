window.onload = () => {
    const form1 = document.querySelector("#addForm");

    let items = document.getElementById("items");
    let submit = document.getElementById("submit");

    let editItem = null;

    form1.addEventListener("submit", addItem);
    items.addEventListener("click", handleItemActions);
};

function addItem(e) {
    e.preventDefault();

    if (submit.value !== "Submit") {
        editItem.target.parentNode.childNodes[0].data = document.getElementById("item").value;

        submit.value = "Submit";
        document.getElementById("item").value = "";

        showAlert("Task updated successfully", "success");

        return false;
    }

    let newItem = document.getElementById("item").value.trim();
    if (!newItem) return false;

    document.getElementById("item").value = "";

    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    let taskText = document.createTextNode(newItem);

    let buttonGroup = document.createElement("div");

    let editButton = document.createElement("button");
    editButton.className = "btn btn-warning btn-sm mr-2 edit";
    editButton.appendChild(document.createTextNode("Edit"));

    let deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm delete";
    deleteButton.appendChild(document.createTextNode("Delete"));

    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);

    li.appendChild(taskText);
    li.appendChild(buttonGroup);

    items.appendChild(li);

    showAlert("Task added successfully", "success");
}

function handleItemActions(e) {
    e.preventDefault();

    if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure you want to delete this task?")) {
            let li = e.target.closest("li");
            items.removeChild(li);
            showAlert("Task deleted successfully", "success");
        }
    } else if (e.target.classList.contains("edit")) {
        document.getElementById("item").value = e.target.closest("li").childNodes[0].data;
        submit.value = "EDIT";
        editItem = e;
    }
}

function showAlert(message, className) {
    const alertDiv = document.getElementById("lblsuccess");
    alertDiv.className = `alert alert-${className}`;
    alertDiv.innerHTML = message;
    alertDiv.style.display = "block";

    setTimeout(() => {
        alertDiv.style.display = "none";
    }, 3000);
}

function toggleButton(ref, btnID) {
    const button = document.getElementById(btnID);
    button.disabled = ref.value.trim() === "";
}


// Function to create a new task item with delete, edit, check, and sign buttons
function createTaskItem(taskValue) {
    const newItem = document.createElement('li');
    newItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    newItem.innerHTML = `
        <span>${taskValue}</span>
        <div>
            <button class="btn btn-success btn-sm mr-2 check-btn">Check</button>
            <button class="btn btn-info btn-sm mr-2 sign-btn">Sign</button>
            <button class="btn btn-warning btn-sm mr-2 edit-btn">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </div>
    `;
    return newItem;
}

// Attach event listeners to all buttons, including check and sign
function attachItemButtons(item) {
    const checkButton = item.querySelector('.check-btn');
    const signButton = item.querySelector('.sign-btn');
    const editButton = item.querySelector('.edit-btn');
    const deleteButton = item.querySelector('.delete-btn');

    // Check button functionality
    checkButton.addEventListener('click', function() {
        const taskText = item.querySelector('span');
        taskText.style.textDecoration = taskText.style.textDecoration === 'line-through' ? '' : 'line-through';
        Swal.fire('Checked!', 'Your task has been marked as complete.', 'success');
    });

    // Sign button functionality
    signButton.addEventListener('click', function() {
        Swal.fire({
            title: 'Sign Task',
            input: 'text',
            inputLabel: 'Enter your name or signature',
            showCancelButton: true,
            confirmButtonText: 'Sign',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed && result.value.trim() !== '') {
                item.querySelector('span').textContent += ` - Signed by: ${result.value}`;
                Swal.fire('Signed!', 'The task has been signed.', 'success');
            }
        });
    });

    // Edit button functionality
    editButton.addEventListener('click', function() {
        const taskText = item.querySelector('span').textContent;
        Swal.fire({
            title: 'Edit Task',
            input: 'text',
            inputValue: taskText,
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed && result.value.trim() !== '') {
                item.querySelector('span').textContent = result.value;
                Swal.fire('Saved!', 'Your task has been updated.', 'success');
            }
        });
    });

    // Delete button functionality
    deleteButton.addEventListener('click', function() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                item.remove();
                Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
            }
        });
    });
}

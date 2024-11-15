
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const resetButton = document.getElementById('resetButton');
    const errorMessage = document.getElementById('errorMessage');
    const todoList = document.getElementById('todoList');
    const completedList = document.getElementById('completedList');

    const clearError = () => errorMessage.textContent = '';

    const createTaskElement = (taskText) => {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;
        li.appendChild(textSpan);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
            const isEditing = editButton.textContent === 'Save';
            textSpan.contentEditable = !isEditing;
            editButton.textContent = isEditing ? 'Edit' : 'Save';
            if (isEditing && textSpan.textContent.trim() === '') {
                errorMessage.textContent = 'Task cannot be empty.';
                textSpan.contentEditable = true;
                return;
            }
            clearError();
        };

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = () => {
            completedList.appendChild(li);
            li.removeChild(completeButton);
            clearError();
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => li.remove();

        li.appendChild(editButton);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        return li;
    };

    addTaskButton.onclick = () => {
        clearError();
        const taskText = taskInput.value.trim();
        if (!taskText) {
            errorMessage.textContent = 'Task cannot be empty.';
            return;
        }
        todoList.appendChild(createTaskElement(taskText));
        taskInput.value = '';
    };

    resetButton.onclick = () => {
        todoList.innerHTML = '';
        completedList.innerHTML = '';
        clearError();
    };
});

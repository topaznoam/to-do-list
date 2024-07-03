var alltasks = [];

class SubLine {
    constructor(name, checkbox) {
        this.name = name;
        this.checkbox = checkbox;
    }
}

class Line {
    constructor(name, checkbox, subtasks) {
        this.name = name;
        this.checkbox = checkbox;
        this.subtasks = subtasks;
    }
}
function updatesubtask(task){
    for(let i =0; i < alltasks[task].subtasks.length; i ++){
        alltasks[task].subtasks[i].checkbox = alltasks[task].checkbox;
    }
}
function subtaskcheck(task){
    for(let i =0; i < alltasks[task].subtasks.length; i ++){
        if(!(alltasks[task].subtasks[i].checkbox)){
            return false;
        }
    }
    return true;
}

function printlist() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    for (let i = 0; i < alltasks.length; i++) {
        const taskContainer = document.createElement('li');
        const newtask = document.createElement('h2');
        newtask.textContent = alltasks[i].name;
        const newbox = document.createElement('input');
        newbox.type = "checkbox";
        newbox.checked = alltasks[i].checkbox;
        newbox.addEventListener('change', () => {
            alltasks[i].checkbox = newbox.checked;
            if(alltasks[i].subtasks.length > 0){
                updatesubtask(i);
                printlist();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            alltasks.splice(i, 1);
            printlist();
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const newName = prompt('Edit task name:', alltasks[i].name);
            if (newName != "") {
                alltasks[i].name = newName;
                printlist();
            }
        });


        const addsubtask = document.createElement('button');
        addsubtask.textContent = 'Add sub-task';
        addsubtask.addEventListener('click', () => {
            const newsubtask = prompt('Enter new sub-task for ' + alltasks[i].name);
            if (newsubtask != "") {
                const newsubline = new SubLine(newsubtask, false);
                alltasks[i].subtasks.push(newsubline);
                printlist();
            }
        });

        const subtasksdiv = document.createElement('dl');
        for (let j = 0; j < alltasks[i].subtasks.length; j++) {
            const newsubtask = document.createElement('h3');
            newsubtask.textContent = alltasks[i].subtasks[j].name;
            const subtaskBox = document.createElement('input');
            subtaskBox.type = "checkbox";
            subtaskBox.checked = alltasks[i].subtasks[j].checkbox;
            subtaskBox.addEventListener('change', () => {
                alltasks[i].subtasks[j].checkbox = subtaskBox.checked;
                alltasks[i].checkbox = subtaskcheck(i);
                printlist();
            });

            const subtaskDeleteButton = document.createElement('button');
            subtaskDeleteButton.textContent = 'Delete';
            subtaskDeleteButton.addEventListener('click', () => {
                alltasks[i].subtasks.splice(j, 1);
                printlist();
            });

            const subtaskEditButton = document.createElement('button');
            subtaskEditButton.textContent = 'Edit';
            subtaskEditButton.addEventListener('click', () => {
                const newName = prompt('Edit sub-task name:', alltasks[i].subtasks[j].name);
                if (newName != "") {
                    alltasks[i].subtasks[j].name = newName;
                    printlist();
                }
            });
            const stylediv = document.createElement('div');
            stylediv.appendChild(subtaskBox);
            stylediv.appendChild(newsubtask);
            stylediv.appendChild(subtaskEditButton);
            stylediv.appendChild(subtaskDeleteButton);
            subtasksdiv.appendChild(stylediv);
        }

        taskContainer.appendChild(newbox);
        taskContainer.appendChild(newtask);
        taskContainer.appendChild(editButton);
        taskContainer.appendChild(deleteButton);
        taskContainer.appendChild(addsubtask);
        taskContainer.appendChild(subtasksdiv);
        taskList.appendChild(taskContainer);
    }
    localStorage.setItem('alltasks', JSON.stringify(alltasks));
}

function addline() {
    let newlistname = document.getElementById('newtaskname');
    if (newlistname.value != "") {
        const newline = new Line(newlistname.value, false, []);
        alltasks.push(newline);
        newlistname.value = '';
        printlist();
    }
}

function loadTasks() {
    const storedTasks = localStorage.getItem('alltasks');
    if (storedTasks) {
        alltasks = JSON.parse(storedTasks);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    printlist();
});


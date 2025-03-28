const taskBlock = document.querySelector(".tasks");
const clearBlock = document.querySelector(".clear");
const taskInput = document.querySelector("#task-input");
const addBtn = document.querySelector("#add-btn");
const key = "todoItems";
const clearBtn = document.createElement("button");
clearBtn.classList.add("btn");
clearBtn.style.display = "none";
clearBtn.innerText = "Clear";
let tasksArray = [];

function getTasksArray(){
    return JSON.parse(localStorage.getItem(key)) || [];
}

function displayList(){
    taskBlock.innerHTML = "";
    items = getTasksArray();
    if(items != null){

        if(!clearBlock.contains(clearBtn)){
            clearBlock.appendChild(clearBtn);
        }
        
        for(item of items){
            const chkBox = document.createElement("input");
            chkBox.classList.add("chkBox");
            chkBox.setAttribute("type","checkbox");
            const task = document.createElement("span");
            task.style.cursor = "pointer";
            const listItem = document.createElement("div");
            listItem.classList.add("task-item");
            const xmark = document.createElement("i");
            xmark.classList.add("fa-solid","fa-xmark");
            

            const removeBtn = document.createElement("span");
            removeBtn.appendChild(xmark);

            removeBtn.addEventListener("click",()=>{
                deleteItem(removeBtn);
                displayList();
            });

            task.addEventListener('click',(e)=>{
                updateArray(e.target);
                console.log(e.target.innerText);
                displayList();
            });

            task.innerText = item.task;
            if(item.completed){
                toggleTaskCompletion(chkBox,task);
            }
            task.prepend(chkBox);
            listItem.appendChild(task);
            listItem.appendChild(removeBtn);
            taskBlock.appendChild(listItem);
        }
    }

}

window.onload = ()=>{
    if(getTasksArray().length!=0){
        tasksArray = getTasksArray();
        taskBlock.style.backgroundColor = "#FDFCFA";
        clearBtn.style.display = "block";
        displayList();
        return;
    }
};

function updateArray(task){

    //check if user clicked checkbox instead of task
    if(task.innerText == ""){ 
        task = task.parentNode;
    }
    tasksArray = getTasksArray();
    for(item of tasksArray){
        if(item.task == task.innerText){
            item.completed = !item.completed;
        }
    }
    localStorage.setItem(key,JSON.stringify(tasksArray));
}

function deleteItem(removeBtn){
    let tasksArray = getTasksArray();
    const itemToDelete = removeBtn.parentNode.childNodes[0].innerText; //this is the todo-task
    tasksArray = tasksArray.filter((task)=>{
        return task.task != itemToDelete;
    });
    localStorage.setItem(key,JSON.stringify(tasksArray));
    if(getTasksArray().length == 0){
        taskBlock.style.background = "transparent";
        clearBtn.style.display = "none";
    }
}

addBtn.addEventListener('click',()=>{
    let task = taskInput.value.trim();
    tasksArray = getTasksArray();
    if(task === ""){
        alert("Please Enter Task!");
        return;
    }
    else{
        console.log(tasksArray);
        for(let item of tasksArray){
            if(item.task == task){
                console.log("not ok");
                alert("Task Already Added!");
                return;
            }
        }
    }


    tasksArray.push({"task":task,"completed":false});//1
    let todoItem = JSON.stringify(tasksArray);
    localStorage.setItem(key,todoItem);
    taskBlock.style.backgroundColor = "#FDFCFA";
    clearBtn.style.display = "block";
    displayList();

});

clearBtn.addEventListener("click",()=>{
    localStorage.clear();
    tasksArray = [];
    taskBlock.style.background = "transparent";
    clearBtn.style.display = "none";
    displayList();
});

function toggleTaskCompletion(chkBox,task){
    chkBox.checked = !chkBox.checked;
    task.classList.toggle("task-completion");
}
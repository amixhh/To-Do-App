const inputBox = document.getElementById("task");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something nigger!!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        document.getElementById("list").appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

document.getElementById("list").addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

// Edit task on double-click
document.getElementById("list").addEventListener("dblclick", (e) => {
    if (e.target.tagName === "LI") {
        let currentText = e.target.childNodes[0].nodeValue.trim(); 
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        e.target.innerHTML = ""; 
        e.target.appendChild(input);

        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                saveEditedTask(e.target, input.value);
            }
        });

        input.addEventListener("blur", () => {
            saveEditedTask(e.target, input.value);
        });

        input.focus();
    }
});

function saveEditedTask(li, newValue) {
    li.innerHTML = newValue;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; 
    li.appendChild(span);
    saveData();
}

function saveData() {
    localStorage.setItem("data", document.getElementById("list").innerHTML);
}

function showData() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        document.getElementById("list").innerHTML = savedData;
    }
}

showData();
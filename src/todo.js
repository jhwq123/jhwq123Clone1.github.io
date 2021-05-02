const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoPending = document.querySelector(".js-toDoPending"),
    toDoFinished = document.querySelector(".js-toDoFinished");

const PENDING_LS = 'PENDING',
    FINISHED_LS = 'FINISHED';

let PENDING = [],
    FINISHED = [];

function deletePending(event)
{
    const btn = event.target;
    const ul = btn.parentNode;
    toDoPending.removeChild(ul);
    const cleanPending = PENDING.filter(function(toDo){
        return toDo.id !== parseInt(ul.id);
    })
    PENDING = cleanPending;
    saveToDos();
}

function deleteFinished(event)
{
    const btn = event.target;
    const ul = btn.parentNode;
    toDoFinished.removeChild(ul);
    const cleanFinished = FINISHED.filter(function(toDo){
        return toDo.id !== parseInt(ul.id);
    })
    FINISHED = cleanFinished;
    saveToDos();
}

function exchangePending(event)
{
    const btn = event.target;
    const ul = btn.parentNode;
    toDoPending.removeChild(ul);
    const copyPending = PENDING.filter(function (toDo){
        return toDo.id === parseInt(ul.id);
    })
    const cleanPending = PENDING.filter(function(toDo){
        return toDo.id !== parseInt(ul.id);
    })
    PENDING = cleanPending;
    paintFinished(copyPending[0].text,copyPending[0].id);
}

function exchangeFinished(event)
{
    const btn = event.target;
    const ul = btn.parentNode;
    toDoFinished.removeChild(ul);
    const copyFinished = FINISHED.filter(function (toDo){
        return toDo.id === parseInt(ul.id);
    })
    const cleanFinished = FINISHED.filter(function(toDo){
        return toDo.id !== parseInt(ul.id);
    })
    FINISHED = cleanFinished;
    paintPending(copyFinished[0].text, copyFinished[0].id);
}

function saveToDos()
{
    localStorage.setItem(PENDING_LS, JSON.stringify(PENDING));
    localStorage.setItem(FINISHED_LS, JSON.stringify(FINISHED));
}

function paintPending(text, id)
{
    const ul = document.createElement("ul");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const exchangeBtn = document.createElement("button");
    span.innerText = text;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deletePending);
    exchangeBtn.innerText = "✅";
    exchangeBtn.addEventListener("click", exchangePending);
    ul.appendChild(span);
    ul.appendChild(delBtn);
    ul.appendChild(exchangeBtn);
    ul.id = id;
    toDoPending.appendChild(ul);
    const toDoObj = {
        id: id,
        text: text
    }
    PENDING.push(toDoObj);
    saveToDos();
}

function paintFinished(text, id)
{
    const ul = document.createElement("ul");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const exchangeBtn = document.createElement("button");
    span.innerText = text;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteFinished);
    exchangeBtn.innerText = "⏪";
    exchangeBtn.addEventListener("click", exchangeFinished);
    ul.appendChild(span);
    ul.appendChild(delBtn);
    ul.appendChild(exchangeBtn);
    ul.id = id;
    toDoFinished.appendChild(ul);
    const toDoObj = {
        id: id,
        text: text
    }
    FINISHED.push(toDoObj);
    saveToDos();
}

function handleSubmit(event)
{
    event.preventDefault();
    const currentValue = toDoInput.value;
    const currentId = Date.now();
    paintPending(currentValue, currentId);
    toDoInput.value = "";
}

function loadToDos()
{
    const loadedPending = localStorage.getItem(PENDING_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    if (loadedPending !== null || loadedFinished !== null)
    {
        const parsePending = JSON.parse(loadedPending);
        const parseFinished = JSON.parse(loadedFinished);
        parsePending.forEach(function(toDo){
            paintPending(toDo.text, toDo.id);
        });
        parseFinished.forEach(function(toDo){
            paintFinished(toDo.text, toDo.id);
        });
    }
    else{
        ;
    }
}

function init()
{
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();

function createHabitItem(habitText){
    let li = document.createElement("li");
        li.dataset.name = habitText;
    let span = document.createElement("span");
        span.textContent = habitText;
    let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
    let buttonClear = document.createElement("button");
        buttonClear.textContent="удалить";
        buttonClear.addEventListener('click', function() {
                li.remove();
                saveHabits();
        });
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(buttonClear);
        list.appendChild(li); 

}
function checkDayReset(){
    let today = new Date().toLocaleDateString();
    let lastDate = localStorage.getItem('lastDate');
    if (today != lastDate){
        localStorage.setItem('lastDate', today);
        document.querySelectorAll("input").forEach(function(checkbox){
        checkbox.checked = false;
        });
        console.log('новый день');
    }  
    console.log(today, lastDate);
};
function saveHabits(){
    let data = [];
        document.querySelectorAll("li").forEach(function(li){
            data.push(li.dataset.name);
        });
    localStorage.setItem('tasks', JSON.stringify(data));
};
function loadHabits(){
    let saved = localStorage.getItem("tasks");
    if (!saved) return;
    let data = JSON.parse(saved);
        data.forEach(function(habitText){
            createHabitItem(habitText);

    });
};
let list = document.getElementById('habit-list');

let button = document.getElementById('btn-add').addEventListener('click', function() { 
    let modal = document.querySelector('.modal-overlay');
        modal.classList.add('active');
});

document.getElementById("btn-cancel").addEventListener('click', function() {
    let modal = document.querySelector('.modal-overlay');
        modal.classList.remove('active');
});

document.getElementById("btn-save").addEventListener('click', function() {
    let habitText = document.querySelector('.modal__input').value;
    if (!habitText || habitText.trim() === "") return;
    createHabitItem(habitText);
    saveHabits();
    let modal = document.querySelector('.modal-overlay');
        modal.classList.remove('active');
    let textInpu = document.querySelector('.modal__input');
        textInpu.value = '';
});

loadHabits();
checkDayReset();

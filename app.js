function createHabitItem(habitText){
    let li = document.createElement("li");
        li.dataset.name = habitText;
    let span = document.createElement("span");
        span.textContent = habitText;
    let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener('change',function(){
        updateCounter();
        })
    let buttonClear = document.createElement("button");
        buttonClear.textContent="удалить";
        buttonClear.className = "delete-btn";
        buttonClear.addEventListener('click', function() {
                li.remove();
                saveHabits();
        });
    let habitLeft=document.createElement("div")
        habitLeft.appendChild (checkbox);
        habitLeft.appendChild(span);
        
    li.appendChild(habitLeft)
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
    updateCounter();
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
    updateCounter();
};
function updateCounter() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]'); 
    let count = 0;
    let all=0;
    checkboxes.forEach(function(checkbox){
        all++;
        if (checkbox.checked) count++;
    });
    document.getElementById('counter-text').textContent = "выполнено: " + count + " / " + all;
    let pct = all > 0 ? Math.round(count / all * 100) : 0;
    document.getElementById('progress-fill').style.width = pct + '%';   

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
    updateCounter();
    saveHabits();
    let modal = document.querySelector('.modal-overlay');
        modal.classList.remove('active');
    let textInpu = document.querySelector('.modal__input');
        textInpu.value = '';
    
});

loadHabits();
checkDayReset();


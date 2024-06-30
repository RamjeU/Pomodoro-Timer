// script.js
let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;
let breakType = 'pomodoro';
let completedPomodoros = parseInt(localStorage.getItem('completedPomodoros')) || 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const pomodoroButton = document.getElementById('pomodoro');
const shortBreakButton = document.getElementById('shortBreak');
const longBreakButton = document.getElementById('longBreak');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const customPomodoro = document.getElementById('customPomodoro');
const customShortBreak = document.getElementById('customShortBreak');
const customLongBreak = document.getElementById('customLongBreak');
const saveSettingsButton = document.getElementById('saveSettings');
const completedPomodorosDisplay = document.getElementById('completedPomodoros');
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const notificationSound = document.getElementById('notificationSound');

pomodoroButton.addEventListener('click', () => setTimer('pomodoro'));
shortBreakButton.addEventListener('click', () => setTimer('shortBreak'));
longBreakButton.addEventListener('click', () => setTimer('longBreak'));
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
addTaskButton.addEventListener('click', addTask);
saveSettingsButton.addEventListener('click', saveSettings);
toggleDarkModeButton.addEventListener('click', toggleDarkMode);

completedPomodorosDisplay.textContent = completedPomodoros;

if (JSON.parse(localStorage.getItem('darkMode'))) {
    document.body.classList.add('dark-mode');
}

function updateDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function setTimer(type) {
    clearInterval(timer);
    isRunning = false;
    breakType = type;
    switch (type) {
        case 'pomodoro':
            minutes = parseInt(localStorage.getItem('pomodoroDuration')) || 25;
            break;
        case 'shortBreak':
            minutes = parseInt(localStorage.getItem('shortBreakDuration')) || 5;
            break;
        case 'longBreak':
            minutes = parseInt(localStorage.getItem('longBreakDuration')) || 20;
            break;
    }
    seconds = 0;
    updateDisplay();
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer);
                isRunning = false;
                notificationSound.play();
                if (breakType === 'pomodoro') {
                    completedPomodoros++;
                    localStorage.setItem('completedPomodoros', completedPomodoros);
                    completedPomodorosDisplay.textContent = completedPomodoros;
                }
                alert('Time\'s up!');
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    setTimer(breakType);
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        taskList.removeChild(li);
    });

    li.appendChild(removeButton);
    taskList.appendChild(li);

    taskInput.value = '';
}

function saveSettings() {
    localStorage.setItem('pomodoroDuration', customPomodoro.value);
    localStorage.setItem('shortBreakDuration', customShortBreak.value);
    localStorage.setItem('longBreakDuration', customLongBreak.value);
    alert('Settings saved!');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Initial display update
updateDisplay();

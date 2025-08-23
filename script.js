let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let lapCounter = 0;

// DOM elements
const display = document.getElementById('stopwatch-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const lapsList = document.getElementById('laps-list');
const noLapsText = document.getElementById('no-laps-text'); // New: Select the element for the "No laps" message

// Event listeners
startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

// Start/Pause button function
function startPause() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(getShowTime, 10); // Update every 10ms
        
        startPauseBtn.innerHTML = "Pause";
        startPauseBtn.classList.add('paused');
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        
        startPauseBtn.innerHTML = "Start";
        startPauseBtn.classList.remove('paused');
        running = false;
    }
}

// Reset button function
function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    lapCounter = 0;
    
    display.innerHTML = "00:00:00.00"; // Changed: Updated initial display to include milliseconds
    startPauseBtn.innerHTML = "Start";
    startPauseBtn.classList.remove('paused');
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsList.innerHTML = ""; // Clear lap list
    noLapsText.style.display = 'block'; // New: Show "No lap times recorded yet"
}

// Lap button function
function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `<span>Lap ${lapCounter}:</span><span>${lapTime}</span>`;
        lapsList.prepend(lapItem); // Add new lap to the top of the list
        noLapsText.style.display = 'none'; // New: Hide "No lap times recorded yet" when the first lap is added
    }
}

// Function to update the display
function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

// Helper function to format the time
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    const pad = (num) => num.toString().padStart(2, '0');

    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

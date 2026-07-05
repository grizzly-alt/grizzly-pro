
let timeInSeconds = 87; 

const timerElement = document.getElementById('timer');

function updateTimerDisplay() {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
}
updateTimerDisplay();
const countdownInterval = setInterval(() => {
  timeInSeconds--;
  updateTimerDisplay(); 
  if (timeInSeconds <= 0) {
    clearInterval(countdownInterval);
  }
}, 1000);

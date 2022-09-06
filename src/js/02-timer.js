import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    btnStart: document.querySelector('[data-start]'),
    input: document.querySelector('input'),
    timerInterface: document.querySelectorAll('.value')
}

let timerId = null;
refs.btnStart.disabled = true;
let maxTimerTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) { 
        const currentTime = new Date();
        const timerValue = currentTime - selectedDates[0]
        if (timerValue > 0) {
            refs.btnStart.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.btnStart.disabled = false;
            maxTimerTime = timerValue;
        }
  },
};
flatpickr(refs.input, options);

refs.btnStart.addEventListener('click', () => {
    Notiflix.Notify.success('Timer started');
    turnOnTimer(maxTimerTime);
    refs.btnStart.disabled = true;
})

function turnOnTimer(maxTimerTime) {
    const startTime = new Date()
    timerId = setInterval(() => {
        const deltaTime = new Date() - startTime;
        let currentTime = Math.abs(maxTimerTime) - deltaTime;
        const { days, hours, minutes, seconds } = convertMs(currentTime); 
        updateTimer(convertMs(currentTime))
        if (seconds === '00') {
            clearInterval(timerId);
            Notiflix.Notify.info('Timer is over'); 
        }
    }, 1000)   
}

function updateTimer({ days, hours, minutes, seconds }) {
    refs.timerInterface[0].textContent = days;
    refs.timerInterface[1].textContent = hours;
    refs.timerInterface[2].textContent = minutes;
    refs.timerInterface[3].textContent = seconds;
}

function addLeadingZero(maxTimerTime){
    return String(maxTimerTime).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

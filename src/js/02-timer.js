import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    btnStart: document.querySelector('[data-start]'),
    input: document.querySelector('input')
}

let timerId = null
refs.btnStart.disabled = true;
let maxTimerTime = 0

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) { 
        const currenntTime = new Date();
        const timerValue = currenntTime - selectedDates[0]
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
    turnOnTimer(maxTimerTime)
    refs.btnStart.disabled = true;
})

function turnOnTimer(maxTimerTime) {
    const startTime = new Date()
    timerId = setInterval(() => {
        const deltaTime = new Date() - startTime;
        currenntTime = Math.abs(maxTimerTime) - deltaTime;
        const { days, hours, minutes, seconds } = convertMs(currenntTime); 
        // Math.abs(maxTimerTime)
        console.log({ days, hours, minutes, seconds });
        if (currenntTime <= 0) {
             clearInterval(timerId)
            Notiflix.Notify.info('Timer is over'); 
        }
    }, 1000)   
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

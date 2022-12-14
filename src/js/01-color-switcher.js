const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]')
}
let intervalId = null;

refs.btnStart.addEventListener('click', turnOnInterval)
refs.btnStop.addEventListener('click', turnOffInterval)

function turnOnInterval() {
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    refs.btnStart.setAttribute('disabled', true);
}
function turnOffInterval() {
    clearInterval(intervalId);
    refs.btnStart.removeAttribute('disabled');
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
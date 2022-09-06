import Notiflix from 'notiflix';

const formRef = document.querySelector('form')

const formData = {}
let intervalId = null;
let position = 0;
let TIMER = 0;
let delay = 0;


formRef.addEventListener('input', getData)
formRef.addEventListener('submit', (e) => {
  e.preventDefault() 
  turnOnCounter()
})

function getData(e) {
  formData[e.target.name] = e.target.value
  delay = Number(formData.delay)
  TIMER = formData.step
}

function turnOnCounter() {
  setTimeout(() => {
    position += 1;
    createPromise(position, delay)
    turnOnInterval()
  }, formData.delay);
}

function turnOnInterval() {
  intervalId = setInterval(() => {
    position += 1;
    delay += Number(TIMER)
    console.log(delay);
     createPromise(position, delay)
    if (String(position) === formData.amount) {
      clearInterval(intervalId)
    }
  }, TIMER)
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
 return new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve({ position, delay })
  } else {
        reject({ position, delay })
    }
  })
  
}




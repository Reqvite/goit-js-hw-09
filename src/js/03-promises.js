import Notiflix from 'notiflix';

const formRef = document.querySelector('form')

const formData = {}

formRef.addEventListener('input', getData)
formRef.addEventListener('submit', turnOn)

function getData(e) {
  formData[e.target.name] = e.target.value;
}

function turnOn(e) {
  e.preventDefault() 

  let delay = Number(formData.delay);
  let step = Number(formData.step);
  let amount = Number(formData.amount);


    for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)})
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)})
      delay += step;    
  } 
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  });
}










import Notiflix from 'notiflix';

const formRef = document.querySelector('form')

formRef.addEventListener('submit', onSubmit)

function onSubmit(e) {
  e.preventDefault()
  let delay = Number(formRef[0].value);
  let step = Number(formRef[1].value);
  let amount = Number(formRef[2].value);

    if (delay <= 0 || step <= 0 || amount <= 0) {
      Notiflix.Notify.info('Enter a positive numbers.'); 
      return;
    }
  
  for (let position = 1; position <= amount; position += 1){
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
    resolve({position, delay})
  } else {
    reject({position, delay})
  }
     },delay)
   })
}
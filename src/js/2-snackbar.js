import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const toastOptions = {
  icon: 'icon-placeholder',
  position: 'topRight',
  timeout: 3000,
};

form.addEventListener('submit', createPromise);

function createPromise(e) {
  e.preventDefault();
  const delay = +e.target.elements.delay.value.trim();
  const state = e.target.elements.state.value.trim();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  })
    .then((delay) => {
      iziToast.success({
        ...toastOptions,
        iconText: '✅',
        title: 'Fulfilled',
        message: `Fulfilled promise in ${delay}ms`
      });
    })
    .catch((delay) => {
      iziToast.error({
        ...toastOptions,
        iconText: '❌',
        title: 'Rejected',
        message: `Rejected promise in ${delay}ms`
      });
    })
    .finally(() => {
      form.reset();
    });
}
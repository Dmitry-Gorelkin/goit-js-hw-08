import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const objForm = {};

if (localStorage.getItem('feedback-form-state')) {
  transformationJSON();

  refs.email.value = objForm.email ? objForm.email : '';
  refs.message.value = objForm.message ? objForm.message : '';
}

function onMailInput(e) {
  objForm.email = e.target.value;
  onJsonForm(objForm);
}

function onMessageInput(e) {
  objForm.message = e.target.value;
  onJsonForm(objForm);
}

function onJsonForm(obj) {
  localStorage.setItem('feedback-form-state', JSON.stringify(obj));
}

function formSubmit(e) {
  e.preventDefault();

  transformationJSON();

  if (!objForm.email || !objForm.message) {
    alert('Вы не заполнили форму.');
    return;
  }

  console.log(objForm);

  e.target.reset();
  localStorage.removeItem('feedback-form-state');
  objForm.email = '';
  objForm.message = '';
}

function transformationJSON() {
  const submitFormJSON = localStorage.getItem('feedback-form-state');
  const formJSON = JSON.parse(submitFormJSON);

  objForm.email = formJSON.email;
  objForm.message = formJSON.message;
}

refs.email.addEventListener('input', throttle(onMailInput, 500));
refs.message.addEventListener('input', throttle(onMessageInput, 500));
refs.form.addEventListener('submit', formSubmit);

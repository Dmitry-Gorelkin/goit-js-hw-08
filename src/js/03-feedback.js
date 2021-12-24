import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const LOCAL_KEY = 'feedback-form-state';
const objForm = {};

if (localStorage.getItem(LOCAL_KEY)) {
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
  localStorage.setItem(LOCAL_KEY, JSON.stringify(obj));
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
  localStorage.removeItem(LOCAL_KEY);
  objForm.email = '';
  objForm.message = '';
}

function transformationJSON() {
  const submitFormJSON = localStorage.getItem(LOCAL_KEY);
  const formJSON = JSON.parse(submitFormJSON);

  if (!formJSON) return;

  objForm.email = formJSON.email;
  objForm.message = formJSON.message;
}

refs.email.addEventListener('input', throttle(onMailInput, 500));
refs.message.addEventListener('input', throttle(onMessageInput, 500));
refs.form.addEventListener('submit', formSubmit);

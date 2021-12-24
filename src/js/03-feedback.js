import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const LOCAL_KEY = 'feedback-form-state';
let objForm = {};

function onInput(e) {
  objForm[e.target.name] = e.target.value;
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
  objForm = {};
}

function transformationJSON() {
  if (!localStorage.getItem(LOCAL_KEY)) return;

  objForm = JSON.parse(localStorage.getItem(LOCAL_KEY));
}

function fillForm() {
  if (!localStorage.getItem(LOCAL_KEY)) return;

  transformationJSON();

  refs.email.value = objForm.email ? objForm.email : '';
  refs.message.value = objForm.message ? objForm.message : '';
}

fillForm();
refs.form.addEventListener('input', throttle(onInput, 500));
refs.form.addEventListener('submit', formSubmit);

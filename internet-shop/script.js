'use strict'
const input = document.querySelector('.todo-list__input');
const btn = document.querySelector('.todo-list__button');
const list = document.querySelector('.todo-list__list');
const result =document.querySelector('.todo-list__result');

function addNewTask() {
  const newTask = input.value;
  const newLi = document.createElement('li');
  newLi.classList.add('todo-list__item');
  newLi.textContent = newTask;
  list.append(newLi);
  input.value = null;
}

function doneEverything() {
  let itemsArr = [...list.getElementsByClassName('todo-list__item')];
  let doneResult = 0;

  itemsArr.forEach(element => element.classList.contains('done') ? doneResult++ : doneResult)

  if (doneResult === itemsArr.length) {
    result.textContent = "Great! Your have done everything for today!!!"
  } else {
    result.textContent = null;
  }
}

btn.addEventListener('click', addNewTask);

list.addEventListener('click', function(event) {
  if (event.target.classList.contains('todo-list__item')) {
    event.target.classList.toggle('done');
  }
  doneEverything();
});

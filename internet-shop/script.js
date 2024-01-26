'use strict'
const qtyInBasket = document.querySelector('.qty-in-basket');
const qtyArr = [...document.getElementsByClassName('basket__item-qty')];
const deleteBtnsArr = [...document.getElementsByClassName('basket__item-delete')];
const itemPriceInitArr = [...document.getElementsByClassName('basket__item-price-init')];
const itemPriceCalcArr = [...document.getElementsByClassName('basket__item-price')];
const totalPrice = document.querySelector('.basket__footer-total-price');

//calculate quantity of items in basket
function calcQtyInBasket() {
  let result = 0;
  qtyArr.forEach(item => result = result + +item.value);
  qtyInBasket.textContent = result;
}

//calculate prices of items when the quantity is changed
function calcPrice() {
  for (let i=0; i<itemPriceInitArr.length; i++) {
    for (let j=0; j<qtyArr.length; j++) {
      if(i == j) {
        let result = itemPriceInitArr[i].textContent;
        result = result * +qtyArr[j].value;
        let container = itemPriceInitArr[i].closest('.basket__item-price-container');
        container.querySelector('.basket__item-price').textContent = `${result} ₽`;
      }
    }
  }
}

//calculate total price
function calcTotalPrice() {
  let result = 0;
  itemPriceCalcArr.forEach(item => result += parseInt(item.textContent));
  totalPrice.textContent = `${result} ₽`;
}




//event listeners
window.addEventListener('load', function() {
  calcQtyInBasket();
  calcTotalPrice();
})

qtyArr.forEach(item => item.addEventListener('change', function() {
  calcQtyInBasket();
  calcPrice();
  calcTotalPrice();

}));




//delete item from the basket
deleteBtnsArr.forEach(item => item.addEventListener('click', function() {
  item.closest('.basket__item').remove();
  const qtyArr = [...document.getElementsByClassName('basket__item-qty')];
  console.log(qtyArr); // изменился состав массива
  calcQtyInBasket();// но не обновляется количество товаров в корзине
  calcTotalPrice(); // и не обновляется общая стоимость в ИТОГО
}));


// const input = document.querySelector('.todo-list__input');
// const btn = document.querySelector('.todo-list__button');
// const list = document.querySelector('.todo-list__list');
// const result =document.querySelector('.todo-list__result');

// function addNewTask() {
//   const newTask = input.value;
//   const newLi = document.createElement('li');
//   newLi.classList.add('todo-list__item');
//   newLi.textContent = newTask;
//   list.append(newLi);
//   input.value = null;
// }

// function doneEverything() {
//   let itemsArr = [...list.getElementsByClassName('todo-list__item')];
//   let doneResult = 0;

//   itemsArr.forEach(element => element.classList.contains('done') ? doneResult++ : doneResult)

//   if (doneResult === itemsArr.length) {
//     result.textContent = "Great! Your have done everything for today!!!"
//   } else {
//     result.textContent = null;
//   }
// }

// btn.addEventListener('click', addNewTask);

// list.addEventListener('click', function(event) {
//   if (event.target.classList.contains('todo-list__item')) {
//     event.target.classList.toggle('done');
//   }
//   doneEverything();
// });

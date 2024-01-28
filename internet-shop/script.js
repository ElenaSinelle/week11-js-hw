'use strict'
const qtyInBasket = document.querySelector('.qty-in-basket');
const qtyArr = [...document.getElementsByClassName('basket__item-qty')];
const deleteBtnsArr = [...document.getElementsByClassName('basket__item-delete')];
const itemPriceInitArr = [...document.getElementsByClassName('basket__item-price-init')];
const itemPriceCalcArr = [...document.getElementsByClassName('basket__item-price')];
const itemPriceDiscounted = [...document.getElementsByClassName('basket__item-price-discounted')];
const totalPrice = document.querySelector('.basket__footer-total-price');
const totalPriceDiscounted = document.querySelector('.basket__footer-total-discounted');
const promoDiscount = document.querySelector('.basket__footer-promo-discount');
const certDiscount = document.querySelector('.basket__footer-cert-discount');
const promoBtn = document.querySelector('.basket__footer-promo-btn');
const certBtn = document.querySelector('.basket__footer-cert-btn');
const btnContainer = document.querySelector('.basket__footer-promo-container');

//calculate quantity of items in basket
function calcQtyInBasket() {
  let result = 0;
  qtyArr.forEach(item => result = result + +item.value);
  qtyInBasket.textContent = result;
}

//converting of a num to string
function numToString(num) {
  let resultStr = String(num);
  let resultStrSplit = resultStr.slice(0, -3) + ' ' + resultStr.slice(-3);
  return resultStrSplit;
}

//converting of a string to num
function stringToNum(str) {
  let strArr = Array.from(str);
  let numArr = [];
  strArr.forEach((i) => {
    if (i == ' ' || i == '₽') {
      numArr.push('');
    } else {
      numArr.push(i);
    }
  })
  let num = +numArr.join('');
  return num;
}

//calculate prices of items when the quantity is changed
function calcPrice() {
  for (let i = 0; i < itemPriceInitArr.length; i++) {
    for (let j = 0; j < qtyArr.length; j++) {
      if (i == j) {
        let priceNum = itemPriceInitArr[i].textContent * +qtyArr[j].value;

        let priceStr = numToString(priceNum);

        let container = itemPriceInitArr[i].closest('.basket__item-price-container');

        container.querySelector('.basket__item-price').textContent = `${priceStr} ₽`;
      }
    }
  }
}

//calculate total price
function calcTotalPrice() {
  let result = 0;

  itemPriceCalcArr.forEach(item => {
    let num = stringToNum(item.textContent);
    result += num;
  });

  totalPrice.textContent = `${numToString(result)} ₽`;
}

//calculate promo discount
function calcDiscount(discount) {
  for (let i = 0; i < itemPriceCalcArr.length; i++) {
    for (let j = 0; j < qtyArr.length; j++) {
      if (i == j) {
        let priceNum = stringToNum(itemPriceCalcArr[i].textContent) * discount;

        let priceStr = numToString(priceNum);

        let container = itemPriceInitArr[i].closest('.basket__item-price-container');

        container.querySelector('.basket__item-price-discounted').textContent = `${priceStr} ₽`;
        crossOut(itemPriceCalcArr[i]);

      }
    }
  }
}

//calculate discounted total price
function calcDiscountedTotalPrice(discount) {
  let totalPriceNum = stringToNum(totalPrice.textContent);
  let totalPriceDiscountedNum  = totalPriceNum * discount;
  let discountNum = totalPriceNum - totalPriceDiscountedNum;

  totalPriceDiscounted.textContent = `${numToString(totalPriceDiscountedNum)} ₽`;
  crossOut(totalPrice);

  if (discount == 0.75) {
    promoDiscount.textContent =  `${numToString(discountNum)} ₽`;
    certDiscount.textContent = '';
  } else  if (discount = 0.85) {
    certDiscount.textContent =  `${numToString(discountNum)} ₽`;
    promoDiscount.textContent = '';
  }
}

//function crossing old price
function crossOut(elem) {
  elem.classList.add('crossed');
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

btnContainer.addEventListener('click', function(e) {
  if (e.target == promoBtn) {
    calcDiscount(0.75);
    calcDiscountedTotalPrice(0.75);
  }
  if (e.target == certBtn) {
    calcDiscount(0.85);
    calcDiscountedTotalPrice(0.85);
  }
});


//delete item from the basket
deleteBtnsArr.forEach(item => item.addEventListener('click', function() {
  item.closest('.basket__item').remove();
  const qtyArr = [...document.getElementsByClassName('basket__item-qty')];
  console.log(qtyArr); // изменился состав массива
  calcQtyInBasket();// но не обновляется количество товаров в корзине
  calcTotalPrice(); // и не обновляется общая стоимость в ИТОГО
}));

'use strict';


const goods = [
    { name: 'Яблоко', type: 'product', sort: '"Антовка"', price: 34, value: 10, },
    { name: 'Груша', type: 'product', sort: '"Мраморная"', price: 40, value: 13, }
];
/* const goods = []; */

const basket = {

    basketInit() {
        let idBasket = document.querySelector('#idBasket');
        let h1Tag = document.createElement('h1');
        h1Tag.innerHTML = 'Ваша корзина:';
        if (goods.length !== 0) {
            idBasket.appendChild(h1Tag);
            for (let i = 0; i < goods.length; i++) {
                let good = document.createElement('p');
                good.innerHTML = `${goods[i].name} сорт '${goods[i].sort}'. Цена за кг ${goods[i].price} р. Количество ${goods[i].value}кг.`;
                idBasket.appendChild(good);
            }
            this.attachMessage();
        } else {
            this.attachMessage();
        }
    },

    countBasketPrice() {
        return goods.reduce((a, { price, value }) => a + (price * value), 0);
    },

    attachMessage() {
        if (goods.length === 0) {
            let pTag = document.createElement('p');
            pTag.innerHTML = 'Ваша корзина пуста.';
            idBasket.appendChild(pTag);
        } else {
            let h1Tag = document.querySelector('h1');
            let good = document.createElement('p');
            idBasket.insertAdjacentHTML('beforeend',
                `В корзине ${goods.length} товара/-ов на сумму ${this.countBasketPrice()} руб.`);
        }
    },
};

basket.basketInit();
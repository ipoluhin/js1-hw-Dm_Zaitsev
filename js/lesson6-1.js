'use strict';

//Catalog
const catalog = {

    goodsInCatalog : [
        {
            position: 0,
            name: 'Яблоки',
            name_cat: 'Apple',
            type: 'product',
            sort: '"Антоновка"',
            price: 34,
            value: 10,
            src: `src="./img/antonovka.jpg"`,
        },
        {
            position: 1,
            name: 'Груша',
            name_cat: 'Pear',
            type: 'product',
            sort: '"Мраморная"',
            price: 40,
            value: 13,
            src: `src="./img/mramornaya.jpg"`,
        },
    ],

    init(){
        for (let i = 0; i < catalog.goodsInCatalog.length; i++) {
            let cat = document.querySelector('#idCatalog');
            cat.insertAdjacentHTML('afterbegin',
                `<div class="product catalog__product">
    <img ${catalog.goodsInCatalog[i].src} alt="image">
    <p>${catalog.goodsInCatalog[i].name} ${catalog.goodsInCatalog[i].sort}</p>
    <button class="button product__button" id="${catalog.goodsInCatalog[i].name_cat}">Добавить в корзину</button>
    <hr></div>`);
        }
        this.eventHandler();
    },
    
    eventHandler(){
        let cat = document.querySelector('#idCatalog');
        cat.addEventListener('click', (event) => {
            for (let i = 0; i < catalog.goodsInCatalog.length; i++) {
                if (event.target.id === catalog.goodsInCatalog[i].name_cat) {
                    basket.goodsInBasket.push(catalog.goodsInCatalog[i]);
                }
            }
            basket.basketInit();
        });
    },
};

catalog.init();

//Basket
const basket = {
    
    goodsInBasket: [],

    basketInit() {
        let idBasket = document.querySelector('#idBasket');
        idBasket.innerHTML = ``;
        let h1Tag = document.createElement('h1');
        let pTag = document.createElement('p');
        h1Tag.innerHTML = `Ваша корзина:<hr>`;

        if (this.goodsInBasket.length !== 0) {
            idBasket.appendChild(h1Tag);
            for (let i = 0; i < this.goodsInBasket.length; i++) {
                let good = document.createElement('p');
                /**
                *Вот тут в будущем постараюсь сделать проверку на наличие подобного товара в корзине, чтобы в списке
                *корзины менялись лишь количество и общая стоимость(при уже наличии этого товара). А пока будет некрасиво)
                **/
                good.innerHTML = `${this.goodsInBasket[i].name} сорт '${this.goodsInBasket[i].sort}'. Цена за кг ${this.goodsInBasket[i].price} р.
    Количество ${this.goodsInBasket[i].value}кг.`;
                idBasket.appendChild(good);
            }
            this.attachMessage();
        } else {
            this.attachMessage();
        }
    },

    countBasketPrice() {
        return this.goodsInBasket.reduce((a, {price, value}) => a + (price * value), 0);
    },

    attachMessage() {
        if (this.goodsInBasket.length === 0) {
            let pTag = document.createElement('p');
            pTag.innerHTML = 'Ваша корзина пуста.';
            idBasket.appendChild(pTag);
        } else {
            // #idTotalPrice
            let pTag = document.createElement('p');
            pTag.innerHTML = `<hr>В корзине ${this.goodsInBasket.length} товара/-ов на сумму ${this.countBasketPrice()} руб. `;
            idBasket.appendChild(pTag);
        }
    },
};
basket.basketInit();

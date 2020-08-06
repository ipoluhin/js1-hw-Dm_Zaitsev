'use strict';


const thingsNames = [];
//Catalog
const catalog = {

    goodsInCatalog: [
        {
            position: 0,
            name: 'Яблоки',
            name_cat: 'Apple',
            type: 'product',
            sort: '"Антоновка"',
            price: 34,
            value: 1,
            src: `src="./img/antonovka.jpg"`,
        },
        {
            position: 1,
            name: 'Груша',
            name_cat: 'Pear',
            type: 'product',
            sort: '"Мраморная"',
            price: 40,
            value: 1,
            src: `src="./img/mramornaya.jpg"`,
        },
    ],

    init() {
        catalog.goodsInCatalog.forEach(function (item, i) {
            let cat = document.querySelector('#idCatalog');
            cat.insertAdjacentHTML('afterbegin',
                `<div class="product catalog__product">
    <img ${catalog.goodsInCatalog[i].src} alt="image">
    <p>${catalog.goodsInCatalog[i].name} ${catalog.goodsInCatalog[i].sort}</p>
    <button class="button product__button" id="${catalog.goodsInCatalog[i].name_cat}">Добавить в корзину</button>
    <hr></div>`);
        });
        this.eventHandler();
    },
    eventHandler() {
        let cat = document.querySelector('#idCatalog');
        cat.addEventListener('click', (event) => {
            catalog.goodsInCatalog.forEach(function (item, i) {
                if (event.target.id === catalog.goodsInCatalog[i].name_cat) {
                    if (basket.goodsInBasket.includes(catalog.goodsInCatalog[i])) {
                        let basketItemIndex = basket.goodsInBasket.indexOf(catalog.goodsInCatalog[i]);
                        basket.goodsInBasket[basketItemIndex].value++;
                    } else {
                        basket.goodsInBasket.push(catalog.goodsInCatalog[i]);
                    };
                }
            });
            basket.basketInit();

        });
    },

    disactivateCatalog() {
        let cat = document.querySelector('#idCatalog');
        idCatalog.innerHTML = ``;
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
        h1Tag.innerHTML = `Ваша корзина:<hr>`;

        if (basket.goodsInBasket.length !== 0) {
            idBasket.appendChild(h1Tag);
            basket.goodsInBasket.forEach(function (item, i) {
                idBasket.insertAdjacentHTML('beforeend',
                    `<div class="good basket__good" id="basket__good">
                           <div class = "good__description">${basket.goodsInBasket[i].name} сорт '${basket.goodsInBasket[i].sort}'. 
                Цена за кг ${basket.goodsInBasket[i].price} р.   Количество ${basket.goodsInBasket[i].value}кг.
                </div>
                <button class="button good__button-delete" id="${i}">Удалить</button></div>`);
            })
            let deleteButton = document.querySelectorAll('#basket__good');
            basket.goodsInBasket.forEach(function (item, i) {
                deleteButton[i].addEventListener('click', (event) => {
                    basket.goodsInBasket.splice(event.target.id, 1);
                    basket.basketInit();
                })
            })
            this.attachMessage();
        } else {
            this.attachMessage();
        }
    },

    countBasketPrice() {
        return this.goodsInBasket.reduce((a, { price, value }) => a + (price * value), 0);
    },

    attachMessage() {
        if (this.goodsInBasket.length === 0) {
            let pTag = document.createElement('p');
            pTag.innerHTML = 'Ваша корзина пуста.';
            idBasket.appendChild(pTag);
        } else {
            // #idTotalPrice
            let idBasket = document.querySelector('#idBasket');
            idBasket.insertAdjacentHTML('beforeend',
                `<hr>В корзине ${this.goodsInBasket.length} товара/-ов на сумму ${this.countBasketPrice()} руб. 
                       <p></p>
                       <button class="button basket__drop-button" id="idDropBasketButton">Очистить корзину</button>
                       <p><input type="submit" value="Далее" id="idShippingButton"></p>`);
            let dropButton = document.querySelector('#idDropBasketButton');
            dropButton.addEventListener('click', () => {
                this.dropBasket();
            });
            let shippingButton = document.querySelector('#idShippingButton');
            shippingButton.addEventListener('click', () => shipping.init());
        }
    },

    dropBasket() {
        this.goodsInBasket = [];
        this.basketInit();
    },

    disactivateBasket() {
        let idBasket = document.querySelector('#idBasket');
        idBasket.innerHTML = ``;
    },
};

basket.basketInit();

//Shipping address
const shipping = {
    init() {
        catalog.disactivateCatalog();
        basket.disactivateBasket();
        this.disactivateShipping();
        let shippingForm = document.querySelector('#idShipping');
        shippingForm.insertAdjacentHTML('beforeend',
            `<form class="form address__form" action="#">
            <fieldset>
                <legend>Контактная информация</legend>
                <label for="lastName">Фамилия</label>
                <input id="lastName" placeholder="Иванов" autofocus required pattern="\\S+[А-яа-я]">
                <br>
                <label for="firstName">Имя</label>
                <input id="firstName" placeholder="Иван" required pattern="\\S+[А-яа-я]">
                <br>
                <label for="address">Адрес</label>
                <input id="address" placeholder="123456, город, улица, дом, квартира">
                <br>
                <label for="telephone">Телефон</label>
                <input id="telephone" type="number" placeholder="+7-903-955-55-55" required>
                <br>
                <label for="email">Email</label>
                <input id="email" placeholder="email@server.com" required pattern="\\S+@[a-z]+.[a-z]+">
                <br></fieldset>
            <p><input type="submit" value="Назад" id="idBasketButton"><input type="submit" value="Далее" id="idCommentsButton"></p>
        </form>`);
        let basketButton = document.querySelector('#idBasketButton');
        basketButton.addEventListener('click', () => {
            this.disactivateShipping();
            catalog.init();
            basket.dropBasket();
        });
        let commentsButton = document.querySelector('#idCommentsButton');
        commentsButton.addEventListener('click', () => {
            this.disactivateShipping();
            comments.init();
        });

    },

    disactivateShipping() {
        let idShipping = document.querySelector('#idShipping');
        idShipping.innerHTML = ``;
    },
};

//Comments
const comments = {
    init() {
        shipping.disactivateShipping();
        this.disactivateComments();
        let commentsForm = document.querySelector('#idComments');
        commentsForm.insertAdjacentHTML('beforeend',
            `<form class="form address__form" action="#">    
    <form class="form comment__form" action="#">
            <fieldset>
            <legend>Комментарии к доставке</legend>
        <br>
        <label for="comments"></label>
            <textarea id="comments"></textarea>
            </fieldset>
            <p><input type="submit" value="Назад" id="idShippingButton"><input type="submit" value="Оформить доставку"></p>
            </form>`);
        let shippingButton = document.querySelector('#idShippingButton');
        shippingButton.addEventListener('click', () => {
            this.disactivateComments();
            shipping.disactivateShipping();
            shipping.init();
        });
    },

    disactivateComments() {
        let idComments = document.querySelector('#idComments');
        idComments.innerHTML = ``;
    },
};



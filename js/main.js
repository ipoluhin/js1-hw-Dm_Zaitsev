'use strict';


const goodsBase = [
    {
        name: 'Яблоки',
        name_eng: 'Apple',
        type: 'product',
        sort: '"Антоновка"',
        price: 34,
        src: `src="./img/apple_antonovka.jpg"`,
    },
    {
        name: 'Груша',
        name_eng: 'Pear',
        type: 'product',
        sort: '"Мраморная"',
        price: 40,
        src: `src="./img/pear_mramornaya.jpg"`,
    },
    {
        name: 'Слива',
        name_eng: 'Plum',
        type: 'product',
        sort: '"Черная"',
        price: 37,
        src: `src="./img/plum_black.webp"`,
    },
    {
        name: 'Персик',
        name_eng: 'Peach',
        type: 'product',
        sort: '"Соната"',
        price: 45,
        src: `src="./img/peach_sonata.jpg"`,
    },
];

const goodsInBasket = [];

class Item {
    constructor(name, name_eng, type, sort, price, src) {
        this.name = name;
        this.name_eng = name_eng;
        this.type = type;
        this.sort = sort;
        this.price = price;
        /* this.value = value; */
        this.src = src;
    }
};

/* Класс Товар каталог */
class CatalogItem extends Item {
    constructor(name, name_eng, type, sort, price, src) {
        super(name, name_eng, type, sort, price, src);
    };
    render(i) {
        let cat = document.querySelector('#idCatalog');
        cat.insertAdjacentHTML('beforeend',
            `<div class="catalog__product">
    <div class="product-cart">
        <img ${goodsBase[i].src} alt="image" class="pruduct-img" width="50" height="37">
        <section class="description">
            <span class="product-name">${goodsBase[i].name}</span>
            <span>${goodsBase[i].sort}</span>
        </section>
    </div>
    <div class="button-block">
        <button class="button product__button" id="plus${goodsBase[i].name_eng}">Добавить</button>
        <button class="button button-delete" id="minus${goodsBase[i].name_eng}">Убавить</button>
    </div>
    </div>`
        );
        return cat;
    };
};

/* Класс Товар корзины */
class BasketItem extends Item {
    constructor(name, name_eng, type, sort, price, src) {
        super(name, name_eng, type, sort, price, src);
    };

    render(i) {
        let bas = document.querySelector('#idBasket');
        bas.insertAdjacentHTML('beforeend',
            `<div class="good basket__good" id="basket__good">
            <img ${goodsInBasket[i].src} alt="image" class="pruduct-img" width="50" height="37">
            <p class = "good__description">${goodsInBasket[i].name} -- сорт '${goodsInBasket[i].sort}'
                -- цена за кг ${goodsInBasket[i].price} р. -- Количество ${goodsInBasket[i].value}кг.
            </p>
            <button class="button good__button-delete" id="delPos${goodsInBasket[i].name_eng}">Удалить</button>
        </div>`
        );
        return bas;
    };
};

/* Общий класс Список товаров ItemList */
/**TODO: необходимо переписать каталог и корзину, наследованные от класса ItemList. Классы ниже - старое исполнение */
class ItemList {
    init(listName) {
        goodsBase.forEach((item, i) => {
            const GoodInList = new listName(item.name, item.name_eng, item.type, item.sort, item.price, item.src);
            GoodInList.render(i);
            /* События на кнопки изменения количества товара */
            buttons.valueUp(i);
            buttons.valueDown(i);
        });
    };
}

//Отрисовка каталога
const catalog = {
    init() {
        goodsBase.forEach(function (item, i) {
            const GoodInList = new CatalogItem(item.name, item.name_eng, item.type, item.sort, item.price, item.src);
            GoodInList.render(i);
            /* События на кнопки изменения количества товара */
            buttons.valueUp(i);
            buttons.valueDown(i);
        });
    },
};

//Basket
const basket = {
    Init() {
        if (goodsInBasket.length !== 0) {
            goodsInBasket.forEach(function (item, i) {
                const GoodInList = new BasketItem(item.name, item.name_eng, item.type, item.sort, item.price, item.value, item.src);
                GoodInList.render(i);
                /* События на кнопки изменения количества позиций товара */
                buttons.delBasketPosition(i);
            })
        }
        totalInfo.init();
    },
};

/** Кнопки для работы с количеством товара, очистки позиций по штучно и полностью блока корзины,
*очистки информации в хедере о корзине 
 */
const buttons = {
    valueUp(i) {
        let cat = document.querySelector(`#plus${goodsBase[i].name_eng}`);
        cat.addEventListener('click', (event) => {
            if (goodsInBasket.includes(goodsBase[i])) {
                let basketItemIndex = goodsInBasket.indexOf(goodsBase[i]);
                if (!goodsInBasket[basketItemIndex].value) {
                    goodsInBasket[basketItemIndex].value = 1;
                }
                goodsInBasket[basketItemIndex].value++;
            } else {
                goodsInBasket.push(goodsBase[i]);
                let basketItemIndex = goodsInBasket.indexOf(goodsBase[i]);
                goodsInBasket[basketItemIndex].value = 1;
            };
            this.reloadBasket('#idBasket');
        })
    },
    valueDown(i) {
        let cat = document.querySelector(`#minus${goodsBase[i].name_eng}`);
        cat.addEventListener('click', (event) => {
            if (goodsInBasket.includes(goodsBase[i])) {
                let basketItemIndex = goodsInBasket.indexOf(goodsBase[i]);
                if (goodsInBasket[basketItemIndex].value > 0) {
                    goodsInBasket[basketItemIndex].value--;
                }
                if (goodsInBasket[basketItemIndex].value === 0) {
                    goodsInBasket.splice(basketItemIndex, 1);
                }
                this.reloadBasket('#idBasket');
            };
        });
    },
    delBasketPosition(i) {
        let deleteButton = document.querySelector(`#delPos${goodsInBasket[i].name_eng}`);
        deleteButton.addEventListener('click', (event) => {
            goodsInBasket.splice(i, 1);
            this.reloadBasket('#idBasket');
        })
    },
    dropBasket() {
        let dropButton = document.querySelector('#idDropBasketButton');
        dropButton.addEventListener('click', (event) => {
            event.preventDefault();
            goodsInBasket.splice(0);
            this.reloadBasket('#idBasket');

        })
    },
    reloadBasket(source) {
        let el = document.querySelector(source);
        el.innerHTML = ``;
        basket.Init();
    },
}

const totalInfo = {
    init() {
        let total = document.querySelector('#total');
        if (goodsInBasket.length === 0) {
            total.innerHTML = ``;
            total.insertAdjacentHTML('afterbegin', `<span class="empty-cart-message">Ваша корзина пуста.</span>`);
        } else {
            this.render(goodsInBasket);
            buttons.dropBasket();
        }
    },
    render(goodsInBasket) {
        total.innerHTML = ``;
        total.insertAdjacentHTML('afterbegin',
            `<div class="total-info">
                <p class="in-cart">В корзине:</p>
                <div class = "result-info"><p class="value">Позиций:  ${goodsInBasket.length}</p>
                <p class="total-weight">Общий вес - ${this.countWeight()}кг.</p>
                <p class="total-price">Сумма: ${this.countBasketPrice()} руб.</p></div>
            </div>
            <a href="#" class="button basket__drop-button" id="idDropBasketButton">X</a>`);
    },

    countWeight() {
        return goodsInBasket.reduce((a, { value }) => a + value, 0);
    },
    countValue() {
        return goodsInBasket.length;
    },
    countBasketPrice() {
        return goodsInBasket.reduce((a, { price, value }) => a + (price * value), 0);
    },

}

catalog.init();
basket.Init();



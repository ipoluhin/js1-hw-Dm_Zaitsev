'use strict';

/**Общий класс товара */
class Item {
    constructor(name, name_eng, type, sort, price, src) {
        this.name = name;
        this.name_eng = name_eng;
        this.type = type;
        this.sort = sort;
        this.price = price;
        this.src = src;
    }

};

/* Класс Товар каталог */
class CatalogItem extends Item {
    constructor(name, name_eng, type, sort, price, src) {
        super(name, name_eng, type, sort, price, src);
    };
    render(i, container, source) {
        let cat = document.querySelector(container);
        cat.insertAdjacentHTML('beforeend',
            `<div class="catalog__product">
    <div class="product-cart">
        <img ${source[i].src} alt="image" class="pruduct-img" width="50" height="37">
        <section class="description">
            <sppan class="product-name">${source[i].name}</sppan>
            <span>${source[i].sort}</span>
        </section>
    </div>
    <div class="button-block">
        <button class="button product__button" id="plus${source[i].name_eng}">Добавить</button>
        <button class="button button-delete" id="minus${source[i].name_eng}">Убавить</button>
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
    render(i, container, source) {
        let bas = document.querySelector(container);
        bas.insertAdjacentHTML('beforeend',
            `<div class="good basket__good" id="basket__good">
            <img ${source[i].src} alt="image" class="pruduct-img" width="50" height="37">
            <p class = "good__description">${source[i].name} -- сорт '${source[i].sort}'
                -- цена за кг ${source[i].price} р. -- Количество ${source[i].value}кг.
            </p>
            <button class="button good__button-delete" id="delPos${source[i].name_eng}">Удалить</button>
        </div>`
        );
        return bas;
    };
};

/** Класс Каталога */
class CatalogList {
    constructor(container) {
        this.container = container;
        this.goodsBase = [];
        this._fetchGoods();
        this.init('#idCatalog', '#idBasket');
    };
    init(container, basketContainer) {
        this.goodsBase.forEach((item, i) => {
            const GoodInList = new CatalogItem(item.name, item.name_eng, item.type, item.sort, item.price, item.src);
            GoodInList.render(i, container, this.goodsBase);
            this.valueUp(i, basketContainer);
            this.valueDown(i, basketContainer);
        });
    };
    valueUp(i, basketContainer) {
        let cat = document.querySelector(`#plus${this.goodsBase[i].name_eng}`);
        cat.addEventListener('click', (event) => {
            if (basket.goodsInBasket.includes(this.goodsBase[i])) {
                let basketItemIndex = basket.goodsInBasket.indexOf(this.goodsBase[i]);
                if (!basket.goodsInBasket[basketItemIndex].value) {
                    basket.goodsInBasket[basketItemIndex].value = 1;
                }
                basket.goodsInBasket[basketItemIndex].value++;
            } else {
                basket.goodsInBasket.push(this.goodsBase[i]);
                let basketItemIndex = basket.goodsInBasket.indexOf(this.goodsBase[i]);
                basket.goodsInBasket[basketItemIndex].value = 1;
            };
            basket.reloadBasket(basketContainer);
        })
    };
    valueDown(i, basketContainer) {
        let cat = document.querySelector(`#minus${this.goodsBase[i].name_eng}`);
        cat.addEventListener('click', (event) => {
            if (basket.goodsInBasket.includes(this.goodsBase[i])) {
                let basketItemIndex = basket.goodsInBasket.indexOf(this.goodsBase[i]);
                if (basket.goodsInBasket[basketItemIndex].value > 0) {
                    basket.goodsInBasket[basketItemIndex].value--;
                }
                if (basket.goodsInBasket[basketItemIndex].value === 0) {
                    basket.goodsInBasket.splice(basketItemIndex, 1);
                }
                basket.reloadBasket(basketContainer);
            };
        });
    };
    _fetchGoods() {
        this.goodsBase = [
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
        ]
    };
}

/** Класс Корзины */
class BasketList {
    constructor(container) {
        this.container = container;
        this.goodsInBasket = [];
        this.init('#idBasket');
    };
    init(container) {
        if (this.goodsInBasket.length !== 0) {
            this.goodsInBasket.forEach((item, i) => {
                const GoodInList = new BasketItem(item.name, item.name_eng, item.type, item.sort, item.price, item.value, item.src);
                GoodInList.render(i, container, this.goodsInBasket);
                this.delBasketPosition(i, container);
            })
        }
    };
    delBasketPosition(i, container) {
        let deleteButton = document.querySelector(`#delPos${this.goodsInBasket[i].name_eng}`);
        deleteButton.addEventListener('click', (event) => {
            basket.goodsInBasket.splice(i, 1);
            this.reloadBasket(container);
        })
    };
    dropBasket(container) {
        let dropButton = document.querySelector('#idDropBasketButton');
        dropButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.goodsInBasket.splice(0);
            this.reloadBasket(container);
        })
    };
    reloadBasket(container) {
        let el = document.querySelector(container);
        el.innerHTML = ``;
        this.init(container);
        totalInfoInstance.init('#total', this.goodsInBasket, container);
    };
}

/** Класс для вывода информации о корзине */
class TotalInfo {
    constructor(container, basketContainer) {
        this.container = container;
        this.init('#total', basket.goodsInBasket, basketContainer);
    }
    init(container, list, basketContainer) {
        let total = document.querySelector(container);
        if (list.length === 0) {
            total.innerHTML = ``;
            total.insertAdjacentHTML('afterbegin', `<span class="empty-cart-message">Ваша корзина пуста.</span>`);
        } else {
            this.render(container);
            basket.dropBasket(basketContainer);
        }
    };
    render(container) {
        total.innerHTML = ``;
        total.insertAdjacentHTML('afterbegin',
            `<div class="total-info">
                <p class="in-cart">В корзине:</p>
                <div class = "result-info"><p class="value">Позиций:  ${container.length}</p>
                <p class="total-weight">Общий вес - ${this.countWeight()}кг.</p>
                <p class="total-price">Сумма: ${this.countBasketPrice()} руб.</p></div>
            </div>
            <a href="#" class="button basket__drop-button" id="idDropBasketButton">X</a>`);
    };
    countWeight() {
        return basket.goodsInBasket.reduce((a, { value }) => a + value, 0);
    };
    countBasketPrice() {
        return basket.goodsInBasket.reduce((a, { price, value }) => a + (price * value), 0);
    };

}

const catalog = new CatalogList();
const basket = new BasketList();
const totalInfoInstance = new TotalInfo();



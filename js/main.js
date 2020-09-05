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
    valueUp(i, data) {
        let cat = document.querySelector(`#plus${data[i].name_eng}`);
        cat.addEventListener('click', () => {
            if (basket.goodsInBasket.includes(data[i])) {
                let basketItemIndex = basket.goodsInBasket.indexOf(data[i]);
                if (!basket.goodsInBasket[basketItemIndex].value) {
                    basket.goodsInBasket[basketItemIndex].value = 1;
                }
                basket.goodsInBasket[basketItemIndex].value++;
            } else {
                basket.goodsInBasket.push(data[i]);
                let basketItemIndex = basket.goodsInBasket.indexOf(data[i]);
                basket.goodsInBasket[basketItemIndex].value = 1;
            };
            basket.reloadBasket();
        })
    };
    valueDown(i, data) {
        let cat = document.querySelector(`#minus${data[i].name_eng}`);
        cat.addEventListener('click', () => {
            if (basket.goodsInBasket.includes(data[i])) {
                let basketItemIndex = basket.goodsInBasket.indexOf(data[i]);
                if (basket.goodsInBasket[basketItemIndex].value > 0) {
                    basket.goodsInBasket[basketItemIndex].value--;
                }
                if (basket.goodsInBasket[basketItemIndex].value === 0) {
                    basket.goodsInBasket.splice(basketItemIndex, 1);
                }
                basket.reloadBasket();
            };
        });
    };
};

/* Класс Товар корзины */
class BasketItem extends Item {
    constructor(name, name_eng, type, sort, price, src) {
        super(name, name_eng, type, sort, price, src);
    };
    render(i, container, source) {
        let basket = document.querySelector(container);
        basket.insertAdjacentHTML('beforeend',
            `<div class="good basket__good" id="basket__good">
            <img ${source[i].src} alt="image" class="pruduct-img" width="50" height="37">
            <p class = "good__description">${source[i].name} -- сорт '${source[i].sort}'
                -- цена за кг ${source[i].price} р. -- Количество ${source[i].value}кг.
            </p>
            <button class="button good__button-delete" id="delPos${source[i].name_eng}">Удалить</button>
        </div>`
        );
        return basket;
    };
    btnDeleteBasketPosition(i) {
        let deleteButton = document.querySelector(`#delPos${basket.goodsInBasket[i].name_eng}`);
        deleteButton.addEventListener('click', () => {
            basket.goodsInBasket.splice(i, 1);
            basket.reloadBasket();
        })
    };
};

/** Класс bнициализации блока контента */
class ContentBlock {
    constructor(container = 'body') {
        this.container = container;
        this.searchBlockContainer = '.logo';
        this.catalogContainer = '#idCatalog';
        this.basketContainer = '#idBasket';
        this.totalContaimer = '#total';
        this.render('idCatalog', 'idBasket', 'total', 'logo');
    };
    render(idCatalog, idBasket, total, logo) {
        let header = document.querySelector(this.container);
        header.insertAdjacentHTML('afterbegin',
            `<header class="header">
			    <section class="${logo}">
                    <p class="shop-name">Продукты</p>
                    <!-- Поиск по каталогу -->                   
			    </section>
			    <section class="total" id="${total}"><!-- Общая информация о корзине --></section>
		    </header>`);
        let content = document.querySelector(this.container);
        content.insertAdjacentHTML('beforeend',
            `<section class="content" id="idContent">
            <div class="catalog" id="${idCatalog}">
				<!-- Раздел товаров каталога -->
			</div>
			<div class="basket" id="${idBasket}">
				<!-- Выбранные товары -->
            </div>
            </section>`);
    };
}

/**Класс-посредник для межклассового взаимодействия*/
class ControlBlock {
    renderCatalog(data) {
        catalog.render(data);
    };
    clearCatalog() {
        catalog.clearCatalog();
    };
    totalInfoInstanceInit(data, container) {
        totalInfoInstance.init(data, container);
    };
    dropBasket() {
        basket.dropBasket();
    };
}

/**Поиск по каталогу */
class searchBlock {
    constructor(container = baseSettings.searchBlockContainer) {
        this.container = container;
        this.filtered = [];
        this.render();
        this.init();
    }
    init() {
        let searchButton = document.querySelector('.form__button');
        searchButton.addEventListener('click', (event) => {
            event.preventDefault();
            let string = document.querySelector('.form__input').value;
            this.filter(string);
        })
    };
    render() {
        let searcheInput = document.querySelector(this.container);
        searcheInput.insertAdjacentHTML('beforeend',
            `<form class="example" action="#">
                <input type="text" placeholder="Поиск..." name="search" class="form__input">
                <button type="submit" class="form__button"><i class="fa fa-search"></i></button>
            </form>`)
    };
    filter(value) {
        const regex = new RegExp(value, 'i');
        this.filtered = catalog.goodsBase.filter(product => {
            if (regex.test(product.name) || regex.test((product.sort).replace("\'[А-Яа-яёЁ]+\'", "[А-Яа-яёЁ]+")))
                return true;
        }
        );
        controlBlock.clearCatalog();
        if (this.filtered.length !== 0) {
            controlBlock.renderCatalog(this.filtered);
        } else {
            controlBlock.renderCatalog(catalog.goodsBase);
        }
    };
}
/** Класс Каталога */
class CatalogList {
    constructor(container = baseSettings.catalogContainer, api = 'https://raw.githubusercontent.com/ipoluhin/js1-hw-Dm_Zaitsev/lesson_08/goodsBase/') {
        this.container = container;
        this.API = api;
        this.goodsBase = [];
        this.init();
    };
    init() {
        fetch(`${this.API}goodsBase.json`)
            .then(result => result.json())
            .then(data => {
                this.goodsBase = [...data];
                this.render(this.goodsBase);
            })
            .catch((err => console.log(err)));
    };
    render(data) {
        data.forEach((item, i) => {
            const goodInList = new CatalogItem(item.name, item.name_eng, item.type, item.sort, item.price, item.src);
            goodInList.render(i, this.container, data);
            goodInList.valueUp(i, data);
            goodInList.valueDown(i, data);
        });
    };
    clearCatalog() {
        let catalog = document.querySelector(this.container);
        catalog.innerHTML = '';
    };
}

/** Класс Корзины */
class BasketList {
    constructor(container = baseSettings.basketContainer) {
        this.container = container;
        this.goodsInBasket = [];
        this.init();
    };
    init() {
        if (this.goodsInBasket.length !== 0) {
            this.goodsInBasket.forEach((item, i) => {
                const goodInList = new BasketItem(item.name, item.name_eng, item.type, item.sort, item.price, item.value, item.src);
                goodInList.render(i, this.container, this.goodsInBasket);
                goodInList.btnDeleteBasketPosition(i);
            })
        }
    };
    dropBasket() {
        this.goodsInBasket.splice(0);
        this.reloadBasket();
    };
    reloadBasket() {
        this.clearBasket();
        this.init(this.container);
        controlBlock.totalInfoInstanceInit(this.goodsInBasket, this.container);
    };
    clearBasket() {
        let el = document.querySelector(this.container);
        el.innerHTML = ``;
    };
}

/** Класс для вывода информации о корзине */
class TotalInfo {
    constructor(container = baseSettings.totalContaimer) {
        this.container = container;
        this.init(basket.goodsInBasket);
    }
    init(sourceArray) {
        let total = document.querySelector(this.container);
        if (sourceArray.length === 0) {
            total.innerHTML = ``;
            total.insertAdjacentHTML('afterbegin', `<span class="empty-cart-message">Ваша корзина пуста.</span>`);
        } else {
            this.render(sourceArray);
            this.dropBasket();
        }
    };
    render(sourceArray) {
        let total = document.querySelector(this.container);
        total.innerHTML = ``;
        total.insertAdjacentHTML('afterbegin',
            `<div class="total-info">
                <p class="in-cart">В корзине:</p>
                <div class = "result-info"><p class="value">Позиций:  ${sourceArray.length}</p>
                <p class="total-weight">Общий вес - ${this.countWeight()}кг.</p>
                <p class="total-price">Сумма: ${this.countBasketPrice()} руб.</p></div>
            </div>
            <a href="#" class="button basket__drop-button" id="idDropBasketButton">X</a>`);
    };
    dropBasket() {
        let dropButton = document.querySelector('#idDropBasketButton');
        dropButton.addEventListener('click', (event) => {
            event.preventDefault();
            controlBlock.dropBasket();
        })
    };
    countWeight() {
        return basket.goodsInBasket.reduce((a, { value }) => a + value, 0);
    };
    countBasketPrice() {
        return basket.goodsInBasket.reduce((a, { price, value }) => a + (price * value), 0);
    };
}

const baseSettings = new ContentBlock();
const catalog = new CatalogList();
const basket = new BasketList();
const totalInfoInstance = new TotalInfo();
const searcheInput = new searchBlock();
const controlBlock = new ControlBlock();


import {findItemsByName, itemList} from "./model";
import {saveItemToBasket, getItemsFromBasket, deleteItemsFromBasket} from './storage.js';

const divWrapperWildberries = document.querySelector('.wrapper__wildberies');

const divHeader = document.createElement('div');
divHeader.classList.add('header');
divWrapperWildberries.appendChild(divHeader);

const headerLogo = document.createElement('div');
headerLogo.innerHTML = 'Wildberries';
headerLogo.classList.add('header__logo');
divHeader.appendChild(headerLogo);

headerLogo.addEventListener('click', () => window.location.reload());

export let headerPoisk = document.createElement('input');
headerPoisk.classList.add('header__poisk');
headerPoisk.placeholder = 'Поиск...';
headerPoisk.addEventListener('change', () => {
    findItemsByName(headerPoisk.value);
})
headerPoisk.addEventListener('keyup', () => {
    findItemsByName(headerPoisk.value);
})
divHeader.appendChild(headerPoisk);

const headerShoppingcart = document.createElement('button');
headerShoppingcart.classList.add('header__shopping__cart');
headerShoppingcart.innerHTML = 'Корзина';
divHeader.appendChild(headerShoppingcart);

function modalWindow() {
    headerShoppingcart.addEventListener('click', () => {
        shoppingCart.style.display = 'flex';
        shoppingCart.style.flexDirection = 'column';
        shoppingCart.style.margin = '0 auto';
        showBasket();
    })

    window.onclick = function (event) {
        if (event.target === shoppingCart) {
            shoppingCart.style.display = "none";
            shoppingCart.removeChild(headerShoppingcart);
        }
    }
}
modalWindow();

const shoppingCart = document.createElement('div');
shoppingCart.classList.add('shopping__cart');
divHeader.appendChild(shoppingCart);

function showBasket() {
    shoppingCart.innerHTML = '';
    let items = getItemsFromBasket();
    let finalPrice = 0;

    const shoppingCartTitle = document.createElement('div');
    shoppingCartTitle.classList.add('shopping__cart-title');
    shoppingCart.appendChild(shoppingCartTitle);

    const shoppingCartText = document.createElement('p');
    shoppingCartText.innerHTML = 'Корзина';
    shoppingCartText.classList.add('shopping__cart-text');
    shoppingCartTitle.appendChild(shoppingCartText);

    const shoppingCartDelete = document.createElement('button');
    shoppingCartDelete.classList.add('shopping__cart-delete');
    shoppingCartDelete.innerHTML = 'Очистить корзину';
    shoppingCartDelete.addEventListener('click', () => {
        deleteItemsFromBasket();
    })
    shoppingCartTitle.appendChild(shoppingCartDelete);
    if (items !== null) {
        for (let item of items) {
            const contentWrapper = document.createElement('div');
            contentWrapper.classList.add('content__wrapper');
            shoppingCart.appendChild(contentWrapper);

            const contentText = document.createElement('p');
            contentText.classList.add('content-text');
            contentText.innerHTML = item.name;
            contentWrapper.appendChild(contentText);

            const contentPrice = document.createElement('p');
            contentPrice.classList.add('content-price');
            contentPrice.innerHTML = item.price;
            contentWrapper.appendChild(contentPrice);

            finalPrice = finalPrice + item.price;
        }
    }

    const divTotalWrapper = document.createElement('div');
    divTotalWrapper.classList.add('total__wrapper');
    shoppingCart.appendChild(divTotalWrapper);

    const totalText = document.createElement('p');
    totalText.classList.add('total-text');
    totalText.innerHTML = 'Итого:';
    divTotalWrapper.appendChild(totalText);

    const totalPrice = document.createElement('p');
    totalPrice.classList.add('total-price');
    totalPrice.innerHTML = `${finalPrice}`;
    divTotalWrapper.appendChild(totalPrice);

}

const wrapperCarusel = document.querySelector('.carousel');
divWrapperWildberries.appendChild(wrapperCarusel);


const wrapperHitSales = document.createElement('div');
wrapperHitSales.classList.add('wrapper__hit-sales');
divWrapperWildberries.appendChild(wrapperHitSales);

const hitSales = document.createElement('h2');
hitSales.classList.add('hit-sales');
hitSales.innerHTML = 'Хиты продаж';
wrapperHitSales.appendChild(hitSales);

const wrapperProducts = document.createElement('div');
wrapperProducts.classList.add('wrapper__products');
wrapperHitSales.appendChild(wrapperProducts);

export function showItemList(itemList) {

    wrapperProducts.innerHTML = '';
    itemList.forEach(item => {
        showItem(item);
    });

}

export function showItem(item) {
    const wrapperProduct = document.createElement('div');
    wrapperProduct.classList.add('wrapper__product');
    wrapperProduct.setAttribute('itemId', item.id);
    wrapperProducts.appendChild(wrapperProduct);

    const imageProduct = document.createElement('div');
    imageProduct.classList.add('image__product');
    wrapperProduct.appendChild(imageProduct);

    const image = document.createElement('img');
    image.src = item.image;
    image.classList.add('image');
    imageProduct.appendChild(image);

    const imageBtn = document.createElement('button');
    imageBtn.classList.add('image__btn');
    imageBtn.innerHTML = 'Быстрый просмотр';

    imageBtn.addEventListener('click', () => {
        image.style.width = '200%';
        image.style.height = '200%';
        image.style.zIndex = 100;
        image.style.display = 'flex';
        image.style.flexDirection = 'center';
    })


    imageProduct.appendChild(imageBtn);

    const imageWrapButton = document.createElement('div');
    imageWrapButton.classList.add('image__wrap_botton');
    imageProduct.appendChild(imageWrapButton);

    const imageDiscount = document.createElement('div');
    imageDiscount.classList.add('image__discount');
    imageDiscount.innerHTML = `- ${item.discount * 100} %`;
    imageWrapButton.appendChild(imageDiscount);

    const imageBtnBasket = document.createElement('button');
    imageBtnBasket.classList.add('image__btn-basket');

    imageBtnBasket.addEventListener('click', () => {
        saveItemToBasket(wrapperProduct.getAttribute('itemId'));
    })
    imageWrapButton.appendChild(imageBtnBasket);

    const productPrice = document.createElement('div');
    productPrice.classList.add('product-price');
    wrapperProduct.appendChild(productPrice);

    const price = document.createElement('div');
    price.classList.add('price');
    price.innerHTML = `${item.price} р`;
    productPrice.appendChild(price);

    const priceWithDiscount = document.createElement('div');
    priceWithDiscount.classList.add('price-with-discount');
    priceWithDiscount.innerHTML = `${item.priceWithDiscount} р`;
    productPrice.appendChild(priceWithDiscount);

    const nameProduct = document.createElement('div');
    nameProduct.classList.add('name-product');
    nameProduct.innerHTML = item.name;
    wrapperProduct.appendChild(nameProduct);
}


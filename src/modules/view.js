import {findItemsByName} from "./model";
import {saveItemToBasket, getItemsFromBasket, deleteItemsFromBasket, getItemsQuantity} from './storage.js';

const divWrapperWildberries = document.querySelector('.wrapper__wildberies');

const divHeader = document.createElement('div');
divHeader.classList.add('header');
divWrapperWildberries.appendChild(divHeader);

// Функция, которая будет вызываться при прокрутке
function handleScroll() {
    // Проверяем, насколько прокручена страница по вертикали
    var scrollPosition = window.scrollY;

    // Условие, при котором добавляем класс
    if (scrollPosition > 0) {
    divHeader.classList.add('scrolled');
    } else {
    divHeader.classList.remove('scrolled');
    }
}

// Добавляем прослушиватель события прокрутки
window.addEventListener('scroll', handleScroll);

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

const headerShoppingCart = document.createElement('button');
headerShoppingCart.classList.add('header__shopping__cart');
headerShoppingCart.innerHTML = 'Корзина' + getItemsQuantity();
divHeader.appendChild(headerShoppingCart);

function changeBasketItemCount() {
    document.querySelector('.header__shopping__cart').innerHTML = 'Корзина' + getItemsQuantity();
}

const shoppingWrap = document.createElement('div');
shoppingWrap.classList.add('modal__wrapp');
divWrapperWildberries.appendChild(shoppingWrap);

const shoppingCart = document.createElement('div');
shoppingCart.classList.add('shopping__cart');
shoppingWrap.appendChild(shoppingCart);

// нажать на кнопку, открыть модальное окно корзины
headerShoppingCart.addEventListener('click', () => {
    shoppingWrap.style.display = 'flex';
    showBasket();
})

// щелкнуть на любом месте вне модального, закрыть его
window.addEventListener('click', (event) => {
    if (event.target == shoppingWrap) {
        shoppingWrap.style.display = "none";
    }
})

// показать содержимое корзины
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
        changeBasketItemCount();
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

// карусель - реклама
const wrapperCarusel = document.querySelector('.carousel');
divWrapperWildberries.appendChild(wrapperCarusel);

const wrapperHitSales = document.createElement('div');
wrapperHitSales.classList.add('wrapper__hit-sales');
divWrapperWildberries.appendChild(wrapperHitSales);

const hitSales = document.createElement('h2');
hitSales.classList.add('hit-sales');
hitSales.innerHTML = 'Хиты продаж';
wrapperHitSales.appendChild(hitSales);
// 

const wrapperProducts = document.createElement('div');
wrapperProducts.classList.add('wrapper__products');
wrapperHitSales.appendChild(wrapperProducts);

export function showItemList(itemList) {
    wrapperProducts.innerHTML = '';
    itemList.forEach(item => {
        showItem(item);
    });
}

// создание карточки элемента
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
        modalWrapperImage.style.display = 'block';
    })

    window.addEventListener('click', (event) => {
        if (event.target == modalWrapperImage) {
            modalWrapperImage.style.display = "none";
        }
    })
  
    imageProduct.appendChild(imageBtn);

    const modalWrapperImage = document.createElement('div');
    modalWrapperImage.classList.add('modal__image-wrapp');
    wrapperProduct.append(modalWrapperImage);

    const modalBlock = document.createElement('div');
    modalBlock.classList.add('modal__block');
    modalWrapperImage.appendChild(modalBlock);

    const modalImage = document.createElement('img');
    modalImage.classList.add('modal__image');
    modalImage.src = item.image;
    modalBlock.appendChild(modalImage);

    const modalName = document.createElement('div');
    modalName.classList.add('modal__name');
    modalName.innerHTML = item.name;
    modalBlock.appendChild(modalName);

    const modalPrice = document.createElement('div');
    modalPrice.classList.add('modal__price');
    modalPrice.innerHTML = `${item.priceWithDiscount} p`;
    modalBlock.appendChild(modalPrice);
        
        
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
        changeBasketItemCount();
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


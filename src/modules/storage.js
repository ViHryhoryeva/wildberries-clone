import {getItemById} from "./model";

// сохранить в корзину элементы
export function saveItemToBasket(itemId) {
    let items = JSON.parse(window.localStorage.getItem('basket'));
    if (items == null) {
        items = [];
    } 
    console.log(items.length)
    if (!(items.length >= 5)) {
        let item = getItemById(itemId);
        items.push(item);
        window.localStorage.setItem('basket', JSON.stringify(items));
    }
}

export function getItemsFromBasket() {
    return JSON.parse(window.localStorage.getItem('basket'));
}

// удалить к ворзине все элементы
export function deleteItemsFromBasket() {
    window.localStorage.removeItem('basket');
}

// количество добавленных в корзину элементов
export function getItemsQuantity() {
    let items = JSON.parse(window.localStorage.getItem('basket'));
    if (items == null) {
    return ', ' + 0;
    } else {
        return ', ' + items.length;
    } 
}
import {getItemById} from "./model";

export function saveItemToBasket(itemId) {

    let items = JSON.parse(window.localStorage.getItem('basket'));
    if (items == null) {
        items = [];
    }

    let item = getItemById(itemId);
    items.push(item);
    window.localStorage.setItem('basket', JSON.stringify(items));
}

export function getItemsFromBasket() {
    return JSON.parse(window.localStorage.getItem('basket'));
}

export function deleteItemsFromBasket() {
    window.localStorage.removeItem('basket');
}
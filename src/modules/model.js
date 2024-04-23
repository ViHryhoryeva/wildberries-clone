import { getData } from "./api_client.js";
import { showItemList } from "./view.js";

export let itemList = [];

export function Item(id, name, image, price, discount) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.discount = discount;
    this.priceWithDiscount = price - price * discount;
}

function downloadItemList(name) {
    itemList.length = 0;
    getData(name);
}

export function setItemList(data, name) {

    const regex = new RegExp(name, 'gi');
    console.log(name);
    data.forEach(item => {
        let newItem = new Item(
            item.id,
            item.name,
            item.image,
            item.price,
            item.discount
        );
        if (newItem.name.match(regex)) {
            itemList.push(newItem);
        }
    })

    showItemList(itemList);
}

export function getItemList() {
    downloadItemList('');
    return itemList;
}

export function findItemsByName(name) {
    downloadItemList(name);
}

export function getItemById(itemId) {
    for (let item of itemList) {
        console.log(item)
        if (item.id === itemId) {
            return item;
        }
    }
}
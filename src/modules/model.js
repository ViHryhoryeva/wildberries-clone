import { getData } from "./api_client.js";
import { showItemList } from "./view.js";

// массив элементов
export let itemList = [];

// json конвертируется в структуру Item
export function Item(id, name, image, price, discount) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.price = price;
    this.discount = discount;
    this.priceWithDiscount = price - price * discount;
}
// загрузка списка элементов
function downloadItemList(name) {
    itemList.length = 0;
    getData(name);
}
// получаем из fetch объекты и заполняем ими массив
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
// получить список элементов
export function getItemList() {
    downloadItemList('');
    return itemList;
}
// найти элементы по названию
export function findItemsByName(name) {
    downloadItemList(name);
}
// получить элементы по айди
export function getItemById(itemId) {
    for (let item of itemList) {
        console.log(item)
        if (item.id === itemId) {
            return item;
        }
    }
}
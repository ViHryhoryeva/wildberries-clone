import {Item, itemList, setItemList} from "./model.js";

const api = 'https://661513482fc47b4cf27de9fb.mockapi.io/api/v1/items';


export function getData(name) {

    fetch(api)
        .then(res => res.json())
        .then(data => {
            setItemList(data, name);
        })
}

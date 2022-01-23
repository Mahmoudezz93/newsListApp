import {ADD_ITEM, DELETE_ITEM, SELECT_ITEM, DESELECT_ITEM, SET_CART_ITEMS, } from "./actionTypes";

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        //set item data
        id:item.id,
        name:item.name,
        author:item.author,
        note:item.note,
        title:item.title,           // we will use this to diff the items 
        description:item.description,
        url:item.url,
        urlToImage:item.urlToImage,
        publishedAt:item.publishedAt,
        content:item.content,   
        viewdAt:item.viewedAt
}
};

export const deleteItem = (item) => {
    return {
        type: DELETE_ITEM,
        // id to select item , qty to delete 
        title:item.title
    }
};
export const selectItem = (id) => {
    return {
        type: SELECT_ITEM,
        title: title
    }
};

export const deselectItem = () => {
    return {
        type: DESELECT_ITEM,
    }
};
export const setItems = (items) => {
    return {
        type: SET_CART_ITEMS,
        items: items,
    };

}

     
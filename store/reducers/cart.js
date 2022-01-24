import {
  ADD_ITEM, DELETE_ITEM, SELECT_ITEM, DESELECT_ITEM, SET_CART_ITEMS, DELETE_WISH,

} from "../actions/actionTypes";



let initial_state = {
  items: [],
  selectedItem: null,

}



const cart = (state = initial_state, action) => {

  switch (action.type) {

    /// cart // 
    case ADD_ITEM:
      if (state.items.find((value, index) => { return value.title === action.title }) != null) {
        state.items.filter((value, index) => { if (value.title === action.title) { return value.viewedAt = action.viewedAt  } else { return value.viewedAt = value.viewedAt } })
      }
      return {
        ...state,
        items: state.items.find((value, index) => { return value.title === action.title }) == null ?
          state.items.concat({

            id:action.id,
            name:action.name,
            author:action.author,
            note:action.note,
            title:action.title,           // we will use this to diff the items from each others 
            description:action.description,
            url:action.url,
            urlToImage:action.urlToImage,
            publishedAt:action.publishedAt,
            content:action.content,   
            viewdAt:action.viewedAt
          })
          :
          state.items

      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => {
          return item.title !== action.title;
        }),
        selectedItem: null
      };
    case SELECT_ITEM:
      return {
        ...state,
        selectedItem: state.items.find(item => {
          return item.title === action.title;
        })
      };
    case DESELECT_ITEM:
      return {
        ...state,
        selectedItem: null
      };
    case SET_CART_ITEMS:
      return {
        ...state,
        items: action.items
      };

    default:
      return state;
  }
}
export default cart;

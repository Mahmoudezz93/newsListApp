import {createStore,combineReducers}from "redux";
import cartReducer from './reducers/cart';

const rootReducer =combineReducers({
    cart:cartReducer,

});
const config=()=>{
    return createStore(rootReducer);
}
export default config;
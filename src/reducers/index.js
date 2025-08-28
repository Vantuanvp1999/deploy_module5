import { combineReducers } from "redux";
import { createSelector } from "reselect";

import products, * as fromProducts from "./products";
import cart, * as fromCart from "./cart";

const rootReducer = combineReducers({
  cart,
    products
})
export default rootReducer;

const getAddedIds = state => fromCart.getAddedIds(state.cart)
const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

export const getTotal = state =>
  getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)

export const getCartProducts = createSelector(
  [getAddedIds, (state) => state],
  (addedIds, state) =>
    addedIds.map((id) => ({
      ...getProduct(state, id),
      quantity: getQuantity(state, id),
    }))
);
  
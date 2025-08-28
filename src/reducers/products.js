import { combineReducers } from "redux";
import { createSelector } from "reselect"
import { RECEIVE_PRODUCTS } from "../constants/ActionTypes";

const byId = (state={}, action) =>{
    switch(action.type) {
        case RECEIVE_PRODUCTS:
            return{
                ...state,
                ...action.products.reduce((obj, product) =>{
                    obj[product.id] = product
                    return obj
                },{})
            }
            default:
                return state
    }
}

const visibleIds = (state = [], action) =>{
    switch(action.type) {
        case RECEIVE_PRODUCTS:
            return action.products.map(product=>product.id)
        default:
            return state
    }
}

const rootReducer = combineReducers({
  byId,
  visibleIds
})
export default rootReducer;

export const getProduct = (state, id) => state.byId[id]

const selectById = state => state.byId
const selectVisibleIds = state => state.visibleIds

export const getVisibleProducts = createSelector(
  [selectById, selectVisibleIds],
  (byId, visibleIds) => visibleIds.map(id => byId[id])
)

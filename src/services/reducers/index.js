import { combineReducers } from "redux";
import { burgerDataReducer } from "./burger-data-reducer";
import { ingredientDetailsReducer } from "./ingredient-details-reducer";
import { burgerConstructorReducer } from "./burger-constructor-reducer";
import { orderDetailsReducer } from "./order-details-reducer";
import { authReducer } from "./auth-reducer";
import { wsReducer } from "./ws-reducer";

export const rootReducer = combineReducers({
  burgerData: burgerDataReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  auth: authReducer,
  ws: wsReducer
});

import {combineReducers} from '@reduxjs/toolkit';

import categoriesReducer from './categories.slice';
import categoryAttributesReducer from './categoryAttributes.slice';
import categoryDataReducer from './categoryData.slice';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  categoryAttributes: categoryAttributesReducer,
  categoryData: categoryDataReducer,
});

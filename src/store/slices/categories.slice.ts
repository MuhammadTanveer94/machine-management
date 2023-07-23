import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {Categories, CategoryState} from '../../types';

const initialState: Categories = {};

const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (
      state,
      action: PayloadAction<{id: string; attributeId: string}>,
    ) => {
      const categoryId = action.payload.id;
      state[categoryId] = {
        id: categoryId,
        attributeMapId: categoryId,
        name: '',
        titleAttributeId: '',
      };
    },
    updateCategory: (
      state,
      action: PayloadAction<{
        categoryId: string;
        type: keyof CategoryState;
        value: CategoryState[keyof CategoryState];
      }>,
    ) => {
      const {categoryId, type, value} = action.payload;
      state[categoryId][type] = value;
    },
    deleteCategory: (
      state,
      action: PayloadAction<{
        categoryId: string;
      }>,
    ) => {
      const {categoryId} = action.payload;
      delete state[categoryId];
    },
  },
});

export const {addCategory, updateCategory, deleteCategory} = categories.actions;

export default categories.reducer;

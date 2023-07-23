import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {CategoriesV2, CategoryStateV2} from '../../types';

const initialState: CategoriesV2 = {};

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
        type: keyof CategoryStateV2;
        value: CategoryStateV2[keyof CategoryStateV2];
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

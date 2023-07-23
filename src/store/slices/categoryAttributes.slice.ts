import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AttributeEnum, attributeCategory, attributeState} from '../../types';
import {addCategory, deleteCategory} from './categories.slice';

const initialState: attributeState = {};

const categoryAttributes = createSlice({
  name: 'categoryAttributes',
  initialState,
  reducers: {
    addAttribute: (
      state,
      action: PayloadAction<{
        categoryId: string;
        attributeId: string;
        type: AttributeEnum;
      }>,
    ) => {
      const {categoryId, attributeId, type} = action.payload;
      state[categoryId][attributeId] = {
        categoryMapId: categoryId,
        label: '',
        id: attributeId,
        type: type || AttributeEnum.TEXT,
      };
    },
    updateAttribute: (
      state,
      action: PayloadAction<{
        categoryId: string;
        attributeId: string;
        type: keyof attributeCategory;
        value: attributeCategory[keyof attributeCategory];
      }>,
    ) => {
      const {categoryId, attributeId, type, value} = action.payload;
      state[categoryId][attributeId][type] = value;
    },

    deleteAttribute: (
      state,
      action: PayloadAction<{
        categoryId: string;
        attributeId: string;
      }>,
    ) => {
      const {categoryId, attributeId} = action.payload;
      delete state[categoryId][attributeId];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addCategory, (state, action) => {
        const {id: categoryID, attributeId} = action.payload;
        state[categoryID] = {
          [attributeId]: {
            categoryMapId: categoryID,
            label: '',
            id: attributeId,
            type: AttributeEnum.TEXT,
          },
        };
      })
      .addCase(deleteCategory, (state, action) => {
        const categoryID = action.payload.categoryId;
        delete state[categoryID];
      });
  },
});

export const {addAttribute, updateAttribute, deleteAttribute} =
  categoryAttributes.actions;

export default categoryAttributes.reducer;

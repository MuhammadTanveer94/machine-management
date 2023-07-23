import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AttributeEnum, categoryDataState} from '../../types';
import {addCategory, deleteCategory} from './categories.slice';
import utilService from '../../utils/util.service';
import {
  addAttribute,
  deleteAttribute,
  updateAttribute,
} from './categoryAttributes.slice';

const {generateUniqueId} = utilService;

const initialState: categoryDataState = {};

const categoryData = createSlice({
  name: 'categoryData',
  initialState,
  reducers: {
    addCategoryData: (
      state,
      action: PayloadAction<{
        categoryId: string;
      }>,
    ) => {
      const uniqueId = generateUniqueId();
      const {categoryId} = action.payload;
      state[categoryId].categoryData = {
        ...state[categoryId].categoryData,
        [uniqueId]: {
          id: uniqueId,
          categoryMapId: categoryId,
          fieldId: uniqueId,
        },
      };
    },
    updateCategoryData: (
      state,
      action: PayloadAction<{
        categoryId: string;
        attributeId: string;
        fieldId: string;
        value: string | boolean | number;
      }>,
    ) => {
      const {categoryId, attributeId, fieldId, value} = action.payload;
      state[categoryId].attributes[attributeId][fieldId] = value;
    },

    deleteCategoryData: (
      state,
      action: PayloadAction<{
        categoryId: string;
        id: string;
      }>,
    ) => {
      const {categoryId, id} = action.payload;
      delete state[categoryId].categoryData[id];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addAttribute, (state, action) => {
        const {categoryId, attributeId} = action.payload;
        state[categoryId] = {
          ...state[categoryId],
          attributes: {
            ...(state[categoryId]?.attributes ?? {}),
            [attributeId]: {
              id: attributeId,
            },
          },
        };
      })
      .addCase(addCategory, (state, action) => {
        const {id: categoryId, attributeId} = action.payload;
        state[categoryId] = {
          ...state[categoryId],
          attributes: {
            ...(state[categoryId]?.attributes ?? {}),
            [attributeId]: {
              id: attributeId,
            },
          },
        };
      })
      .addCase(updateAttribute, (state, action) => {
        const {categoryId, attributeId} = action.payload;
        state[categoryId].attributes[attributeId] = {id: attributeId};
      })
      .addCase(deleteAttribute, (state, action) => {
        const {categoryId, attributeId} = action.payload;
        delete state[categoryId].attributes[attributeId];
      })
      .addCase(deleteCategory, (state, action) => {
        const {categoryId} = action.payload;
        delete state[categoryId];
      });
  },
});

export const {addCategoryData, updateCategoryData, deleteCategoryData} =
  categoryData.actions;

export default categoryData.reducer;

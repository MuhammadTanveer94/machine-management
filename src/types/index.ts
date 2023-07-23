export type CategoryStateV2 = {
  id: string;
  name: string | undefined;
  attributeMapId: string | undefined;
  titleAttributeId: string | undefined;
};
export type CategoriesV2 = Record<string, CategoryStateV2>;

export type attributeState = Record<string, attributesV2>;

export type attributeCategory = {
  id: string;
  label: string | undefined;
  categoryMapId: string;
  type: AttributeType;
};
export type attributesV2 = Record<string, attributeCategory>;

export type categoryDataState = Record<string, categoryDataItems>;
export type categoryDataItems = {
  categoryData: Record<string, categoryData>;
  attributes: categoryDataAttributeData;
};

export type categoryDataAttributeData = Record<
  string,
  {
    id: string;
    [key: string]: string | Boolean | number | undefined;
  }
>;

export type categoryData = {
  id: string;
  categoryMapId: string;
  fieldId: string;
};

export type CategoryState = {
  categories: Categories;
  categoryAttributes: Array<CategoryData>;
};
export type Categories = Record<string, Category>;

export type Category = {
  id: string;
  name: string;
  title: string;
  titleFieldId: string | undefined; // primary key for the field
  attributes: Record<string, Attribute>;
};

export type Attribute = {
  id: string;
  label: string;
  type: AttributeType;
  [key: string]: any;
};

export type AttributeType =
  | AttributeEnum.CHECKBOX
  | AttributeEnum.TEXT
  | AttributeEnum.DATE
  | AttributeEnum.NUMBER;

export enum AttributeEnum {
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  NUMBER = 'number',
}

export type CategoryData = {
  id: string;
  categoryId: string;
  fields: Array<CategoryDataField>;
};

export type CategoryDataField = {
  id: string;
  attributeId: string;
  value: number | boolean | Date | string;
};

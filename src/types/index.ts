export type CategoryState = {
  id: string;
  name: string | undefined;
  attributeMapId: string | undefined;
  titleAttributeId: string | undefined;
};
export type Categories = Record<string, CategoryState>;

export type attributeState = Record<string, attributes>;

export type attributeCategory = {
  id: string;
  label: string | undefined;
  categoryMapId: string;
  type: AttributeType;
};
export type attributes = Record<string, attributeCategory>;

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

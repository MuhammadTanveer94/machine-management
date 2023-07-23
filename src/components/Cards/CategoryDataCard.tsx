import React from 'react';
import {Card} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {shallowEqual, useDispatch} from 'react-redux';

import {
  deleteCategoryData,
  updateCategoryData,
} from '../../store/slices/categoryData.slice';
import Switch from '../Switch';
import TextInput from '../TextInput';
import Button from '../Button/Button';
import {useTypedSelector} from '../../hooks';
import DatePicker from '../DatePicker/DatePicker';
import {AttributeEnum, attributeCategory, categoryData} from '../../types';
import dateTimeService from '../../utils/dataTime.service';

const {timeFormat, isInvalidDate} = dateTimeService;

const CategoryDataCard: React.FC<categoryData & {index: number}> = ({
  id,
  categoryMapId,
  fieldId,
  index,
}) => {
  const dispatch = useDispatch();
  const {title, attributes, fieldsValueAttribute} = useTypedSelector(
    ({categories, categoryAttributes, categoryData}) => {
      const titleId = categories[categoryMapId as string].titleAttributeId;
      const results = {
        title:
          categoryData[categoryMapId as string]?.attributes[
            titleId as string
          ]?.[fieldId] || '',
        attributes: Object.values(
          categoryAttributes[categoryMapId as string] ?? {},
        ) as Array<attributeCategory>,
        fieldsValueAttribute: categoryData[categoryMapId as string].attributes,
      };
      return results;
    },
    shallowEqual,
  );
  const onRemoveHandler = () => {
    dispatch(
      deleteCategoryData({
        categoryId: categoryMapId as string,
        id: id as string,
      }),
    );
  };

  const onUpdateHandler = (attributeId: string, value: string | boolean) => {
    dispatch(
      updateCategoryData({
        categoryId: categoryMapId as string,
        attributeId,
        fieldId,
        value,
      }),
    );
  };
  return (
    <Card elevation={0} style={styles.cardContainer}>
      <Card.Title
        title={
          title
            ? isInvalidDate(title)
              ? title
              : timeFormat(title)
            : `Unnamed category Title ${index + 1}`
        }
        titleVariant="titleLarge"
        titleStyle={styles.textStyle}
      />
      <Card.Content style={{rowGap: 8}}>
        {attributes.map(({type, id, label}) => {
          switch (type) {
            case AttributeEnum.CHECKBOX:
              return (
                <Switch
                  label={label || 'Unnamed'}
                  value={fieldsValueAttribute[id][fieldId] || false}
                  onValueChange={value => onUpdateHandler(id as string, value)}
                />
              );
            case AttributeEnum.DATE:
              return (
                <DatePicker
                  label={label || 'Unnamed'}
                  value={fieldsValueAttribute[id][fieldId] || false}
                  onValueChange={value => onUpdateHandler(id as string, value)}
                />
              );
            case AttributeEnum.NUMBER:
              return (
                <TextInput
                  label={label || 'Unnamed'}
                  keyboardType="numeric"
                  value={fieldsValueAttribute[id][fieldId] || false}
                  onChangeText={value => onUpdateHandler(id as string, value)}
                />
              );
            case AttributeEnum.TEXT:
              return (
                <TextInput
                  label={label || 'Unnamed'}
                  value={fieldsValueAttribute[id][fieldId] || false}
                  onChangeText={value => onUpdateHandler(id as string, value)}
                />
              );
          }
        })}
      </Card.Content>
      <View style={styles.bottomContainer}>
        <Button
          mode="outlined"
          icon="delete"
          uppercase
          style={styles.deleteBtnStyle}
          onPress={onRemoveHandler}>
          Remove
        </Button>
      </View>
    </Card>
  );
};

export default CategoryDataCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexBasis: 300,
    flexGrow: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    fontWeight: '700',
  },
  bottomContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 2,
    marginBottom: 15,
  },
  deleteBtnStyle: {
    borderWidth: 0,
  },
});

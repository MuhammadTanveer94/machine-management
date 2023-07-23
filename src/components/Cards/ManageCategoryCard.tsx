import React from 'react';
import {Card} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {shallowEqual, useDispatch} from 'react-redux';

import Menu from '../Menu/Menu';
import TextInput from '../TextInput';
import Button from '../Button/Button';
import {AttributeType} from '../../types';
import {
  deleteCategory,
  updateCategory,
} from '../../store/slices/categories.slice';
import {useTypedSelector} from '../../hooks';
import utilService from '../../utils/util.service';
import TextInputWithDelete from '../TextInput/TextInputWithDelete';
import {addAttribute} from '../../store/slices/categoryAttributes.slice';

const {generateUniqueId} = utilService;

const ManageCategoryCard: React.FC<{id: string}> = ({id}) => {
  const dispatch = useDispatch();

  const {name, titleName, attributes} = useTypedSelector(
    ({categories, categoryAttributes}) => {
      const category = categories[id];
      const result = {
        titleName:
          categoryAttributes[id][category?.titleAttributeId as string]?.label ||
          '',
        ...category,
        attributes: Object.values(categoryAttributes[id]) || [],
      };
      return result;
    },
    shallowEqual,
  );

  const addAttributeHandler = (type: AttributeType) => {
    const attributeId = generateUniqueId();
    dispatch(
      addAttribute({categoryId: id, attributeId: attributeId, type: type}),
    );
  };

  return (
    <Card elevation={0} style={styles.cardContainer}>
      <Card.Title
        title={name || 'Unnamed Category'}
        titleVariant="titleLarge"
        titleStyle={styles.textStyle}
      />
      <Card.Content>
        <TextInput
          value={name}
          onChangeText={value =>
            dispatch(updateCategory({categoryId: id, type: 'name', value}))
          }
        />
        {attributes.map(item => (
          <TextInputWithDelete
            item={item}
            key={item.id}
            titleName={titleName}
            disabled={attributes.length <= 1}
          />
        ))}
      </Card.Content>
      <Card.Actions>
        <View style={{flex: 1}}>
          <Menu
            itemType={
              attributes.length > 1
                ? attributes?.map(({label, id}, index) => ({
                    name: label || `Unnamed field ${index + 1}`,
                    value: id || '',
                  }))
                : []
            }
            onPressMenu={(titleAttributeId: string) => {
              dispatch(
                updateCategory({
                  categoryId: id,
                  type: 'titleAttributeId',
                  value: titleAttributeId,
                }),
              );
            }}>
            <Button uppercase style={styles.btnStyle}>
              {`Title Field: ${titleName || 'UNNAMED FIELD'}`}
            </Button>
          </Menu>
        </View>
      </Card.Actions>
      <View style={styles.bottomContainer}>
        <View>
          <Menu onPressMenu={addAttributeHandler}>
            <Button mode="outlined" uppercase>
              add new field
            </Button>
          </Menu>
        </View>
        <Button
          mode="outlined"
          icon="delete"
          uppercase
          onPress={() => dispatch(deleteCategory({categoryId: id}))}
          style={styles.deleteBtnStyle}>
          Remove
        </Button>
      </View>
    </Card>
  );
};

export default ManageCategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexBasis: 300,
    flexGrow: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    fontWeight: '700',
  },
  btnStyle: {},
  bottomContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 2,
    marginBottom: 15,
  },
  deleteBtnStyle: {
    borderWidth: 0,
  },
});

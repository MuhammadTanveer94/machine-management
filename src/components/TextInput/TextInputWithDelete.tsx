import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import TextInput from '.';
import Button from '../Button/Button';
import IconButton from '../Button/IconButton';
import Menu from '../Menu/Menu';
import {AttributeType, attributeCategory} from '../../types';
import {useDispatch} from 'react-redux';
import {
  updateAttribute,
  deleteAttribute,
} from '../../store/slices/categoryAttributes.slice';
import {updateCategory} from '../../store/slices/categories.slice';

const TextInputWithDelete = ({
  item,
  disabled = false,
  titleName,
}: {
  titleName: string | undefined;
  btnText?: string;
  item: attributeCategory;
  disabled?: boolean;
}) => {
  const dispatch = useDispatch();

  const onChangeTextHandler = (value: string) => {
    updateTitleName(value);
    dispatch(
      updateAttribute({
        attributeId: item.id as string,
        categoryId: item.categoryMapId as string,
        type: 'label',
        value,
      }),
    );
  };

  const updateTitleName = (value: string) => {
    if (!titleName && (item.label || value)) {
      dispatch(
        updateCategory({
          categoryId: item.categoryMapId as string,
          type: 'titleAttributeId',
          value: item.id as string,
        }),
      );
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={{flex: 1}}
        label="Field"
        value={item.label}
        onFocus={updateTitleName}
        onChangeText={onChangeTextHandler}
      />
      <Menu
        onPressMenu={(value: AttributeType) => {
          dispatch(
            updateAttribute({
              attributeId: item.id as string,
              categoryId: item.categoryMapId as string,
              type: 'type',
              value,
            }),
          );
        }}>
        <Button mode="outlined" uppercase style={styles.btnStyle}>
          {item.type}
        </Button>
      </Menu>
      <IconButton
        icon="delete"
        style={styles.delBtn}
        disabled={disabled}
        onPress={() =>
          dispatch(
            deleteAttribute({
              attributeId: item.id as string,
              categoryId: item.categoryMapId as string,
            }),
          )
        }
      />
    </View>
  );
};

export default TextInputWithDelete;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 5,
  },
  btnStyle: {
    marginTop: 5,
    flex: 1,
    paddingTop: 5,
  },
  delBtn: {
    alignSelf: 'center',
  },
});

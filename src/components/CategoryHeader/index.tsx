import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';

import Button from './../../components/Button/Button';
import {addCategoryData} from '../../store/slices/categoryData.slice';
import {useDispatch} from 'react-redux';

type HeaderProps = {
  title: string;
  id: string;
};

const CategoryHeader: React.FC<HeaderProps> = ({title, id}) => {
  const dispatch = useDispatch();
  const addCategoryDataHandler = () => {
    dispatch(addCategoryData({categoryId: id}));
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="titleMedium">{title || 'Unnamed Category'}</Text>
        <Button onPress={addCategoryDataHandler}>Add New Item</Button>
      </View>
      <Divider style={styles.separator} />
    </View>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 8,
  },
});

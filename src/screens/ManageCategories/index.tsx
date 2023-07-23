import {StyleSheet, Text, View, FlatList} from 'react-native';
import {shallowEqual, useDispatch} from 'react-redux';
import React from 'react';

import Button from './../../components/Button/Button';
import {useTypedSelector} from '../../hooks';
import ManageCategoryCard from '../../components/Cards/ManageCategoryCard';
import utilService from '../../utils/util.service';
import {addCategory} from '../../store/slices/categories.slice';

const {generateUniqueId} = utilService;

const ManageCategories = () => {
  const dispatch = useDispatch();
  const {categoriesArray} = useTypedSelector(({categories}) => {
    const result = {
      categoriesArray: Object.keys(categories),
    };
    return result;
  }, shallowEqual);
  const addNewCategory = () => {
    const uniqueId = generateUniqueId();
    const attributeId = generateUniqueId();
    dispatch(addCategory({id: uniqueId, attributeId: attributeId}));
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <FlatList
          data={categoriesArray}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item}
          ItemSeparatorComponent={() => <View style={{marginBottom: 10}} />}
          renderItem={({item}) => <ManageCategoryCard id={item} />}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button onPress={addNewCategory}>Add Category</Button>
      </View>
    </View>
  );
};

export default ManageCategories;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  footerContainer: {
    marginTop: 20,
  },
});

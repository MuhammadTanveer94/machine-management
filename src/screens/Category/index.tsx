import {StyleSheet, View, FlatList} from 'react-native';
import React from 'react';
import CategoryDataCard from '../../components/Cards/CategoryDataCard';
import {useTypedSelector} from '../../hooks';

import {shallowEqual} from 'react-redux';
import {CategoryState, categoryData} from '../../types';
import CategoryHeader from '../../components/CategoryHeader';

const Category = ({route}) => {
  const {id, name} = (route?.params as CategoryState) ?? {};
  const categoryList = useTypedSelector(({categoryData}) => {
    return Object.values(
      categoryData[id as string]?.categoryData ?? {},
    ) as Array<categoryData>;
  }, shallowEqual);

  return (
    <View style={styles.cardContainer}>
      <CategoryHeader title={name || 'Unnamed Category'} id={id as string} />
      <View style={{marginBottom: 40, paddingHorizontal: 12}}>
        <FlatList
          data={categoryList}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id ?? ''}
          ItemSeparatorComponent={() => <View style={{marginBottom: 10}} />}
          renderItem={({item, index}) => (
            <CategoryDataCard {...item} index={index} />
          )}
        />
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 22,
  },
  textStyle: {
    fontWeight: '700',
  },
  headerContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

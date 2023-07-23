import React from 'react';
import {MD3Colors, Text} from 'react-native-paper';
import {StyleSheet, View, ScrollView, SectionList} from 'react-native';

import {useTypedSelector} from '../../hooks';
import RouteConstants from '../../routes/constants';
import Button from './../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import ManageCategoryCard from '../../components/Cards/ManageCategoryCard';
import {shallowEqual} from 'react-redux';
import {categoryData} from '../../types';
import CategoryHeader from '../../components/CategoryHeader';
import CategoryDataCard from '../../components/Cards/CategoryDataCard';

const {PATH} = RouteConstants;

const Dashboard = () => {
  const {navigate} = useNavigation();
  const sectionListData = useTypedSelector(({categories, categoryData}) => {
    const titles = Object.values(categories);
    return titles.map(title => {
      const {id} = title;
      return {
        title,
        data: Object.values(
          categoryData[id as string]?.categoryData ?? {},
        ) as Array<categoryData>,
      };
    });
  }, shallowEqual);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sectionListData}
        contentContainerStyle={styles.contentStyle}
        renderSectionHeader={({section: {title}}) => {
          return (
            <CategoryHeader
              title={title.name || 'Unnamed Category'}
              id={title.id as string}
            />
          );
        }}
        renderSectionFooter={({section: {data}}) => {
          if (!data.length) {
            return (
              <View style={styles.renderEmptyItem}>
                <Text variant="labelMedium">No items to display</Text>
              </View>
            );
          }
          return null;
        }}
        renderItem={({item, index}) => (
          <CategoryDataCard {...item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item.id ?? ''}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="titleMedium" style={styles.emptyText}>
              No categories found
            </Text>
            <Button onPress={() => navigate(PATH.MANAGE_CATEGORIES)}>
              Add Category
            </Button>
          </View>
        }
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  contentStyle: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginBottom: 10,
  },
  renderEmptyItem: {
    alignItems: 'center',
  },
  separator: {
    marginBottom: 10,
  },
});

import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import RouteContants from './constants';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {Text, useTheme} from 'react-native-paper';
import {useTypedSelector} from '../hooks';
import {shallowEqual} from 'react-redux';

const {DRAWER_ITEMS} = RouteContants;

const DrawerContent = props => {
  const theme = useTheme();
  const {navigate} = useNavigation();

  const {routes, index} = props.state;
  const focusedRoute = routes[index];

  const categories = useTypedSelector(({categories}) => {
    return Object.values(categories);
  }, shallowEqual);

  const onNavigateHandler = (Path: string, params: object = {}) => {
    navigate(Path, params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
        <View>
          {DRAWER_ITEMS.map((item, index) => {
            return item.hasMultiple ? (
              categories.map((categories, index) => (
                <DrawerItem
                  key={categories.id}
                  label={({color, focused}) => {
                    return (
                      <Text variant="titleMedium" style={{color}}>
                        {categories.name || `Unnamed Category ${index + 1}`}
                      </Text>
                    );
                  }}
                  activeTintColor={'#fff'}
                  onPress={() => onNavigateHandler(item.route, categories)}
                  focused={
                    focusedRoute.name === item.route &&
                    categories?.id == focusedRoute?.params?.id
                  }
                  activeBackgroundColor={theme.colors.primary}
                />
              ))
            ) : (
              <DrawerItem
                key={index}
                label={({color}) => (
                  <Text variant="titleMedium" style={{color}}>
                    {item.drawerLabel}
                  </Text>
                )}
                activeTintColor={'#fff'}
                focused={focusedRoute.name === item.route}
                onPress={() => onNavigateHandler(item.route)}
                activeBackgroundColor={theme.colors.primary}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

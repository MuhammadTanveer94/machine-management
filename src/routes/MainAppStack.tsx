import React from 'react';
import {StyleSheet} from 'react-native';
import {MD3Colors, useTheme} from 'react-native-paper';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RouteConstants from './constants';

const {Navigator, Screen} = createNativeStackNavigator();

const {PATH} = RouteConstants;

type RouteParams = {
  name?: string;
};

const MainAppStack = () => {
  const {dispatch} = useNavigation();
  const theme = useTheme();

  const DrawerIcon = () => (
    <EntypoIcon
      name="menu"
      size={30}
      color={theme.colors.primary}
      onPress={() => dispatch(DrawerActions.openDrawer())}
    />
  );
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: MD3Colors.neutral95,
        },
      }}
      initialRouteName={PATH.MANAGE_CATEGORIES}>
      <Screen
        name={PATH.DASHBOARD}
        options={{
          headerShown: true,
          title: 'Dashboard',
          headerTitleAlign: 'center',
          headerLeft: DrawerIcon,
        }}
        getComponent={() => require('../screens/Dashboard').default}
      />

      <Screen
        name={PATH.CATEGORY}
        options={({route: {params: {name = 'Category'} = {}} = {}}) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: name,
          headerLeft: DrawerIcon,
        })}
        getComponent={() => require('../screens/Category').default}
      />
      <Screen
        name={PATH.MANAGE_CATEGORIES}
        options={{
          headerShown: true,
          title: 'Manage Categories',
          headerTitleAlign: 'center',
          headerLeft: DrawerIcon,
        }}
        getComponent={() => require('../screens/ManageCategories').default}
      />
    </Navigator>
  );
};

export default MainAppStack;

const styles = StyleSheet.create({});

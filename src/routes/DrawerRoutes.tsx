import React from 'react';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';

import RouteConstants from './constants';
import DrawerContent from './DrawerContent';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const {Navigator, Screen} = createDrawerNavigator();

const {PATH} = RouteConstants;

const DrawerRoutes = () => {
  const {dispatch} = useNavigation();
  const theme = useTheme();

  const DrawerIcon = () => (
    <EntypoIcon
      name="menu"
      size={30}
      color={theme.colors.primary}
      onPress={() => dispatch(DrawerActions.openDrawer())}
      style={styles.icon}
    />
  );
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerPosition: 'left',
        lazy: true,
      }}
      backBehavior="history"
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName={PATH.DASHBOARD}>
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
        name={PATH.MANAGE_CATEGORIES}
        options={{
          headerShown: true,
          title: 'Manage Categories',
          headerTitleAlign: 'center',
          headerLeft: DrawerIcon,
        }}
        getComponent={() => require('../screens/ManageCategories').default}
      />
      <Screen
        name={PATH.CATEGORY}
        options={({route: {params: {name = 'Category'} = {}} = {}}) => ({
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitle: name,
          headerLeft: DrawerIcon,
        })}
        getId={({params}) => params?.id}
        getComponent={() => require('../screens/Category').default}
      />
    </Navigator>
  );
};

export default DrawerRoutes;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
});

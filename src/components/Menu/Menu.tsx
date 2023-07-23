import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Menu as RnMenu} from 'react-native-paper';

import MenuContacts from './constants';

const {types} = MenuContacts;

type ChildrenComponentProps = {
  onPress: () => void;
};

type MenuProps = {
  children: React.ReactNode;
  itemType: MenuItem[];
  onPressMenu: (val: string) => void;
};

type MenuItem = {
  [key: string]: string;
};

const Menu: React.FC<MenuProps> = ({
  children,
  itemType = types,
  onPressMenu = () => {},
}) => {
  const [visible, setVisible] = useState(false);
  const toggleMenu = () => setVisible(prev => !prev);

  const ChildrenWithProps = () => {
    if (React.isValidElement<ChildrenComponentProps>(children)) {
      return React.cloneElement(children, {onPress: toggleMenu});
    }
  };
  return (
    <RnMenu
      visible={visible}
      onDismiss={toggleMenu}
      anchor={ChildrenWithProps()}>
      {itemType.map((att: MenuItem) => (
        <RnMenu.Item
          onPress={() => {
            onPressMenu(att.value);
            toggleMenu();
          }}
          title={att.name}
          key={att.value}
          titleStyle={styles.textUpperCase}
        />
      ))}
    </RnMenu>
  );
};

export default Menu;

const styles = StyleSheet.create({
  textUpperCase: {
    textTransform: 'uppercase',
  },
});

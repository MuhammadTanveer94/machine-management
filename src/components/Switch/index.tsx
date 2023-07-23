import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Switch as RNSwitch, SwitchProps, Text} from 'react-native-paper';

const Switch: React.FC<SwitchProps> = ({
  value = false,
  onValueChange,
  style,
  disabled,
  label = '',
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <RNSwitch
        {...rest}
        value={value}
        style={style}
        onValueChange={onValueChange}
        disabled={disabled}
      />
      <Text variant="titleSmall">{label}</Text>
    </View>
  );
};

export default Switch;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

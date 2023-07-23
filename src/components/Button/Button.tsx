import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Button as RNButton, ButtonProps} from 'react-native-paper';

const Button: React.FC<ButtonProps> = ({
  mode = 'contained',
  children,
  loading,
  style,
  ...rest
}) => (
  <RNButton
    mode={mode}
    loading={loading}
    style={[styles.btnStyle, style]}
    {...rest}>
    {children}
  </RNButton>
);

export default Button;

const styles = StyleSheet.create<any>({
  btnStyle: {
    borderRadius: 5,
  },
});

import * as React from 'react';
import {
  IconButton as RNButton,
  IconButtonProps,
  MD3Colors,
} from 'react-native-paper';

const IconButton: React.FC<IconButtonProps> = ({
  mode = 'contained',
  onPress,
  iconColor = MD3Colors.neutralVariant0,
  ...rest
}) => (
  <RNButton mode={mode} onPress={onPress} iconColor={iconColor} {...rest} />
);

export default IconButton;

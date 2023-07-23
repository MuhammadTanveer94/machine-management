import * as React from 'react';
import {TextInput as RNTextInput, TextInputProps} from 'react-native-paper';

const TextInput: React.FC<TextInputProps> = ({
  value = '',
  onChangeText,
  style,
  disabled,
  mode = 'outlined',
  keyboardType = 'default',
  label = 'Category Name',
  ...rest
}) => {
  return (
    <RNTextInput
      value={value}
      label={label}
      mode={mode}
      onChangeText={onChangeText}
      style={style}
      keyboardType={keyboardType}
      disabled={disabled}
      {...rest}
    />
  );
};

export default TextInput;

import {TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import {DatePickerModal} from 'react-native-paper-dates';

import TextInput from '../TextInput';
import dateTimeService from '../../utils/dataTime.service';

const {timeFormat} = dateTimeService;

const DatePicker = ({value, onValueChange, label = ''}) => {
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    params => {
      setOpen(false);
      onValueChange(params.date);
    },
    [setOpen],
  );
  return (
    <TouchableOpacity onPress={() => setOpen(true)}>
      <>
        <TextInput editable={false} value={timeFormat(value)} label={label} />
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={value}
          onConfirm={onConfirmSingle}
        />
      </>
    </TouchableOpacity>
  );
};

export default DatePicker;

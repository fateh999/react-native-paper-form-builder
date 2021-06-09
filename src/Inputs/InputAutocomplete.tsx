import React, {Fragment, useMemo, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {
  TouchableRipple,
  useTheme,
  TextInput,
  HelperText,
} from 'react-native-paper';
import AutoComplete from '../Components/AutoComplete';
import {InputAutocompleteProps} from '../Types/Types';

function InputAutocomplete(props: InputAutocompleteProps) {
  const {formState, field, textInputProps, options, CustomAutoComplete} = props;
  const theme = useTheme();
  const errorMessage = formState.errors?.[field.name]?.message;
  const textColor = errorMessage ? theme.colors.error : theme.colors.text;
  const [visible, setVisible] = useState(false);
  const AUTOCOMPLETE = CustomAutoComplete ?? AutoComplete;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        textInputStyle: {
          color: textColor,
        },
      }),
    [textColor],
  );

  return (
    <Fragment>
      <TouchableRipple
        onPress={() => {
          Keyboard.dismiss();
          setVisible(true);
        }}>
        <View pointerEvents={'none'}>
          <TextInput
            ref={field.ref}
            mode={'outlined'}
            error={errorMessage ? true : false}
            onFocus={() => {
              Keyboard.dismiss();
              setVisible(true);
            }}
            {...textInputProps}
            value={
              options.find(({value}) => `${value}` === `${field.value}`)?.label
            }
            style={[styles.textInputStyle, textInputProps?.style]}
          />
        </View>
      </TouchableRipple>
      <AUTOCOMPLETE
        visible={visible}
        setVisible={setVisible}
        options={options}
        field={field}
        textInputProps={textInputProps}
      />
      {errorMessage && <HelperText type={'error'}>{errorMessage}</HelperText>}
    </Fragment>
  );
}

export default InputAutocomplete;

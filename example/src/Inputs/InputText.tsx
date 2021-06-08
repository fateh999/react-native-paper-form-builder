import React, {Fragment, useMemo} from 'react';
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from 'react-hook-form';
import {Platform, StyleSheet} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

type InputTextProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: Omit<TextInputProps, 'theme'>;
};

function InputText(props: InputTextProps) {
  const {formState, field, textInputProps} = props;
  const errorMessage = formState.errors?.[field.name]?.message;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        textInputStyle: {
          fontSize: 16,
          paddingHorizontal: 10,
          paddingBottom: Platform.OS === 'ios' ? 8.3 / 2 : 0,
          paddingVertical: Platform.OS === 'ios' ? 8.3 / 2 : 0,
          textAlignVertical: 'center',
        },
      }),
    [],
  );

  return (
    <Fragment>
      <TextInput
        mode={'outlined'}
        {...textInputProps}
        ref={field.ref}
        value={field.value}
        error={errorMessage ? true : false}
        onChangeText={text => field.onChange(text)}
        style={[styles.textInputStyle, textInputProps?.style]}
      />

      {errorMessage && <HelperText type={'error'}>{errorMessage}</HelperText>}
    </Fragment>
  );
}

export default InputText;

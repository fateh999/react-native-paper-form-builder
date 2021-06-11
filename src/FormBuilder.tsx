import React, {Fragment} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import Logic from './Logic/Logic';
import {FormBuilderProps} from './Types/Types';

function FormBuilder(props: FormBuilderProps) {
  const currentTheme = useTheme();
  const {
    formConfigArray,
    theme = currentTheme,
    control,
    setFocus,
    inputSpacing,
  } = props;

  return (
    <Fragment>
      {formConfigArray.map((item, index) => (
        <Fragment key={index}>
          <Logic
            {...item}
            control={control}
            textInputProps={{
              onSubmitEditing:
                item.textInputProps?.onSubmitEditing ??
                (() => {
                  if (index !== formConfigArray.length - 1) {
                    if (
                      setFocus &&
                      formConfigArray[index + 1].type !== 'custom'
                    ) {
                      setFocus(formConfigArray[index + 1].name);
                    }
                  }
                }),
              returnKeyType:
                index !== formConfigArray.length - 1 ? 'next' : 'done',
              theme: theme,
              ...item.textInputProps,
            }}
          />
          <View style={{height: item?.inputSpacing ?? inputSpacing ?? 15}} />
        </Fragment>
      ))}
    </Fragment>
  );
}

export default FormBuilder;

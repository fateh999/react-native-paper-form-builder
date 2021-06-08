import React, {Fragment} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {Theme} from 'react-native-paper/lib/typescript/types';
import Logic, {LogicProps} from './Logic/Logic';

type $DeepPartial<T> = {[P in keyof T]?: $DeepPartial<T[P]>};
type FormBuilderProps = {
  formConfigArray: Array<LogicProps>;
  inputSpacing?: number;
  theme?: $DeepPartial<Theme>;
};

function FormBuilder(props: FormBuilderProps) {
  const currentTheme = useTheme();
  const {formConfigArray, inputSpacing = 15, theme = currentTheme} = props;

  return (
    <Fragment>
      {formConfigArray.map((item, index) => (
        <Fragment key={index}>
          <Logic
            {...item}
            textInputProps={{
              ...item.textInputProps,
              onSubmitEditing:
                item.textInputProps?.onSubmitEditing ??
                (() => {
                  if (index !== formConfigArray.length - 1) {
                    if (
                      item?.setFocus &&
                      formConfigArray[index + 1].type !== 'custom'
                    ) {
                      item.setFocus(formConfigArray[index + 1].name);
                    }
                  }
                }),
              returnKeyType:
                index !== formConfigArray.length - 1 ? 'next' : 'done',
              theme: theme,
            }}
          />
          <View style={{height: inputSpacing}} />
        </Fragment>
      ))}
    </Fragment>
  );
}

export default FormBuilder;

import React, {ComponentProps} from 'react';
import {Control, RegisterOptions, useController} from 'react-hook-form';
import {ReactNativeModalDateTimePickerProps} from 'react-native-modal-datetime-picker';
import {TextInput} from 'react-native-paper';
import InputText from '../Inputs/InputText';

export type INPUT_TYPES =
  | 'text'
  | 'email'
  | 'password'
  | 'select'
  | 'date'
  | 'custom'
  | 'autocomplete';

export type SELECT_OPTIONS = Array<{label: string; value: string | number}>;

export type LogicProps = {
  name: string;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  shouldUnregister?: boolean;
  defaultValue?: unknown;
  control: Control<any>;
  setFocus: (name: any) => void;
  type: INPUT_TYPES;
  textInputProps?: ComponentProps<typeof TextInput>;
  options?: SELECT_OPTIONS;
  JSX?: (_props: Omit<LogicProps, 'JSX'>) => any;
  datePickerProps?: Omit<
    ReactNativeModalDateTimePickerProps,
    'onConfirm' | 'onCancel'
  >;
};

function Logic(props: LogicProps) {
  const {
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
    type,
    textInputProps,
    JSX,
  } = props;
  const {field, formState} = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  switch (type) {
    case 'text': {
      return (
        <InputText
          field={field}
          formState={formState}
          textInputProps={textInputProps}
        />
      );
    }
    case 'email': {
      return (
        <InputText
          field={field}
          formState={formState}
          textInputProps={{
            ...textInputProps,
            keyboardType: 'email-address',
            autoCapitalize: 'none',
          }}
        />
      );
    }
    case 'password': {
      return (
        <InputText
          field={field}
          formState={formState}
          textInputProps={{
            ...textInputProps,
            secureTextEntry: true,
          }}
        />
      );
    }
    // case 'select': {
    //   return (
    //     <Fragment>
    //       {options && (
    //         <InputSelect
    //           field={field}
    //           formState={formState}
    //           textInputProps={textInputProps}
    //           options={options}
    //         />
    //       )}
    //     </Fragment>
    //   );
    // }
    // case 'autocomplete': {
    //   return (
    //     <Fragment>
    //       {options && (
    //         <InputAutocomplete
    //           label={label}
    //           field={field}
    //           formState={formState}
    //           textInputProps={textInputProps}
    //           options={options}
    //         />
    //       )}
    //     </Fragment>
    //   );
    // }
    // case 'date': {
    //   return (
    //     <InputDate
    //       label={label}
    //       field={field}
    //       formState={formState}
    //       textInputProps={textInputProps}
    //       datePickerProps={datePickerProps}
    //     />
    //   );
    // }
    case 'custom': {
      return JSX && JSX(props);
    }
  }
}

export default Logic;

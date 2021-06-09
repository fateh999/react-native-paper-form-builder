import React, {Fragment} from 'react';
import {useController} from 'react-hook-form';
import {TextInput} from 'react-native-paper';
import InputAutocomplete from '../Inputs/InputAutocomplete';
import InputSelect from '../Inputs/InputSelect';
import InputText from '../Inputs/InputText';
import {LogicProps} from '../Types/Types';

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
    options,
    CustomAutoComplete,
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
    case 'select': {
      return (
        <Fragment>
          {options && (
            <InputSelect
              field={field}
              formState={formState}
              textInputProps={{
                ...textInputProps,
                right: <TextInput.Icon name={'menu-down'} />,
              }}
              options={options}
            />
          )}
        </Fragment>
      );
    }
    case 'autocomplete': {
      return (
        <Fragment>
          {options && (
            <InputAutocomplete
              field={field}
              formState={formState}
              textInputProps={{
                ...textInputProps,
                right: <TextInput.Icon name={'menu-down'} />,
              }}
              options={options}
              CustomAutoComplete={CustomAutoComplete}
            />
          )}
        </Fragment>
      );
    }
    case 'custom': {
      return JSX && JSX(props);
    }
  }
}

export default Logic;

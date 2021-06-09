# react-native-paper-form-builder

# This is readme file for version 2+, For v1 doc go to this [link](READMEv1.md)

Form Builder written in typescript with inbuilt Validation, dropdown, autocomplete powered by [react-hook-form](https://react-hook-form.com/) & [react-native-paper](https://callstack.github.io/react-native-paper/).

[![NPM](https://nodei.co/npm/react-native-paper-form-builder.png?downloads=true)](https://nodei.co/npm/react-native-paper-form-builder/)

#### Dependencies to Install :

- [react-native-paper](https://www.npmjs.com/package/react-native-paper)

- [react-hook-form](https://www.npmjs.com/package/react-hook-form)

- [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons) Follow the configuration step of react-native-vector-icons as provided in the docs.

#### Note :

For maintainability this library will only target latest versions of react-hook-form and react-native-paper.

#### Demo :

![](iOS.gif)
![](android.gif)

#### Steps to install :

```javascript

npm i react-native-paper-form-builder

```

```javascript
import {FormBuilder} from 'react-native-paper-form-builder';
```

#### Usage :

```javascript
import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {FormBuilder} from 'react-native-paper-form-builder';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';

function BasicExample() {
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <View style={styles.containerStyle}>
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Text style={styles.headingStyle}>Form Builder Basic Demo</Text>
        <FormBuilder
          control={control}
          setFocus={setFocus}
          formConfigArray={[
            {
              type: 'email',
              name: 'email',

              rules: {
                required: {
                  value: true,
                  message: 'Email is required',
                },
              },
              textInputProps: {
                label: 'Email',
              },
            },
            {
              type: 'password',
              name: 'password',
              rules: {
                required: {
                  value: true,
                  message: 'Password is required',
                },
              },
              textInputProps: {
                label: 'Password',
              },
            },
          ]}
        />
        <Button
          mode={'contained'}
          onPress={handleSubmit((data: any) => {
            console.log('form data', data);
          })}>
          Submit
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  headingStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default BasicExample;
```

#### For More Advanced Example as in the Demo check [App.tsx](example/App.tsx)

#### Props:

```javascript
export type $DeepPartial<T> = {[P in keyof T]?: $DeepPartial<T[P]>};
export type FormBuilderProps = {
  formConfigArray: Array<Omit<LogicProps, 'control'>>;
  inputSpacing?: number;
  theme?: $DeepPartial<Theme>;
  control: Control<any>;
  setFocus: (name: any) => void;
};

export type INPUT_TYPES =
  | 'text'
  | 'email'
  | 'password'
  | 'select'
  | 'date'
  | 'custom'
  | 'autocomplete';

export type OPTIONS = Array<{label: string; value: string | number}>;

export type LogicProps = {
  name: string;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  shouldUnregister?: boolean;
  defaultValue?: unknown;
  type: INPUT_TYPES;
  textInputProps?: ComponentProps<typeof TextInput>;
  options?: OPTIONS;
  control: Control<any>;
  JSX?: typeof Logic;
  inputSpacing?: number;
  CustomAutoComplete?: typeof AutoComplete;
};

export type InputAutocompleteProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: Omit<TextInputProps, 'theme'>;
  options: OPTIONS;
  CustomAutoComplete?: typeof AutoComplete;
};

export type AutoCompleteProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  textInputProps?: Omit<TextInputProps, 'theme'>;
  options: OPTIONS;
  field: ControllerRenderProps<FieldValues, string>;
};

export type InputSelectProps = {
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: Omit<TextInputProps, 'theme'>;
  options: OPTIONS;
};
```

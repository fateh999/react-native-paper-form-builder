# react-native-paper-form-builder

Form Builder written in typescript with inbuilt Validation, dropdown, autocomplete powered by [react-hook-form](https://react-hook-form.com/) & [react-native-paper](https://callstack.github.io/react-native-paper/).

#### Dependencies to Install :

- [react-native-paper](https://www.npmjs.com/package/react-native-paper)

- [react-hook-form](https://www.npmjs.com/package/react-hook-form)

- [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons) Follow the configuration step of react-native-vector-icons as provided in the docs.

#### Demo :

![](https://i.ibb.co/C6RDdC2/ezgif-7-c021a6c1fa26.gif)

#### Steps to install :

```javascript

npm i react-native-paper-form-builder

```

```javascript
import FormBuilder from 'react-native-paper-form-builder';
```

#### Usage :

```javascript
import React from 'react';

import {View, StyleSheet, ScrollView, Text} from 'react-native';

import FormBuilder from 'react-native-paper-form-builder';

import {useForm} from 'react-hook-form';

import {Button} from 'react-native-paper';

function BasicExample() {
  const form = useForm({
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
          form={form}
          formConfigArray={[
            {
              type: 'input',

              name: 'email',

              label: 'Email',

              rules: {
                required: {
                  value: true,

                  message: 'Email is required',
                },
              },

              textInputProps: {
                keyboardType: 'email-address',

                autoCapitalize: 'none',
              },
            },

            {
              type: 'input',

              name: 'password',

              label: 'Password',

              rules: {
                required: {
                  value: true,

                  message: 'Password is required',
                },
              },

              textInputProps: {
                secureTextEntry: true,
              },
            },
          ]}>
          <Button
            mode={'contained'}
            onPress={form.handleSubmit((data: any) => {
              console.log('form data', data);
            })}>
            Submit
          </Button>
        </FormBuilder>
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

#### For More Advanced Example as in the Demo check [App.tsx](https://github.com/fateh999/react-native-paper-form-builder/blob/master/App.tsx)

#### Props:

| Name            | Description                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| formConfigArray | Array of Input Configs which are specified below                                             |
| form            | useForm hook value                                                                           |
| children        | (Optional) React Component For Showing Buttons or any other component at the end of the form |  | children | Optional React Component For Showing Buttons or any other component at the end of the form |
| CustomInput     | (Optional) Custom React Input in place of react native paper default input                   |
| helperTextStyle | (Optional) Bottom Helper Text Style                                                          |
| inputViewStyle  | (Optional) Container Style wrapping text input                                               |

#### How to generate different input types:

1. TextInput

```javascript

{

type: 'input',

name: string, // Same as defined in default values

label?: string,

variant?:  'outlined'  |  'flat',

rules?: ValidationOptions,// Validation Rules of Controller component from React Hook Form

textInputProps?: React.ComponentProps<typeof TextInput>  // Props of React Native Paper TextInput

}

```

2. Select

```javascript

{

type: 'select',

name: string, // Same as defined in default values

options: Array<{ value: string | number,label: string }>,

label?: string,

variant?:  'outlined'  |  'flat',

rules?: ValidationOptions,// Validation Rules of Controller component from React Hook Form

}

```

3. Autocomplete

```javascript

{

type: 'autocomplete',

name: string, // Same as defined in default values

options: Array<{ value: string | number,label: string }>,

label?: string,

variant?:  'outlined'  |  'flat',

loadOptions?: any, // Pass a function that reloads options in case they fail to update

rules?: ValidationOptions,// Validation Rules of Controller component from React Hook Form

}

```

4. Checkbox

```javascript

{

type: 'checkbox',

name: string, // Same as defined in default values

label?: string | React.ReactNode,

rules?: ValidationOptions,// Validation Rules of Controller component from React Hook Form

}

```

5. Radio

```javascript

{

type: 'radio',

name: string, // Same as defined in default values

label?: string | React.ReactNode,

rules?: ValidationOptions,// Validation Rules of Controller component from React Hook Form

}

```

6. Switch

```javascript

{

type: 'switch',

name: string, // Same as defined in default values

label?: string | React.ReactNode,

rules?: ValidationOptions,// Validation Rules of Controller component from React Hook Form

}

```

#### Simple Example of Custom Input:

```javascript
function SimpleCustomTextInput(props: TextInputProps) {
  const {error, label, style} = props;

  return (
    <TextInput
      placeholder={label}
      {...props}
      style={{
        color: 'black',

        height: 56,

        borderBottomWidth: 2,

        borderBottomColor: error ? 'red' : 'grey',

        ...style,
      }}
    />
  );
}
```

#### TODO :

- ~~Modal Autocomplete~~

- ~~Custom Input~~
- ~~FlatList Integration in Autocomplete~~
- ~~Refresh handler in Autocomplete~~
- Input Icons

# react-native-paper-form-builder

#### This is readme file for version 2+, For v1 doc go to this [link](READMEv1.md)

[![npm version](https://img.shields.io/npm/v/react-native-paper-form-builder.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-form-builder)
[![npm downloads](https://img.shields.io/npm/dm/react-native-paper-form-builder.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-form-builder)
[![npm](https://img.shields.io/npm/dt/react-native-paper-form-builder.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-paper-form-builder)
[![npm](https://img.shields.io/npm/l/react-native-paper-form-builder?style=for-the-badge)](https://github.com/fateh999/react-native-paper-form-builder/blob/master/LICENSE)

Form Builder written in typescript with inbuilt Validation, dropdown, autocomplete powered by [react-hook-form](https://react-hook-form.com/) & [react-native-paper](https://callstack.github.io/react-native-paper/).

#### Dependencies to Install :

- [react-native-paper](https://www.npmjs.com/package/react-native-paper)

- [react-hook-form](https://www.npmjs.com/package/react-hook-form)

#### Note :

For maintainability this library will only target latest versions of react-hook-form and react-native-paper.

#### Documentation :

- [https://fateh999.github.io/react-native-paper-form-builder](https://fateh999.github.io/react-native-paper-form-builder)

#### Demo :

![](iOS.gif)
![](android.gif)

#### Steps to install :

```javascript

npm install react-native-paper-form-builder

```

or

```javascript

yarn add react-native-paper-form-builder

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

# react-native-paper-form-builder

Form Builder written in typescript with inbuilt Validation, dropdown, autocomplete powered by [react-hook-form](https://react-hook-form.com/) & [react-native-paper](https://callstack.github.io/react-native-paper/).

#### Dependencies to Install :

- [react-native-paper](https://www.npmjs.com/package/react-native-paper)
- [react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons) Follow the configuration step of react-native-vector-icons as provided in the docs.

#### Demo :

![](https://i.ibb.co/CHwmKJN/ezgif-1-894da084218f.gif)

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
                  message: 'Email is required',
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

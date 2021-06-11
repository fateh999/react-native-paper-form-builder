# Basic Example

```jsx
import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {FormBuilder} from './dist';
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

# Advanced Example

```jsx
import React, {Fragment} from 'react';
import {useController, useForm} from 'react-hook-form';
import {Button, Checkbox, List, TextInput} from 'react-native-paper';
import {FormBuilder} from './dist';
import {LogicProps} from './dist/Types/Types';

function AdvancedExample() {
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      city: '',
      gender: '',
      rememberMe: 'checked',
    },
    mode: 'onChange',
  });

  return (
    <Fragment>
      <FormBuilder
        control={control}
        setFocus={setFocus}
        formConfigArray={[
          {
            name: 'name',
            type: 'text',
            textInputProps: {
              label: 'Name',
              left: <TextInput.Icon name={'account'} />,
            },
            rules: {
              required: {
                value: true,
                message: 'Name is required',
              },
            },
          },
          {
            name: 'email',
            type: 'email',
            textInputProps: {
              label: 'Email',
              left: <TextInput.Icon name={'email'} />,
            },
            rules: {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value:
                  /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/,
                message: 'Email is invalid',
              },
            },
          },
          {
            name: 'password',
            type: 'password',
            textInputProps: {
              label: 'Password',
              left: <TextInput.Icon name={'lock'} />,
            },
            rules: {
              required: {
                value: true,
                message: 'Password is required',
              },
              minLength: {
                value: 8,
                message: 'Password should be atleast 8 characters',
              },
              maxLength: {
                value: 30,
                message: 'Password should be between 8 and 30 characters',
              },
            },
          },
          {
            name: 'city',
            type: 'autocomplete',
            textInputProps: {
              label: 'City',
              left: <TextInput.Icon name={'office-building'} />,
            },
            rules: {
              required: {
                value: true,
                message: 'City is required',
              },
            },
            options: [
              {
                label: 'Lucknow',
                value: 1,
              },
              {
                label: 'Noida',
                value: 2,
              },
              {
                label: 'Delhi',
                value: 3,
              },
              {
                label: 'Bangalore',
                value: 4,
              },
              {
                label: 'Pune',
                value: 5,
              },
              {
                label: 'Mumbai',
                value: 6,
              },
              {
                label: 'Ahmedabad',
                value: 7,
              },
              {
                label: 'Patna',
                value: 8,
              },
            ],
          },
          {
            name: 'gender',
            type: 'select',
            textInputProps: {
              label: 'Gender',
              left: <TextInput.Icon name={'account'} />,
            },
            rules: {
              required: {
                value: true,
                message: 'Gender is required',
              },
            },
            options: [
              {
                value: 0,
                label: 'Female',
              },
              {
                value: 1,
                label: 'Male',
              },
              {
                value: 2,
                label: 'Others',
              },
            ],
          },
          {
            name: 'rememberMe',
            type: 'custom',
            JSX: RememberMe,
          },
        ]}
      />
      <Button mode={'contained'} onPress={handleSubmit(console.log)}>
        Submit
      </Button>
    </Fragment>
  );
}

function RememberMe(props: LogicProps) {
  const {name, rules, shouldUnregister, defaultValue, control} = props;
  const {field} = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <List.Item
      title={'Remember me'}
      left={() => (
        <Checkbox.Android
          status={field.value}
          onPress={() => {
            field.onChange(field.value === 'checked' ? 'unchecked' : 'checked');
          }}
        />
      )}
    />
  );
}

export default AdvancedExample;
```

import React, {Fragment} from 'react';
import {useController, useForm} from 'react-hook-form';
import {Button, Checkbox, List, TextInput} from 'react-native-paper';
import {FormBuilder} from './dist';
import {LogicProps} from './dist/Types/Types';

function AdvancedExample() {
  const {control, setFocus, handleSubmit} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
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
          [
            {
              name: 'firstName',
              type: 'text',
              textInputProps: {
                label: 'First Name',
                left: <TextInput.Icon name={'account'} />,
              },
              rules: {
                required: {
                  value: true,
                  message: 'First name is required',
                },
              },
            },
            {
              name: 'lastName',
              type: 'text',
              textInputProps: {
                label: 'Last Name',
                left: <TextInput.Icon name={'account'} />,
              },
              rules: {
                required: {
                  value: true,
                  message: 'Last name is required',
                },
              },
            },
          ],
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
            JSX: TermsCheckBox,
          },
        ]}
      />
      <Button mode={'contained'} onPress={handleSubmit(console.log)}>
        Submit
      </Button>
    </Fragment>
  );
}

function TermsCheckBox(props: LogicProps) {
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

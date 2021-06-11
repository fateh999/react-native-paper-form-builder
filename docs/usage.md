# Input Types

For detailed info on validation rules go here

https://react-hook-form.com/api/useform/register

### text

```jsx
import React from 'react';
import {FormBuilder} from 'react-hook-form';
import {useForm} from 'react-hook-form';

function Example() {
  const {control, setFocus} = useForm({
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  });

  return (
    <FormBuilder
      control={control}
      setFocus={setFocus}
      formConfigArray={[
        {
          name: 'name',
          type: 'text',
          rules: {
            required: {
              value: true,
              message: 'Name is required',
            },
          },
          textInputProps: {
            label: 'Name',
          },
        },
      ]}
    />
  );
}
```

### email

```jsx
import React from 'react';
import {FormBuilder} from 'react-hook-form';
import {useForm} from 'react-hook-form';

function Example() {
  const {control, setFocus} = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  return (
    <FormBuilder
      control={control}
      setFocus={setFocus}
      formConfigArray={[
        {
          name: 'email',
          type: 'email',
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
          textInputProps: {
            label: 'Email',
          },
        },
      ]}
    />
  );
}
```

### password

```jsx
import React from 'react';
import {FormBuilder} from 'react-hook-form';
import {useForm} from 'react-hook-form';

function Example() {
  const {control, setFocus} = useForm({
    defaultValues: {
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <FormBuilder
      control={control}
      setFocus={setFocus}
      formConfigArray={[
        {
          name: 'password',
          type: 'password',
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
          textInputProps: {
            label: 'Password',
          },
        },
      ]}
    />
  );
}
```

### select

```jsx
import React from 'react';
import {FormBuilder} from 'react-hook-form';
import {useForm} from 'react-hook-form';

function Example() {
  const {control, setFocus} = useForm({
    defaultValues: {
      gender: '',
    },
    mode: 'onChange',
  });

  return (
    <FormBuilder
      control={control}
      setFocus={setFocus}
      formConfigArray={[
        {
          name: 'gender',
          type: 'select',
          rules: {
            required: {
              value: true,
              message: 'Gender is required',
            },
          },
          textInputProps: {
            label: 'Gender',
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
      ]}
    />
  );
}
```

### autocomplete

```jsx
import React from 'react';
import {FormBuilder} from 'react-hook-form';
import {useForm} from 'react-hook-form';

function Example() {
  const {control, setFocus} = useForm({
    defaultValues: {
      city: '',
    },
    mode: 'onChange',
  });

  return (
    <FormBuilder
      control={control}
      setFocus={setFocus}
      formConfigArray={[
        {
          name: 'city',
          type: 'autocomplete',
          rules: {
            required: {
              value: true,
              message: 'City is required',
            },
          },
          textInputProps: {
            label: 'City',
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
      ]}
    />
  );
}
```

### custom

```jsx
import React from 'react';
import {FormBuilder} from 'react-hook-form';
import {useForm} from 'react-hook-form';

function Example() {
  const {control, setFocus} = useForm({
    defaultValues: {
      rememberMe: 'checked',
    },
    mode: 'onChange',
  });

  return (
    <FormBuilder
      control={control}
      setFocus={setFocus}
      formConfigArray={[
        {
          name: 'rememberMe',
          type: 'custom',
          JSX: RememberMe,
        },
      ]}
    />
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
```

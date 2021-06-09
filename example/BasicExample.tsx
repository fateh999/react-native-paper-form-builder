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

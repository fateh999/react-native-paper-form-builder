import {
  DarkTheme,
  DefaultTheme,
  Provider,
  TextInput,
  ThemeProvider,
} from 'react-native-paper';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import FormBuilder from './src/FormBuilder';
import {useForm} from 'react-hook-form';

function App() {
  const [nightMode] = useState(false);
  const {control, setFocus} = useForm({
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  });

  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <FormBuilder
              theme={{colors: {primary: 'orange'}}}
              formConfigArray={[
                {
                  name: 'name',
                  control,
                  setFocus,
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
                  control,
                  setFocus,
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
                  },
                },
                {
                  name: 'password',
                  control,
                  setFocus,
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
                  },
                },
              ]}
            />
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
});

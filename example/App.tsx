import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from 'react-native-paper';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AdvancedExample from './AdvancedExample';

function App() {
  const [nightMode, setNightmode] = useState(false);

  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
        <StatusBar barStyle={'light-content'} />
        <Surface style={styles.container}>
          <Appbar.Header>
            <Appbar.Content title="React Native Paper Form Builder" />
            <Appbar.Action
              icon={nightMode ? 'brightness-7' : 'brightness-3'}
              onPress={() => setNightmode(!nightMode)}
            />
          </Appbar.Header>
          <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
              enableOnAndroid={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}
              keyboardShouldPersistTaps={'handled'}>
              <AdvancedExample />
            </KeyboardAwareScrollView>
          </SafeAreaView>
        </Surface>
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

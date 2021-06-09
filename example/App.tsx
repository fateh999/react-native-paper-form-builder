import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from 'react-native-paper';
import React, {useState} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import AdvancedExample from './AdvancedExample';
//@ts-ignore
import KeyboardSpacer from 'react-native-keyboard-spacer';

function App() {
  const [nightMode, setNightmode] = useState(false);

  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
        <StatusBar
          backgroundColor={
            nightMode ? DarkTheme.colors.surface : DefaultTheme.colors.primary
          }
          barStyle={'light-content'}
        />
        <Surface style={styles.container}>
          <Appbar.Header>
            <Appbar.Content title="React Native Paper Form Builder" />
            <Appbar.Action
              icon={nightMode ? 'brightness-7' : 'brightness-3'}
              onPress={() => setNightmode(!nightMode)}
            />
          </Appbar.Header>
          <SafeAreaView style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
              keyboardShouldPersistTaps={'handled'}>
              <AdvancedExample />
            </ScrollView>
            {Platform.OS === 'ios' && <KeyboardSpacer />}
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
    flexGrow: 1,
    padding: 20,
  },
});

/**
 * @format
 */

import App from './App';
import {AppRegistry} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {name as appName} from './app.json';

MaterialCommunityIcons.loadFont();

AppRegistry.registerComponent(appName, () => App);

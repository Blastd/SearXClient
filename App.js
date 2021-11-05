import { StatusBar } from 'expo-status-bar';
import React from 'react';
import StartSearch from './uiTypes/StartSearch';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Sanitizer } from 'sanitize';

const Stack = createNativeStackNavigator();

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableHighlight,
  TextInput,
  Pressable,
  Appearance,
  Linking
} from 'react-native';
import ResultPage from './uiTypes/ResultPage';
import { Fragment } from 'react/cjs/react.production.min';

export default function App() {

  //const isDarkMode = useDarkMode();
  //alert(Appearance.getColorScheme());

  return (
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="StartSearchUi"
            component={StartSearch}
            options={{title: 'Welcome'}}/>
          <Stack.Screen
            name="SearchResultUi"
            component={ResultPage}
            options={{title: 'Welcome'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}

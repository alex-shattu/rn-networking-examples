import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import screenNames from '~/constants/screensNames';
import Home from '~/screens/Home';
import HTTP from '~/screens/HTTP/';
import TCP from '~/screens/TCP/';
import FTP from '~/screens/FTP/';

enableScreens();
const Stack = createNativeStackNavigator();

const App = () => {
  const { t } = useTranslation();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screenNames.HOME_SCREEN}>
        <Stack.Screen
          name={screenNames.HOME_SCREEN}
          component={Home}
          options={{
            headerTitle: t('header_title_home'),
          }}
        />
        <Stack.Screen
          name={screenNames.HTTP_SCREEN}
          component={HTTP}
          options={{
            headerTitle: 'HTTP',
          }}
        />
        <Stack.Screen
          name={screenNames.TCP_SCREEN}
          component={TCP}
          options={{
            headerTitle: 'TCP',
          }}
        />
        <Stack.Screen
          name={screenNames.FTP_SCREEN}
          component={FTP}
          options={{
            headerTitle: 'FTP',
          }}
        />
        {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

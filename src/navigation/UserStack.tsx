import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../constants/theme';
import { MaterialCommunityIcons , Octicons , SimpleLineIcons } from "@expo/vector-icons";
import MyAccount from '../screens/MyAccount';

const UserStack = () => {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <StatusBar
        backgroundColor={COLORS.offWhite}
        barStyle={'dark-content'}></StatusBar>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 65,
          },
        }}
        initialRouteName="HomeStack">
        <Tab.Screen
          name="HomeStack"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',

                    marginVertical: 10,
                    borderRadius: 25,
                  }}>
                  <SimpleLineIcons
                    name="home"
                    size={28}
                    color={focused ? '#24A4DE' : 'grey'}
                  />

                  <Text
                    style={{color: focused ? '#24A4DE' : 'grey', fontSize: 9}}>
                    Home
                  </Text>
                </View>
              );
            },
          }}
        />
        {/* <Tab.Screen
          name="LiveQueue"
          component={LiveQueue}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',

                    marginVertical: 10,
                    borderRadius: 25,
                  }}>
                  <MaterialCommunityIcons
                    name="human-queue"
                    size={28}
                    color={focused ? '#24A4DE' : 'grey'}
                  />

                  <Text
                    style={{color: focused ? '#24A4DE' : 'grey', fontSize: 9}}>
                    Live Queue
                  </Text>
                </View>
              );
            },
          }}
        /> */}
        {/* <Tab.Screen
          name="Appointment"
          component={Appointment}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    marginVertical: 10,
                    borderRadius: 25,
                  }}>
                  <MaterialCommunityIcons
                    name="calendar-heart"
                    size={28}
                    color={focused ? '#24A4DE' : 'grey'}
                  />

                  <Text
                    style={{color: focused ? '#24A4DE' : 'grey', fontSize: 9}}>
                    Appointment
                  </Text>
                </View>
              );
            },
          }}
        /> */}
        <Tab.Screen
          name="Profile"
          component={MyAccount}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',

                    marginVertical: 10,
                    borderRadius: 25,
                  }}>
                  <Octicons
                    name="person"
                    size={28}
                    color={focused ? '#24A4DE' : 'grey'}
                  />
                  <Text
                    style={{color: focused ? '#24A4DE' : 'grey', fontSize: 9}}>
                    Profile
                  </Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default UserStack

const styles = StyleSheet.create({})
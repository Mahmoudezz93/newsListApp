import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import screen // 
import splash from "../sceens/splash";

// Main stack // 
import homePage from "../sceens/homePage";
import tab1 from "../sceens/tabs/tab1";
import tab2 from "../sceens/tabs/tab2";
import tab3 from "../sceens/tabs/tab3";







const MainStackNavigator = createBottomTabNavigator();
export const MainNavigator = () => {
    return (
        <MainStackNavigator.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'News') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Sources') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <MainStackNavigator.Screen name="News" component={tab1} />
            <MainStackNavigator.Screen name="Sources" component={tab2} />
            <MainStackNavigator.Screen name="Histroy" component={tab3} />

        </MainStackNavigator.Navigator>
    )
}


const IntroStack = createStackNavigator();
/* This is the main container for the application an should contain all other stacks for the application 
*/

export default AppContainer = (props) => {
    return (
        <NavigationContainer>
            <IntroStack.Navigator initialRouteName="Splash">
                <IntroStack.Screen name="Splash" component={splash} />
                <IntroStack.Screen name="Main" component={MainNavigator} />
            </IntroStack.Navigator>
        </NavigationContainer>
    );
};
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import screen // 
import splash from "../sceens/splash";

// News stack // 
import tab1 from "../sceens/tabs/tab1";
import detailsPage from "../sceens/detailsPage";


// Sources Stack // 
import tab2 from "../sceens/tabs/tab2";
import sourceHeadlines from "../sceens/sourcesHeadlines" 
import sourceDetails from "../sceens/sourceDetails"

import homePage from "../sceens/homePage";
import tab3 from "../sceens/tabs/tab3";





const SourcesStackNavigator = createStackNavigator();
export const SourcesNavigator = () => {
    return (
        <SourcesStackNavigator.Navigator initialRouteName="MainHeadlines" screenOptions={{ headerShown: false }}>
            <SourcesStackNavigator.Screen name="Soruces"  component={tab2} />
            <SourcesStackNavigator.Screen name="SourceHeadlines" component={sourceHeadlines} />
            <SourcesStackNavigator.Screen name="SourceDetails" component={sourceDetails} />

        </SourcesStackNavigator.Navigator>
    )
}





const NewsStackNavigator = createStackNavigator();
export const NewsNavigator = () => {
    return (
        <NewsStackNavigator.Navigator initialRouteName="MainHeadlines" screenOptions={{ headerShown: false }}>
            <NewsStackNavigator.Screen name="MainHeadlines"  component={tab1} />
            <NewsStackNavigator.Screen name="headlineDetails" component={detailsPage} />
        </NewsStackNavigator.Navigator>
    )
}




const TabStackNavigator = createBottomTabNavigator();
export const TabNavigator = () => {
    return (
        <TabStackNavigator.Navigator initialRouteName="News" screenOptions={{ headerShown: false }}
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
                tabBarActiveTintColor: 'Blue',
                tabBarInactiveTintColor: 'gray',
            })}>
            <TabStackNavigator.Screen name="News" component={NewsNavigator} />
            <TabStackNavigator.Screen name="Sources" component={SourcesNavigator} />
            <TabStackNavigator.Screen name="Histroy" component={tab3} />
            
        </TabStackNavigator.Navigator>
    )
}


const IntroStack = createStackNavigator();
/* This is the main container for the application an should contain all other stacks for the application 
*/

export default AppContainer = (props) => {
    return (
        <NavigationContainer>
            <IntroStack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }} >
                <IntroStack.Screen name="Splash" component={splash} />
                <IntroStack.Screen name="Tabs" component={TabNavigator} />
            </IntroStack.Navigator>
        </NavigationContainer>
    );
};
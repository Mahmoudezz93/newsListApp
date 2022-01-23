import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';


// Splash screen // 
import splash from "../sceens/splash";

// News stack // 
import tab1 from "../sceens/news/tab1";
import detailsPage from "../sceens/news/detailsPage";

// Sources Stack // 
import tab2 from "../sceens/newsSources/tab2";
import sourceHeadlines from "../sceens/newsSources/sourcesHeadlines"
import sourceDetails from "../sceens/newsSources/sourceDetails"

// History Stack // 
import tab3 from "../sceens/newsHistory/tab3";
import historyDetails from "../sceens/newsHistory/historyDetails"






const HistoryStackNavigator = createStackNavigator();
export const HistoryNavigator = () => {
    return (
        <HistoryStackNavigator.Navigator initialRouteName="Histroy" screenOptions={{ headerShown: false }}>
            <HistoryStackNavigator.Screen name="Histroy" component={tab3} />
             <HistoryStackNavigator.Screen name="HistoryDetails" component={historyDetails} />

        </HistoryStackNavigator.Navigator>
    )
}


const SourcesStackNavigator = createStackNavigator();
export const SourcesNavigator = () => {
    return (
        <SourcesStackNavigator.Navigator initialRouteName="MainHeadlines"  screenOptions={{ headerShown: false }}>
            <SourcesStackNavigator.Screen name="Soruces" component={tab2} />
            <SourcesStackNavigator.Screen name="SourceHeadlines" component={sourceHeadlines} />
            <SourcesStackNavigator.Screen name="SourceDetails" component={sourceDetails} />

        </SourcesStackNavigator.Navigator>
    )
}





const NewsStackNavigator = createStackNavigator();
export const NewsNavigator = () => {
    return (
        <NewsStackNavigator.Navigator initialRouteName="MainHeadlines" screenOptions={{ headerShown: false }}>
            <NewsStackNavigator.Screen name="MainHeadlines" component={tab1} />
            <NewsStackNavigator.Screen name="headlineDetails" component={detailsPage} />
        </NewsStackNavigator.Navigator>
    )
}




const TabStackNavigator = createBottomTabNavigator();
export const TabNavigator = () => {
    return (
        <TabStackNavigator.Navigator initialRouteName="News" screenOptions={{  }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'News') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Sources') {
                        iconName = focused ? 'list' : 'list';
                    }
                    if (route.name === 'Histroy') {
                        iconName = focused ? 'clock-o' : 'clock-o';

                    }
                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'grey',
                headerShown: false
            })}>
            <TabStackNavigator.Screen name="News" component={NewsNavigator} />
            <TabStackNavigator.Screen name="Sources" component={SourcesNavigator} />
            <TabStackNavigator.Screen name="Histroy" component={HistoryNavigator} />

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
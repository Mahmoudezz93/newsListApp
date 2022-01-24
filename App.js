import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import config from "./store/config";

// React Navigation v6 App Container // 
import AppContainer from "../newsListApp/Navigation/AppContainer"; 

//  redux store 
const store = config();


export default function App() {
  return (                              // creating redux store, // 
    <Provider store = { store } >         
    < AppContainer/>                     
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

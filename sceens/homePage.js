import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import axios from "axios";
import { StackActions, NavigationActions, CommonActions, } from '@react-navigation/native';



export default function homePage (props)  {
     
        return (
            <View style={{flex:1,alignContent:'center',justifyContent:'center'}}>
                <Text>Welcome To News App, this is Home page</Text>
            </View>
        )
}
import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import axios from "axios";
import { StackActions, NavigationActions, CommonActions, } from '@react-navigation/native';



export default function tab3 (props)  {
     
        return (
            <View style={{flex:1,alignContent:'center',justifyContent:'center'}}>
                <Text>Welcome To News App, this is tab2</Text>
            </View>
        )
}
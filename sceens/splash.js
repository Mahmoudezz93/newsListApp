import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import axios from "axios";
import { StackActions, NavigationActions, CommonActions, } from '@react-navigation/native';

export default class rootscreen extends Component {

    componentDidMount = async () => {
        this.timeoutHandle = setTimeout(() => {
            this.props.navigation.replace("Tabs");
        }, 3000);
    }

    render() {

        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'skyblue' }}>
                <Text style={{ alignSelf: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }}>Welcome To News App, this is the splash</Text>
            </View>
        )
    }
}
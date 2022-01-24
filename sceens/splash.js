import React, { Component } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { Dimensions } from "react-native";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import axios from "axios";
 import {
    BallIndicator,
} from 'react-native-indicators';

export default class rootscreen extends Component {

    componentDidMount = async () => {
        this.timeoutHandle = setTimeout(() => {
        this.props.navigation.replace("Tabs");          // Wait then navigate to the application 
        }, 3000);
    }

    render() {

        return (
            <View style={{ height:deviceHeight,width:deviceWidth, alignContent: 'center',alignSelf:'center', justifyContent: 'center', backgroundColor: 'black' }}>
                <Text style={{ alignSelf: 'center',fontSize:15, textAlign: 'center', fontWeight: 'bold',color:'white' }}>welcome to</Text>
                <Text style={{ alignSelf: 'center', justifyContent: 'center',fontSize:30, textAlign: 'center', fontWeight: 'bold',color:'white' }}>The News App </Text>
                <View style={{ width: 50, height: 30,backgroundColor:'black',alignSelf:'center' }}>
            <BallIndicator color={'white'} size={18} />
            </View>
            </View>
        )
    }
}
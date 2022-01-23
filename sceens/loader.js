import React, { Component } from 'react'
import { Image, Dimensions,View } from "react-native";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import {
    BallIndicator,
} from 'react-native-indicators';

export default class laoder extends Component {
    render() {
        return (
            <View style={{ width: deviceWidth, height: deviceHeight - 30,backgroundColor:'black' }}>
            <BallIndicator color={'white'} />
            </View>)
    }
}

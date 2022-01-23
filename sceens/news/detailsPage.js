import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, Linking, ImageBackground, ScrollView } from 'react-native'
import axios from "axios";
import { API, COUNTRY, KEY, TOP_HEADLINES, CATEGORY, EG, BUSINESS } from "../../functions/config";
import LinearGradient from 'react-native-linear-gradient';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class detailsPage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [], isReady: false,
    }

    componentDidMount = async () => {
        await this.setState({ isReady: false });
        const { navigation } = this.props;
        const Data = this.props.route.params.data
        await this.setState({
            data: Data,
            isReady: true
        });

    }


    render() {
        const value = this.state.data

        return (
            <ScrollView padder style={{ flex: 1, alignContent: 'center', backgroundColor: 'black', padding: 5, }}>
                <ImageBackground resizeMode='cover' style={{ height: deviceHeight / 1.4, borderRadius: 7 }} source={{ uri: value.urlToImage }} >
                    <LinearGradient colors={['rgba(0,0,0,0.3)', 'transparent']}
                        style={{ flex: 0.5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 5 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row', padding: 12, alignItems: 'center' }}>
                                <Icon name={"arrow-back-ios"} size={20} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)',]}
                        style={{ flex: 0.5, justifyContent: 'flex-end' }}>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={Pagestyles.cardTextMain}>{value.title} </Text><Text numberOfLines={1} ellipsizeMode='tail' style={Pagestyles.cardText}>{value.author} <Text numberOfLines={1} ellipsizeMode='tail' style={Pagestyles.cardText}>{(value.publishedAt)}</Text></Text>
                
                    </LinearGradient>
                </ImageBackground>
                <View style={[Pagestyles.listContainer, { backgroundColor: "#2b2b2b",marginBottom:20 }]} >
                    <View style={[{ paddingHorizontal: 1, width: deviceWidth / 1.1 }]}  >
                        <Text style={Pagestyles.cardText}>{value.description} </Text>
                        <Text  onPress={() => Linking.openURL(value.url)} style={[Pagestyles.cardText,{marginVertical:5}]}>{value.url} </Text>

                    </View>
                </View>
    

            </ScrollView >
        )
    }
}


const Pagestyles = StyleSheet.create({

    container: { alignSelf: 'center', justifyContent: 'center', },
    listContainer: { alignSelf: 'center', alignItems: 'center', justifyContent: "flex-start", marginVertical: 10, borderRadius: 7, marginBottom: 7, width: deviceWidth / 1.1, height: deviceWidth / 2, backgroundColor: '#2b2b2b' },
    imageStyle: { width: deviceWidth / 1.1, height: deviceWidth / 1.9, borderTopRightRadius: 7, borderTopLeftRadius: 7, zIndex: 20, marginBottom: 7 },
    cardText: {
        alignSelf: "auto", paddingHorizontal: 3, fontSize: 16, textAlignVertical: 'top', color: 'white'
    },
    cardTextMain: {
        alignSelf: "auto", paddingHorizontal: 3, fontSize: 22, textAlignVertical: 'top', color: 'white'
    }
})

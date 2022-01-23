import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions,Linking} from 'react-native'
import axios from "axios";
import { API, COUNTRY, KEY, TOP_HEADLINES, CATEGORY, EG, BUSINESS } from "../../functions/config";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class historyDetails extends Component {
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
        console.log(Data)
    }


    render() {
        const value = this.state.data
        return (
            <View padder style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'lightgrey', justifyContent: 'flex-start', padding: 5, }}>

                <View style={[Pagestyles.listContainer, { backgroundColor: "white" }]} >
                    {value.urlToImage ?
                        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                            <TouchableOpacity >
                                <Image resizeMode={'contain'} source={{ uri: value.urlToImage }}
                                    style={{ width: 80, height: 80, margin: 1, alignSelf: 'center' }} />
                            </TouchableOpacity>

                        </View>
                        : null}

                    <View style={[{ paddingHorizontal: 1 }, value.urlToImage ? { width: deviceWidth / 1.5 } : { width: deviceWidth / 1.1 }]}  >
                        <Text numberOfLines={2} ellipsizeMode='tail' style={Pagestyles.cardText}>{value.title} </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={Pagestyles.cardText}>المصدر: {value.author}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={Pagestyles.cardText}>تاريخ النشر{value.publishedAt}</Text>

                    </View>
                </View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={Pagestyles.cardText}>   التفاصيل</Text>
                <View style={[Pagestyles.listContainer, { backgroundColor: "white" }]} >
                   
                    <View style={[{ paddingHorizontal: 1 , width: deviceWidth / 1.1 }]}  >
                        <Text   style={Pagestyles.cardText}>{value.description} </Text>
                    </View>
                </View>

                <Text numberOfLines={1} ellipsizeMode='tail' style={Pagestyles.cardText}>   المصادر</Text>
                <View style={[Pagestyles.listContainer, { backgroundColor: "white" }]} >
                   
                    <View style={[{ paddingHorizontal: 1 , width: deviceWidth / 1.1 }]}  >
                        <Text   onPress={() => Linking.openURL(value.url)}
                         style={Pagestyles.cardText}>{value.url} </Text>
                    </View>
                </View>

            </View>
        )
    }
}


const Pagestyles = StyleSheet.create({

    container: { alignSelf: 'center', justifyContent: 'center', },
    listContainer: { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5, borderRadius: 7, marginBottom: 7, width: deviceWidth / 1.1 },
    cardText: {
        alignSelf:
            'flex-end', textAlignVertical: 'top', padding: 2, marginVertical: 4, textAlign: 'right',  borderRadius: 4
    }
})

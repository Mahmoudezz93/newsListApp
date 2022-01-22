import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import axios from "axios";
import { API, COUNTRY, KEY, TOP_HEADLINES, CATEGORY, EG, BUSINESS } from "../../functions/config";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class tab1 extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [], isReady: false, page: 1,
        fetching_from_server: false,
        endThreshold: 2,
        refreshing: false,
    }

    componentDidMount = async () => {
        await this.setState({ isReady: false });
        const { navigation } = this.props;
        await this.Get_News('reset');
        await this.setState({ isReady: true });
    }


    Get_News = async (mode) => {
        this.setState({ fetching_from_server: true });
        const token = this.state.token;
        if (mode == 'reset') {
            await axios
                //  console.log(API+ TOP_HEADLINES + COUNTRY + EG + CATEGORY+ BUSINESS + "page=1" + "&apiKey=" + KEY)
                .get(API + TOP_HEADLINES + COUNTRY + EG + CATEGORY + BUSINESS + "page=1" + "&apiKey=" + KEY)
                //.get("https://newsapi.org/v2/top-headlines?country=eg&category=business&page=1&apiKey=31dd32c59802475889262ef8b62bbc2b")
                .then(result => {
                    this.setState({
                        data: result.data.articles,
                        page: 2 //next page
                    })
                })
                .catch(error => {
                    console.log(error);
                    if (error.response) {
                        // error handling
                        alert(error.response);
                    }
                });
        } else {
            console.log('get data of page -> ' + this.state.page)
            await axios
                .get(API + TOP_HEADLINES + COUNTRY + EG + CATEGORY + BUSINESS + "page=" + this.state.page + "&apiKey" + KEY)
                .then(result => {
                    console.log("iamhere")
                    if (result.data.articles.length > 0) {
                        this.setState({
                            data: [...this.state.data, ...result.data.articles]
                        })
                        this.setState({ page: this.state.page + 1 })

                    } else {
                        console.log("endreached")
                    }
                })
                .catch(error => {
                    console.log(error.response.data.error);
                });
        }
        this.setState({ fetching_from_server: false });

    }


    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.Get_News('reset').then(() => {
            this.setState({ refreshing: false });
        });
    }






    render() {

        return (
            <View padder style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'lightgrey', justifyContent: 'flex-start' }}>
                <Text style={{ alignSelf: 'flex-start', justifyContent: 'center', padding: 7, textAlign: 'left', fontWeight: 'bold' }}>Top Egypt business headlines </Text>

                {this.state.data.length > 0 ?
                    <FlatList
                        style={{
                            flex: 1, alignSelf: 'center',
                            alignContent: 'center', paddingTop: 1.5
                            , paddingBottom: 10, paddingHorizontal: 1, marginTop: 5,
                        }}
                        numColumns={1}
                        contentContainerStyle={{ justifyContent: 'center', alignSelf: 'center' }}
                        onEndReachedThreshold={this.state.endThreshold}
                        data={this.state.data}

                        onEndReached={() => {
                            this.state.fetching_from_server == false ? this.Get_News('scroll') : null
                        }}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}

                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index, separators }) => {
                            let value = item;
                            return (
                                <TouchableWithoutFeedback key={index} data={value} >
                                    <View style={[Pagestyles.listContainer, { backgroundColor: "white" }]} >
                                        {value.urlToImage ?
                                            <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate("headlineDetails", {
                                                    data: item,
                                                })}  >
                                                    <Image resizeMode={'contain'} source={{ uri: value.urlToImage }}
                                                        style={{ width: 80, height: 80, alignSelf: 'center' }} />
                                                </TouchableOpacity>

                                            </View>
                                            : null}

                                        <View style={[{ paddingHorizontal: 1 }, value.urlToImage ? { width: deviceWidth / 1.5 } : { width: deviceWidth / 1.1 }]}  >
                                            <Text numberOfLines={2} ellipsizeMode='tail' style={Pagestyles.cardText}>{value.title} </Text>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={Pagestyles.cardText}>  المصدر: {value.author}</Text>
                                            <Text numberOfLines={1} ellipsizeMode='tail' style={Pagestyles.cardText}>   تاريخ النشر{value.publishedAt}</Text>

                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        }
                        }
                    />
                    :
                    <View style={{ alignContent: "center", alignSelf: "center", justifyContent: "center", flex: 1, padding: 20 }}>
                        <Text > There is no data available</Text>
                    </View>}

            </View>

        )
    }
}


const Pagestyles = StyleSheet.create({

    container: { alignSelf: 'center', justifyContent: 'center', },
    listContainer: { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5, borderRadius: 7, marginBottom: 7, width: deviceWidth / 1.1 },
    cardText: {
        alignSelf:
            'flex-end', textAlignVertical: 'top', textAlign: 'right'
    }
})

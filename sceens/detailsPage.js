import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import axios from "axios";
import { API, COUNTRY, KEY, TOP_HEADLINES, CATEGORY, EG, BUSINESS } from "../functions/config";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class detailsPage extends Component {
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
        // console.log(this.state.data);
        console.log(this.state.data)
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

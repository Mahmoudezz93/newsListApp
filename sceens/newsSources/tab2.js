import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import axios from "axios";
import { API, COUNTRY, KEY, TOP_HEADLINES, CATEGORY, EG, BUSINESS, SOURCES } from "../../functions/config";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Loader from '../loader';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class tab2 extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [], isReady: false, page: 1, fetching_from_server: false, endThreshold: 2,
        refreshing: false,
    }

    componentDidMount = async () => {
        await this.setState({ isReady: false });
        const { navigation } = this.props;
        await this.Get_News('reset');
        await this.setState({ isReady: true });
    }


    Get_News = async (mode) => {                                        // Get the different Sources for News // 
        this.setState({ fetching_from_server: true });
        const token = this.state.token;
        if (mode == 'reset') {
            await axios
                .get(API + TOP_HEADLINES + "/" + SOURCES + "?" + "page=1" + "&apiKey=" + KEY)
                .then(result => {
                    this.setState({
                        data: result.data.sources,
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
                    //console.log("iamhere")
                    if (result.data.sources.length > 0) {
                        this.setState({
                            data: [...this.state.data, ...result.data.sources]
                        })
                        this.setState({ page: this.state.page + 1 })

                    } else {
                        //   console.log("endreached")
                    }
                })
                .catch(error => {
                    // console.log(error.response.data.error);
                });
        }
        this.setState({ fetching_from_server: false });

    }


    _onRefresh = () => {
        this.setState({ refreshing: true });                           // on refresh when pull to refresh the list // 
        this.Get_News('reset').then(() => {
            this.setState({ refreshing: false });
        });
    }






    render() {

        return (
            this.state.isReady ?
                <View padder style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'black', justifyContent: 'flex-start' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, justifyContent: 'center', padding: 7, textAlign: 'left', fontWeight: 'light', color: 'white' }}>Top Sources</Text>
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
                                    <TouchableWithoutFeedback
                                        onPress={() => this.props.navigation.navigate("SourceHeadlines", {
                                            data: value.id,             // Navigate next with the payload ( data )
                                        })}
                                        key={index} data={value} >
                                        <View style={[Pagestyles.listContainer]} >


                                            <View style={[{ paddingHorizontal: 1, width: deviceWidth / 1.1 }]}  >
                                                <Text numberOfLines={2} ellipsizeMode='tail' style={[Pagestyles.cardText, { fontWeight: 'bold', color: 'white', fontSize: 20 }]}>{value.name} </Text>
                                                <Text numberOfLines={2} style={Pagestyles.cardText}>{value.description}</Text>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={Pagestyles.cardText}>Category: {value.category}</Text>
                                                <Text numberOfLines={1} ellipsizeMode='tail' style={Pagestyles.cardText}>country: {value.country}, language: {value.language}</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            }
                            }
                        />
                        :
                        <View style={{ alignContent: "center", alignSelf: "center", justifyContent: "center", flex: 1, padding: 20, }}>
                        <Text style={{color:'white'}} > There is no data available</Text>
                    </View>}

                </View>
                : <Loader />
        )
    }
}


const Pagestyles = StyleSheet.create({

    container: { alignSelf: 'center', justifyContent: 'center', },
    listContainer: { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5, borderRadius: 7, marginBottom: 7, width: deviceWidth / 1.1, padding: 5, backgroundColor: '#2b2b2b' },
    cardText: {
        alignSelf:'flex-start', textAlign: 'left', paddingEnd: 3, color: 'white'
    }
})

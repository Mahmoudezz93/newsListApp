import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import axios from "axios";
import { API, COUNTRY, KEY, TOP_HEADLINES, CATEGORY, EG, BUSINESS, SOURCES } from "../../functions/config";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import Loader from "../loader"
import Icon from 'react-native-vector-icons/MaterialIcons';
const Default_image = require("../../assets/no_image.jpg");

//redux 
import { connect } from "react-redux";
import { addItem, deleteItem, setItems } from "../../store/actions/index";

class sourceHeadlines extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [], isReady: false, page: 1, fetching_from_server: false, endThreshold: 2, refreshing: false,
        source: '', dateNow: ''
    }

    componentDidMount = async () => {
        await this.setState({ isReady: false });
        const { navigation } = this.props;
        const Data = this.props.route.params.data
        await this.setState({ source: Data, });
        await this.Get_News('reset');
        const today = new Date();
        await this.setState({
            dateNow: today,
            isReady: true
        });
    }


    Get_News = async (mode) => {                                                    // Get news from the selected source 
        this.setState({ fetching_from_server: true });
        const token = this.state.token;
        if (mode == 'reset') {
            await axios
                .get(API + TOP_HEADLINES + "?" + SOURCES + "=" + this.state.source + "&" + "page=1" + "&apiKey=" + KEY)
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
            // console.log('get data of page -> ' + this.state.page)
            await axios
                .get(API + TOP_HEADLINES + "/" + SOURCES + "=" + this.state.source + "&" + this.state.page + "&apiKey=" + KEY)
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
                    //    console.log(error.response.data.error);
                });
        }
        this.setState({ fetching_from_server: false });

    }


    _onRefresh = () => {                                                           // on refersh the UI List 
        this.setState({ refreshing: true });
        this.Get_News('reset').then(() => {
            this.setState({ refreshing: false });
        });
    }

    Procced = async (headline) => {                                                // add the headline to cart and navigate to the details page 
        // console.log("will added to cart")

        await this.AddToCart(headline);
        //  console.log("added to cart")
        await this.props.navigation.navigate("SourceDetails", { data: headline, })
    }

    AddToCart = async (value) => {                                                 // add the post to the redux cart 
        let item = value;
        const newItem = {
            id: item.source.id ? item.source.id : null,
            name: item.source.name,
            author: item.author,
            note: item.note,
            title: item.title,
            description: item.description,
            url: item.url,
            urlToImage: item.urlToImage,
            publishedAt: item.publishedAt,
            content: item.content,
            viewdAt: this.state.dateNow                                         // date of viewing the post // 
        }
        await this.props.OnAdd(newItem);
        console.log(this.props.RX_items);
    }




    render() {

        return (
            this.state.isReady ?
                <View padder style={Pagestyles.pageContainer}>
                    <View style={Pagestyles.headerContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row', padding: 12, alignItems: 'center' }}>
                            <Icon name={"arrow-back-ios"} size={20} color={"white"} />
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', fontSize: 18, justifyContent: 'center', padding: 7, textAlign: 'center', fontWeight: 'light', color: 'white' }}>Top headlines</Text>

                        <Icon name={"arrow-back-ios"} size={20} color={"black"} />

                    </View>

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
                                let date = new Date(value.publishedAt);
                                let newDate = date.toISOString().substring(0, 10);
                                return (
                                    <TouchableWithoutFeedback onPress={() => this.Procced(value)} key={index} data={value} >
                                        <View style={[Pagestyles.listContainer, !value.urlToImage ? { height: deviceWidth / 3 } : null]} >
                                            {value.urlToImage ?
                                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                                    <TouchableOpacity onPress={() => this.Procced(value)}  >
                                                        <Image resizeMode={'cover'} source={{ uri: value.urlToImage }} defaultSource={Default_image}
                                                            style={Pagestyles.imageStyle} />
                                                    </TouchableOpacity>

                                                </View>
                                                : null}
                                            <View style={[{ paddingHorizontal: 1, width: deviceWidth / 1.1 }]}  >
                                                <Text numberOfLines={3} ellipsizeMode='tail' style={Pagestyles.cardText}>{value.title},{value.author} </Text>
                                                <Text numberOfLines={1} ellipsizeMode='tail'
                                                    style={Pagestyles.cardText}>{newDate}</Text>

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

                </View> : <Loader />
        )
    }
}

const Pagestyles = StyleSheet.create({

    pageContainer: { flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'black', justifyContent: 'flex-start' },
    headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 5 },
    container: { alignSelf: 'center', justifyContent: 'center', },
    listContainer: { alignSelf: 'center', alignItems: 'center', justifyContent: "flex-start", marginVertical: 10, borderRadius: 7, marginBottom: 7, width: deviceWidth / 1.1, height: deviceWidth / 1.2, backgroundColor: '#2b2b2b' },
    imageStyle: { width: deviceWidth / 1.1, height: deviceWidth / 1.9, borderTopRightRadius: 7, borderTopLeftRadius: 7, zIndex: 20, marginBottom: 7 },
    cardText: {
        alignSelf: "auto", paddingHorizontal: 3, fontSize: 16, textAlignVertical: 'top', color: 'white'
    }
})






const mapStateToProps = state => {
    return {
        RX_items: state.cart.items,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        OnAdd: item => { dispatch(addItem(item)) },
        OnRemove: item => { dispatch(deleteItem(item)) },
        OnSetAll: items => { dispatch(setItems(items)) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(sourceHeadlines);

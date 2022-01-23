import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import axios from "axios";
import { API, COUNTRY, KEY, TOP_HEADLINES, CATEGORY, EG, BUSINESS } from "../../functions/config";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
//redux 
import { connect } from "react-redux";
import { addItem, deleteItem, setItems } from "../../store/actions/index";
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class tab1 extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        data: [], isReady: false, page: 1,
        fetching_from_server: false,
        endThreshold: 2,
        refreshing: false, dateNow: ''
    }

    componentDidMount = async () => {
        await this.setState({ isReady: false });
        const { navigation } = this.props;
        await this.Get_News('reset');
        const today = new Date();
        await this.setState({
            dateNow: today,
            isReady: true
        });
    }


    Get_News = async (mode) => {
        this.setState({ fetching_from_server: true });
        const token = this.state.token;
        if (mode == 'reset') {
            await axios
                //  console.log(API+ TOP_HEADLINES + COUNTRY + EG + CATEGORY+ BUSINESS + "page=1" + "&apiKey=" + KEY)
                .get(API + TOP_HEADLINES + "?" + COUNTRY + EG + CATEGORY + BUSINESS + "page=1" + "&apiKey=" + KEY)
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

    Procced = async (headline) => {
        console.log("will added to cart")

        await this.AddToCart(headline);
        console.log("added to cart")
        await this.props.navigation.navigate("headlineDetails", { data: headline, })
    }

    AddToCart = async (value) => {
        let item = value;
        const newItem = {
            id: item.source.id ? item.source.id : null ,
            name: item.source.name,
            author: item.author,
            note: item.note,
            title: item.title,
            description: item.description,
            url: item.url,
            urlToImage: item.urlToImage,
            publishedAt: item.publishedAt,
            content: item.content,
            viewdAt: this.state.dateNow
        }
        await this.props.OnAdd(newItem);
        console.log(this.props.RX_items);
    }


    render() {

        return (
            <View padder style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'black', justifyContent: 'flex-start' }}>
                <Text style={{ alignSelf: 'center',fontSize:18, justifyContent: 'center', padding: 7, textAlign: 'left', fontWeight: 'light',color:'white' }}>What's New?</Text>

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
                            let newDate =  date.toISOString().substring(0, 10);
                            return (
                                <TouchableWithoutFeedback onPress={() => this.Procced(value)} key={index} data={value} >
                                    <View style={[Pagestyles.listContainer,!value.urlToImage?{height:deviceWidth/3}: null]} >
                                        {value.urlToImage ?
                                            <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                                <TouchableOpacity onPress={() => this.Procced(value)}  >
                                                    <Image resizeMode={'cover'} source={{ uri: value.urlToImage }}
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

            </View>

        )
    }
}


    const Pagestyles = StyleSheet.create({

        container: { alignSelf: 'center', justifyContent: 'center', },
        listContainer: {  alignSelf: 'center', alignItems: 'center', justifyContent:"flex-start", marginVertical: 10, borderRadius: 7, marginBottom: 7, width: deviceWidth / 1.1,height:deviceWidth/1.2,backgroundColor:'#2b2b2b' },
        imageStyle:{width:deviceWidth/1.1,height:deviceWidth/1.9,borderTopRightRadius:7,borderTopLeftRadius:7,zIndex:20,marginBottom:7} ,
        cardText: {
            alignSelf:"auto",paddingHorizontal:3,fontSize:16, textAlignVertical: 'top',color:'white'
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


export default connect(mapStateToProps, mapDispatchToProps)(tab1);


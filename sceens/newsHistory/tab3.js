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
const Default_image = require("../../assets/no_image.jpg");
import Loader from "../loader";

class tab3 extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        data: [], isReady: false, page: 1, fetching_from_server: false, endThreshold: 2,
        refreshing: false, dateNow: ''
    }

    componentDidMount = async () => {
        await this.setState({ isReady: false });
        const { navigation } = this.props;
        await this.setState({ data: this.props.RX_items });                 // reciveing data from the cart 
        //  console.log("daa", this.state.data)
        const today = new Date();
        await this.setState({
            dateNow: today,
            isReady: true
        });
        //  console.log("today is ", this.state.dateNow)
    }

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.setState({ data: this.props.RX_items });
        this.setState({ refreshing: false });

    }

    Procced = async (headline) => {                                         // navigate next to the details page 
        // console.log("will added to cart")                                                

        await this.AddToCart(headline);
        //console.log("added to cart")
        await this.props.navigation.navigate("HistoryDetails", { data: headline, })
    }

    AddToCart = async (value) => {                                          // add to cart again to update the view date 
        let item = value;
        const newItem = {
            id: item.id ? item.id : null,
            name: item.name,
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
            this.state.isReady ?
                <View padder style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'black', justifyContent: 'flex-start' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, justifyContent: 'center', padding: 7, textAlign: 'left', fontWeight: 'light', color: 'white' }}>User History</Text>
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
                                                        <Image resizeMode={'cover'} source={{ uri: value.urlToImage ? value.urlToImage : Default_image }} defaultSource={Default_image}
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
                        <View style={{ alignContent: "center", alignSelf: "center", justifyContent: "center", flex: 1, padding: 20, }}>
                            <Text style={{color:'white'}} > There is no data available</Text>
                        </View>}

                </View> : <Loader />

        )
    }
}


const Pagestyles = StyleSheet.create({

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



export default connect(mapStateToProps, mapDispatchToProps)(tab3);


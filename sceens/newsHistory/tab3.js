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

class tab3 extends Component {

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
        await this.setState({ data: this.props.RX_items });
        console.log("daa", this.state.data)
        const today = new Date();
        await this.setState({
            dateNow: today,
            isReady: true
        });
    }

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.setState({ data: this.props.RX_items });
        this.setState({ refreshing: false });
        
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
            viewdAt: this.state.dateNow
        }
        await this.props.OnAdd(newItem);
        console.log(this.props.RX_items);
    }


    render() {

        return (
            <View padder style={{ flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'lightgrey', justifyContent: 'flex-start' }}>
                <Text style={{ alignSelf: 'flex-start', justifyContent: 'center', padding: 7, textAlign: 'left', fontWeight: 'bold' }}>User history </Text>

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
                            return (
                                <TouchableWithoutFeedback key={index} data={value} >
                                    <View style={[Pagestyles.listContainer, { backgroundColor: "white" }]} >
                                        {value.urlToImage ?
                                            <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                                <TouchableOpacity onPress={() => this.Procced(value)}  >
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


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { View, text, Image, Navigation } from "../ui";
import { connect } from 'react-redux';
import axios from 'axios';
import { API_ENDPOINT } from '../configs'
import { responsiveWidth, responsiveHeight } from './utils/responsiveDimensions';
import ImageViewer from 'react-native-image-zoom-viewer';

class MySwiper extends Component {

    state = {
        data: [],
        loading: false
    }

    componentDidMount() {
        if (!this.props.data)
            this.loadAllChieldrens();
        else
            this.setState({ data: this.props.data })
    }

    loadAllChieldrens() {
        this.setState({ loading: true })
        axios.get(this.props.uri, {
            headers: {
                'Accept-Language': this.props.lang,
            },
        })
            .then(response => {
                this.setState({ data: Array.isArray(response.data) ? response.data : response.data.data, loading: false, })
            }).catch(error => {
                this.setState({ loading: false, })
            })
    }



    render() {
        return (
            <Swiper  {...this.props} autoplayTimeout={5} autoplay={this.props.zoom?false:true} dot={this.props.dot ? this.props.dot : null} removeClippedSubviews={false} key={this.state.data.length}
                activeDot={this.props.activeDot ? this.props.activeDot : null} style={{ height: this.props.height?responsiveHeight(this.props.height):responsiveHeight(25), width: this.props.width ? responsiveWidth(this.props.width) : responsiveWidth(85) }}  >
                {!this.props.zoom?
                    this.state.data && this.state.data.map((elemnet, index) => {
                    if (elemnet.image) {
                        return (
                            <Image resizeMode={this.props.resizeMode?this.props.resizeMode:'contain'} key={index} source={{ uri: `${elemnet.image}` }}
                                flex width={this.props.imgaeWidth ? this.props.imgaeWidth : 100} height={100} borderRadius={this.props.borderRadius?this.props.borderRadius:0}
                            />
                        )
                    }
                    else
                        return (
                            <Image resizeMode={this.props.resizeMode?this.props.resizeMode:'contain'} key={index} source={{ uri: `${elemnet}` }}
                                flex stretch width={this.props.imgaeWidth ? this.props.imgaeWidth : 100} height={100} borderRadius={this.props.borderRadius?this.props.borderRadius:0} />
                        )
                }):
                this.state.data && this.state.data.map((elemnet, index) => {
                    return (
                        <ImageViewer  imageUrls={[{ url: `${API_ENDPOINT}${elemnet.image?elemnet.image:elemnet}`}]} />
                    )
                })
                }
            </Swiper>
        );
    }
}

const mapStateToProps = state => {
    return {
        rtl: state.lang.rtl,
        lang: state.lang.lang
    }
}

export default connect(mapStateToProps)(MySwiper);
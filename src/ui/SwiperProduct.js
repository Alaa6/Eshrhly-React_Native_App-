import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import { View, text, Image } from ".";
import { connect } from 'react-redux';
import axios from 'axios';
import { responsiveWidth, responsiveHeight } from './utils/responsiveDimensions';
class SwiperProduct extends Component {
    state = {
        data: [],
        loading: false
    }

    componentDidMount() {
        this.loadAllChieldrens();
    }

    loadAllChieldrens() {
        this.setState({ loading: true })
        axios.get(this.props.uri)
            .then(response => {
                this.setState({ data: Array.isArray(response.data.imgs) ? response.data.imgs : response.data.data.imgs, loading: false, })
            }).catch(error => {
                this.setState({ loading: false, })
            })
    }


    render() {
        return (
            <Swiper {...this.props} autoplay={true} loop autoplayTimeout={1} style={{ height: responsiveHeight(30), width: responsiveWidth(100) }}  >
                {this.state.data && this.state.data.map((elemnet, index) => {
                    return (
                        <Image key={index} source={{ uri: elemnet }} flex resizeMode="stretch" stretch width={100} height={100} />
                    )
                })}
            </Swiper>
        );
    }
}

const mapStateToProps = state => {
    return {
        rtl: state.lang.rtl,
    }
}

export default connect(mapStateToProps)(SwiperProduct);
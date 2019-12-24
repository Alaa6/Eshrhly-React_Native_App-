//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, ScrollView, Tabs } from '../../ui';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';

import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header'
import Search from '../Search/Search'
import Home from  '../Home/Home'
import Profile from '../Profile/Profile'
import ContactUs from '../ContactUs/ContactUs'



class MyFavorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 4.5,

        }

    }

    onBack = () => {
        Navigation.pop();
    }

    renderItem = ({ item }) => (
        <View flex row stretch center mh={0} mt={10} mb={0} elevation bc={'#eeeeee'}>

            <Text mb={10} bold >{I18n.t('Enter')}</Text>

            <Text mt={10}>{I18n.t('phone')}</Text>
            <Input   {...injectFormProps('phone')} mh={25} mv={5} flex stretch bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                phone borderRadius={30} placeholderColor={'#F7931E'} />

            <Text mt={10}>{I18n.t('password')}</Text>
            <Input  {...injectFormProps('password')} mh={25} flex stretch mv={5} bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                borderRadius={30} secure bold />

            <Text mv={10} style={{ textDecorationLine: 'underline' }} color={'primary'} >{I18n.t('visitor')}</Text>
            <Button mv={15} center width={40} size={5} borderRadius={10} title={I18n.t('Enter')} height={7} onPress={handleSubmit} backgroundColor={'primary'} />
        </View>
    );

    render() {
        const { user } = this.props;
        return (
            <View flex stretch backgroundColor='white' centerX>
                <Header hideBack gradient backgroundColor="primary" />

                <Icon name='arrowleft' type='ant' color='gray' size={11} ml={120} mt={7} onPress={this.onBack} />

                <Text mb={20} bold size={8} color='#020202'>{I18n.t('My Favorite')}</Text>

                <ScrollView flex stretch >

                    <View flex row  mt={10} elevation={4} bc={'#eeeeee'} bw={1} mh={5} borderRadius={15} mb={1}>
                         
                         <View flex stretch mv={7} mh={7}>
                            <Image source={require('../../assets/images/bg.png')} width={12} height={6.5} borderRadius={15} mh={3} />


                            <StarRating

                                disabled={true}
                                maxStars={5}
                                rating={this.state.starCount}
                                //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                fullStarColor='#fabc30'
                                emptyStarColor='white'
                                emptyStar={'star'}
                                starStyle={{ padding: 2  }}
                                reversed={this.props.rtl}
                                starSize={10}
                            />
                        </View>

                        <Text size={4} flex   stretch mb={7} mr={33} >كريم عيسي عيسي</Text>

                        



                        <Button width={25} size={4.5} borderRadius={10} title={I18n.t('Re-request')} height={3} backgroundColor={'primary'} mh={5} mb={25} />
                    </View>



                </ScrollView>

               
            </View >
        );
    }
}

const mapStateToProps = state => ({
    rtl: state.lang.rtl,
    lang: state.lang.lang,
    processing: state.auth.processing
})

export default connect(mapStateToProps, { loginRequest })(MyFavorites);
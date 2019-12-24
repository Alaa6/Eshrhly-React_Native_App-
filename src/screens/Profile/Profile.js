//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, ScrollView, showError, showInfo, Swiper, List, Form, responsiveWidth, responsiveHeight, Indicator, moderateScale, TextArea } from '../../ui';
import { connect } from 'react-redux';

import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header';
import StarRating from 'react-native-star-rating';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {


        };
    }


    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    onBack() {
        Navigation.pop();
    }
    burgerBtnPress = () => {

        Navigation.openMenu(this.props.componentId);

    }


    render() {
        const { user } = this.props;
        return (
            <View backgroundColor='white' stretch flex center >

                <Header hideBack gradient backgroundColor="primary" />
                <View row reverse stretch center mt={5} >
                    <Icon name='arrowleft' type='ant' color='gray' size={11} mt={7} onPress={this.onBack} ph={60} />
                    <Icon name='menu' type='entypo' color='gray' size={11} onPress={this.burgerBtnPress} ph={55} />
                </View>

                <ScrollView flex stretch >

                    <Image source={require('../../assets/images/user.png')} width={40} height={20} borderRadius={100} mt={10} centerSelf  />
                    <Text mv={5} size={7} stretch center bold> user name</Text>




                    <View row stretch mh={25}>
                    <Icon name='map-marker-alt' type='fontisto' size={11} color={'primary'} mh={3.5} mv={8} />
                        <Text mh={3}> address</Text>
                    </View>

                    <View row stretch mh={25}>
                        <Icon name='email' type='material-community' size={11} color={'primary'} mh={3.5} mv={8} />
                        <Text mh={3}>{ 'Email' }</Text>
                    </View>

                    <View row stretch mh={25}>
                        <Icon name='cellphone-iphone' type='material-community' size={11} color={'primary'} mh={3.5} mv={8} />
                        <Text mh={3}>{ 'Phone' }</Text>
                    </View>
                    <View row stretch mh={25}>
                        <Icon name='book' type='entypo' size={11} color={'primary'} mh={3.5} mv={8} />
                        <Text mh={3}>{I18n.t('Date')}</Text>
                    </View>
                    <View row stretch mh={25}>
                        <Icon name='graduation-cap' type='font-awesome' size={11} color={'primary'} mh={3.5} mv={8} />
                        <Text mh={3}>{I18n.t('Date')}</Text>
                    </View>
                   
                   

                 

                    <View row stretch mh={20}>
                        <Text mh={3} bold>{I18n.t('About me')}</Text>
                    </View>

                    <View stretch height={25} borderRadius={20} mh={10} bw={1} bc={'#eeeeee'} mv={7} mh={15} mb={50}>
                        <Text></Text>
                    </View>

                   





                </ScrollView>





            </View >
        );
    }
}


// <Header hideBack gradient backgroundColor="primary" />

// <View row reverse stretch center mt={5} >
//     <Icon name='arrowleft' type='ant' color='gray' size={11} mt={7} onPress={this.onBack} ph={60} />
//     <Icon name='menu' type='entypo' color='gray' size={11} onPress={this.burgerBtnPress} ph={55} />
// </View>

// <ScrollView stretch   center  backgroundColor={'blue'} height={100} >
// <Image source={require('../../assets/images/user.png')} width={40} height={20} borderRadius={100} mt={10} />
// <Text mv={5} size={7}> user name</Text>

// <View flex stretch>

// <View  stretch  mh={25}>

// <View row mv={7} flex={.70}>
// <Icon name='map-marker-alt' type='fontisto' size={11} color={'primary'} onPress={this.onHeartPress} />
// <Text mh={3} size={6} bbw={1} >{I18n.t('Add to favorite')}</Text>

// </View>
// <View row  mv={7}>
// <Icon name={this.state.heart} type='ant' size={11} color={'primary'}   onPress={this.onHeartPress} />
// <Text mh={3} size={6} bbw={1} >{I18n.t('Add to favorite')}</Text>

// </View>
// <View row  mv={7}>
// <Icon name={this.state.heart} type='ant' size={11} color={'primary'}  onPress={this.onHeartPress} />
// <Text mh={3} size={6} bbw={1} >{I18n.t('Add to favorite')}</Text>

// </View>
// <View row mv={7}>
// <Icon name={this.state.heart} type='ant' size={11} color={'primary' } onPress={this.onHeartPress} />
// <Text mh={3} size={6} bbw={1} >{I18n.t('Add to favorite')}</Text>

// </View>
// <View row mv={30}>
// <Icon name={this.state.heart} type='ant' size={11} color={'primary'}  onPress={this.onHeartPress} />
// <Text mh={3} size={6} bbw={1} >{I18n.t('Add to favorite')}</Text>


// </View>


// </View>

// <View backgroundColor={'red'} stretch flex={.30}>
// <Button height={7} width={40} size={5} centerSelf borderRadius={10} title={I18n.t('Rating')} gradient mt={5} flex stretch />
// </View>





// </View>




// </ScrollView>




const mapStateToProps = state => ({
    rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Profile);
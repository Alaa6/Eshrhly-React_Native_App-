//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, ScrollView, showError, showInfo, Swiper, List, Form, responsiveWidth, responsiveHeight, Indicator, moderateScale, TextArea } from '../../ui';
import { connect } from 'react-redux';

import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header';
import StarRating from 'react-native-star-rating';


class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 2 ,
            heart: 'hearto' ,
        
        };
    }

    
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    onBack(){
        Navigation.pop();  
    }
    onHeartPress =()=>{

       if(this.state.heart==='hearto')
       { 
           this.setState({
            heart: "heart"
        });
       }
       else{
        this.setState({
            heart: "hearto"
        });

       }

    }




    render() {
        const { user } = this.props;
        return (
            <View backgroundColor='white' centerX stretch flex>
                <Header hideBack gradient backgroundColor="primary" />

                <Icon name='arrowleft' type='ant' color='gray' size={11} ml={120} mt={7} onPress={this.onBack} />

                <Text mb={20} bold size={8} color='#020202'>{I18n.t('Rating')}</Text>

                <Image source={require('../../assets/images/user.png')} width={40} height={20} borderRadius={100} mt={10} />
                <View mt={20}>

                    <StarRating

                        disabled={false}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                        fullStarColor='#96D007'
                        emptyStarColor='#ebf7df'
                        emptyStar={'star'}
                        starStyle={{ padding: 9 }}
                        reversed ={this.props.rtl}
                    />

                </View>

                <View row >
                    <Icon name={this.state.heart} type='ant' size={11} color={'primary'} mh={3.5} mv={8} onPress={this.onHeartPress} />
                    <Text mh={3} size={6} bbw={1} >{I18n.t('Add to favorite')}</Text>

                </View>

                <Button height={7} width={40} size={5} centerSelf borderRadius={10} title={I18n.t('Rating')} gradient mt={30} />


            </View >
        );
    }
}



const mapStateToProps = state => ({
    rtl: state.lang.rtl,
  });
  
  export default connect(mapStateToProps)(Rating);
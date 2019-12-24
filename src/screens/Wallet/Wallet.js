//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, ScrollView, showError, showInfo, Swiper, List, Form, responsiveWidth, responsiveHeight, Indicator, moderateScale, TextArea } from '../../ui';
import { connect } from 'react-redux';

import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header'


class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }

    }

    onSubmit = () => {
        Navigation.push('RequestDetails')

    }

    
    onBack = () => {
 
        Navigation.pop();
     
    
        
    }



    render() {
        const { user } = this.props;
        return (
            <View backgroundColor='white' centerX stretch flex>
                <Header hideBack gradient backgroundColor="primary" />

                <Icon name='arrowleft' type='ant' color='gray' size={11} ml={120} mt={7} onPress={this.onBack} />

                <Text mb={20} bold size={8} color='#020202'>{I18n.t('Wallet')}</Text>


                    <View  stretch elevation={2} borderRadius={10} backgroundColor={'primaryLight'}  centerY mh={7} pv={4} ph={5} mt={10} height={23}>


                        <View  stretch mv={4} center  >

                            <View  bbw={1} bbc={'primary'} stretch >
                            <Text size={8} bold stretch center  mv={7}> 50 ريال </Text>             


                            </View>

                      
                             <Text size={7} mv={7}  >{I18n.t('Available balance')} </Text>
                         

                        </View>






                    


                    </View>

                 
                    <Button height={7} width={40} size={6} centerSelf borderRadius={10} title={I18n.t('Use now')} gradient mv={50}  />


                  


            </View >
        );
    }
}



export default Wallet;
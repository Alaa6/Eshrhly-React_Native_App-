//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, ScrollView, showError, showInfo, Swiper, List, Form, responsiveWidth, responsiveHeight, Indicator, moderateScale, TextArea } from '../../ui';
import { connect } from 'react-redux';

import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header'
import Checkbox from '../../components/CheckBox';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';

class ChooseRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // cca2: 'SA',
            // callingCode: '966',
            // countryNamwe: 'Saudi Arabia',
            // text: '',
            // phone: '',
            // PriceModal: false,
        }

    }

  

    openTeacherRegisterScreen = () => {
        Navigation.push('TeacherRegister');

    }



    render() {
        const { user } = this.props;
        return (
            <View backgroundColor='white' center stretch flex>



               
           <Text mv={15} bold size={20} color='primary' >{I18n.t('Eshrhly')}</Text>
              <Text mv={15} bold size={8} color='primary'>{I18n.t('Choose register')}</Text>



                <View row stretch center>
                

                    <View borderRadius={20}  >
                        <Image source={require('../../assets/images/bg.png')} width={40} borderRadius={15} height={20} mh={3} center>
                            <Text stretch center size={11} bold color={'white'} mh={10}>{I18n.t('Student')}</Text>
                        </Image>


                    </View>

                    <View borderRadius={20} onPress={this.openTeacherRegisterScreen} >
                        <Image source={require('../../assets/images/bg.png')} width={40} height={20} borderRadius={15} mh={3} center >
                        <Text stretch center size={11} bold color={'white'}>{I18n.t('Teacher')}</Text>

                        </Image>
                    </View>


                </View>






            </View >
        );
    }
}




const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(ChooseRegister);
//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, ScrollView, showError, showInfo, Swiper, List, Form, responsiveWidth, responsiveHeight, Indicator, moderateScale } from '../../ui';
import { connect } from 'react-redux';
import { validationSchema } from './validation';
import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header'
import Checkbox from '../../components/CheckBox';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cca2: 'SA',
            callingCode: '966',
            countryNamwe: 'Saudi Arabia',
            text: '',
            phone: '',
            PriceModal: false,
        }

    }

    onSubmit = async (values, { submitValues, setSubmitting }) => {
        Navigation.init('Login', {
            rtl: this.props.rtl,
            sideMenu: 'SideMenu',
            name: 'SearchTab'
        });
    }

    renderForm = ({ injectFormProps, handleSubmit }) => (
        <View flex stretch center mh={0} mt={10} mb={0}>
               
                    <Text mb={10} bold >{I18n.t('Enter')}</Text>
            
                    <Text mt={10}>{I18n.t('phone')}</Text>
                    <Input   {...injectFormProps('phone')} mh={25} mv={5} flex stretch bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                        phone borderRadius={30} placeholderColor={'#F7931E'} />

                    <Text mt={10}>{I18n.t('password')}</Text>
                    <Input  {...injectFormProps('password')} mh={25} flex stretch mv={5}bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                        borderRadius={30} secure bold />
             
                <Text mv={10} style={{textDecorationLine:'underline'}} color={'primary'} >{I18n.t('visitor')}</Text> 
                <Button  mv={15} center width={40} size={5}  borderRadius={10} title={I18n.t('Enter')} height={7} onPress={handleSubmit}  backgroundColor={'primary'} />          
        </View>
    );

    render() {
        const { user } = this.props;
        return (
            <View flex stretch backgroundColor='white' centerX>
                <ScrollView flex stretch >

              
          
                <Form
                    schema={{
                        phone: '',
                        password: '',
                        type: 'CLIENT'
                    }}
                    validationSchema={validationSchema}
                    render={this.renderForm}
                    onSubmit={this.onSubmit}
                />
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

export default connect(mapStateToProps, { loginRequest })(Login);
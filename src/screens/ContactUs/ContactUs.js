//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, ScrollView, showError, showInfo, Swiper, List, Form, responsiveWidth, responsiveHeight, Indicator, moderateScale, TextArea } from '../../ui';
import { connect } from 'react-redux';
import { validationSchema } from './validation';
import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header'
import Checkbox from '../../components/CheckBox';
import CountryPicker, {
    getAllCountries
} from 'react-native-country-picker-modal';

class ContactUs extends Component {
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
        // Navigation.init('MAIN_STACK', {
        //     rtl: this.props.rtl,
        //     sideMenu: 'SideMenu',
        //     name: 'Home',
        // });
    }

    renderForm = ({ injectFormProps, handleSubmit }) => (
        <View stretch   mh={12} height={100}  >
            
               

                <Input   {...injectFormProps('name')}  mv={5} stretch bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                    borderRadius={10} placeholderColor={'black'} placeholder={I18n.t('Name')} height={6} />

                <Input   {...injectFormProps('email')} mv={5}  stretch bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                     borderRadius={10} placeholderColor={'black'} placeholder={I18n.t('Email')} height={6} />
                <Input  {...injectFormProps('city')} mv={5}  stretch bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                     borderRadius={10} placeholderColor={'black'} placeholder={I18n.t('City')} height={6} />
                <TextArea  {...injectFormProps('message')} mv={5} stretch bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                     borderRadius={10} placeholderColor={'black'} placeholder={I18n.t('Message content')} pt={15} mb={20}/>


            
       <Button height={7} width={40} size={5} centerSelf  borderRadius={10} title={I18n.t('Send')}  onPress={handleSubmit} gradient />

          


            
        </View>

    );

    render() {
        const { user } = this.props;
        return (
            <View flex stretch backgroundColor='white' centerX >
                <Header hideBack gradient backgroundColor="primary" />
                <Icon name='arrowleft' type='ant' color='gray' size={11} ml={120} mt={7} />
                <Text  mb={20} bold size={8}>{I18n.t('Contact Form')}</Text>
                <ScrollView flex stretch >



                    <Form
                        schema={{
                            name: '',
                            email: '',
                            city: '',
                            message: ''

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

export default connect(mapStateToProps, { loginRequest })(ContactUs);
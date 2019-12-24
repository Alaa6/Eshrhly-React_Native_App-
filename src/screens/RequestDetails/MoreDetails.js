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

class MoreDetails extends Component {
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

    onBack = () => {
        Navigation.pop('RequestDetails')

    }



    render() {
        const { user } = this.props;
        return (
            <View backgroundColor='white' centerX stretch flex>
                <Header hideBack gradient backgroundColor="primary" />

                <Icon name='arrowleft' type='ant' color='gray' size={11} ml={120} mt={7} onPress={this.onBack} />

                <Text mb={20} bold size={8} color='#020202'>{I18n.t('Request Details')}</Text>

                <ScrollView flex stretch >



                    <View stretch flex elevation={3} borderRadius={10} bc={'primary'} bw={1} centerY mh={7} pv={4} ph={5}>


                        <View row stretch mv={4}  >
                            <View flex={.5}>
                                <Text size={6} bold > {I18n.t('Teacher Name')} </Text>
                            </View>
                            <View flex={.5}>
                                <Text size={5}  color='#6c6a6a' >‫عيسى‬ ‫عيسى‬ ‫كريم‬ </Text>
                            </View>

                        </View>

                        <View row stretch mv={4}>
                            <View flex={.5}>
                                <Text size={6} bold > {I18n.t('Qualifications and Certifications')} </Text>
                            </View>
                            <View flex={.5} >
                                <Text size={5} color='#6c6a6a' >{`الحمد لله وسبحان الله والله اكبر ولا حول ولا قوة الا بالله`}‬</Text>
                            </View>
                        </View>

                        <View row stretch mv={4} >
                            <View flex={.5}>
                                <Text size={6} bold > {I18n.t('Skills and Experiences')} </Text>
                            </View>
                            <View flex={.5} >
                                <Text size={5}  color='#6c6a6a' >  ‫وتربية‬ ‫علوم‬ ‫بكالريوس‬ </Text>
                            </View>
                        </View>


                    </View>




                </ScrollView>

            </View >
        );
    }
}




const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(MoreDetails);
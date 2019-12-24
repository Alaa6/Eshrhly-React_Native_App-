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

class RequestDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    onSubmit = () => {
        // Navigation.init('MAIN_STACK', {
        //     rtl: this.props.rtl,
        //     sideMenu: 'SideMenu',
        //     name: 'Home',
        // });
        Navigation.push('MoreDetails');
    }

    onBack() {
        Navigation.pop();
    }






    render() {
        const { user } = this.props;
        return (
            <View backgroundColor='white' centerX stretch flex>
                <Header hideBack gradient backgroundColor="primary" />
                <Icon name='arrowleft' type='ant' color='gray' size={11} ml={120} mt={7} onPress={this.onBack} />
                <Text mb={20} bold size={8} color='#020202'>{I18n.t('My requests')}</Text>
                <ScrollView flex stretch >

                    <View flex row center mt={10} elevation={4} bc={'#eeeeee'} bw={1} mh={5} borderRadius={15} mb={1}>



                        <View row mh={5} >

                            <View >
                                <Text size={5} stretch width={100} center mt={5}> {I18n.t('Teacher Name')} </Text>
                                <View mv={5} bw={1} bc={'primary'} size={5} backgroundColor={'primaryLight'}
                                    borderRadius={7} height={6} width={40}   >
                                    <Text color='#6c6a6a' mt={3} stretch width={100} center>اي حاجة</Text>
                                </View>


                            </View>
                            <View>
                                <Text size={5} stretch width={100} center mt={5}> {I18n.t('Date')} </Text>
                                <View mv={5} bw={1} bc={'primary'} backgroundColor={'primaryLight'} size={5}
                                    borderRadius={7} height={6} width={40} mh={5} color='#6c6a6a' >
                                    <Text color='#6c6a6a' mt={3} stretch width={100} center>اي حاجة</Text>
                                </View>


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

export default connect(mapStateToProps)(RequestDetails);
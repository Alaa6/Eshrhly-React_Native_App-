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
            // cca2: 'SA',
            // callingCode: '966',
            // countryNamwe: 'Saudi Arabia',
            // text: '',
            // phone: '',
            // PriceModal: false,
        }

    }

    onSubmit =() => {
        // Navigation.init('MAIN_STACK', {
        //     rtl: this.props.rtl,
        //     sideMenu: 'SideMenu',
        //     name: 'Home',
        // });
        Navigation.push('MoreDetails');
    }

  

    
  

    render() {
        const { user } = this.props;
        return (
            <View backgroundColor='white' centerX stretch flex>
                <Header hideBack gradient backgroundColor="primary" />
                <Icon name='arrowleft' type='ant' color='gray' size={11} ml={120} mt={7}  />
                <Text mb={20} bold size={8} color='#020202'>{I18n.t('Request Details')}</Text>
                <ScrollView flex stretch >
                <View flex stretch height={100} stretch ph={7} >
            <View stretch elevation={3} borderRadius={10} bc={'primaryGray'} bw={1} >

                <View row mh={5} >

                    <View >
                        <Text size={5} stretch width={100} center mt={5}> {I18n.t('Teacher Name')} </Text>
                        <View mv={5} bw={1} bc={'primary'} size={5} backgroundColor={'primaryLight'}
                            borderRadius={7} height={6} width={40}   >
                            <Text color='#6c6a6a' mt={3}  stretch width={100} center>اي حاجة</Text>
                        </View>


                    </View>
                    <View>
                        <Text size={5} stretch width={100} center mt={5}> {I18n.t('Date')} </Text>
                        <View   mv={5} bw={1} bc={'primary'} backgroundColor={'primaryLight'} size={5}
                            borderRadius={7} height={6} width={40} mh={5} color='#6c6a6a' >
                            <Text color='#6c6a6a' mt={3}  stretch width={100} center>اي حاجة</Text>
                        </View>


                    </View>

                </View>

                <View row mh={5}>
                    <View>
                        <Text size={5} stretch width={100} center mt={5}> {I18n.t('Subject')} </Text>
                        <View   mv={5} bw={1} bc={'primary'} backgroundColor={'primaryLight'} size={5}
                            borderRadius={7} height={6} width={40} color='#6c6a6a' >
                            <Text color='#6c6a6a' mt={3}  stretch width={100} center> اي حاجة</Text>
                        </View>


                    </View>

                    <View>

                        <Text size={5} stretch width={100} center mt={5}> {I18n.t('Class')} </Text>
                        <View   mv={5} bw={1} bc={'primary'} backgroundColor={'primaryLight'} size={5}
                            borderRadius={7} height={6} width={40} mh={5} color='#6c6a6a' >
                            <Text color='#6c6a6a'mt={3}  stretch width={100} center> اي حاجة</Text>
                        </View>


                    </View>

                </View>

                <View row mh={5}>

                    <View>
                        <Text size={5} stretch width={100} center mt={5}> {I18n.t('Time clock')} </Text>
                        <View   mv={5} bw={1} bc={'primary'} backgroundColor={'primaryLight'} size={5}
                            borderRadius={7} height={6} width={40} color='#6c6a6a' >
                            <Text color='#6c6a6a'mt={3}  stretch width={100} center> اي حاجة </Text>
                        </View>


                    </View>
                    <View>

                        <Text size={5} stretch width={100} center mt={5}> {I18n.t('Price')} </Text>
                        <View   mv={5} bw={1} bc={'primary'} backgroundColor={'primaryLight'} size={5}
                            borderRadius={7} height={6} width={40} mh={5} color='#6c6a6a' >
                            <Text color='#6c6a6a' mt={3}  stretch width={100} center>اي حاجة</Text>
                        </View>


                    </View>


                </View>

                <Text stretch width={100} center size={5} mb={4}  onPress={this.onSubmit}> {I18n.t('More Details')} </Text>


            </View>






            <Button height={7} width={40} size={5} centerSelf borderRadius={10} title={I18n.t('End Process')} gradient mt={30} />






        </View>


                </ScrollView>

            </View >
        );
    }
}




const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(RequestDetails);

import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, ScrollView, showError, showInfo, Swiper, List, Form, responsiveWidth, responsiveHeight, Indicator, moderateScale } from '../../ui';
import { connect } from 'react-redux';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

class RowCharges extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }




    render() {
        const { user } = this.props;
        return (
            <View flex stretch bw={1} bc='#F3F3F3' borderRadius={15} mb={5} ph={5} pv={2} backgroundColor='white' >
                <View row spaceBetween stretch>

                    <View row stretch  flex >
                        <View stretch centerX mr={5} style={{ alignSelf: 'center' }} spaceBetween>
                            <View bw={1} bc='primary' circleRadius={4} center>
                                <Icon name={'dot-single'} type={'entypo'} color='black' size={10} />
                            </View>
                            <Text size={1} color='primary'>{'|'}</Text>
                            <Text size={1} color='primary'>{'|'}</Text>
                            <View bw={1} bc='primary' circleRadius={4} center></View>
                        </View>
                        <View stretch flex>
                            <Text color='primaryLight' size={4}>{'من ( اسبانيا )'}</Text>
                            <Text color='primaryLight' size={4}>{'الي ( السعودية )'}</Text>
                        </View>
                    </View>
                    <Text size={5} style={{alignSelf:'flex-start'}}>{`${I18n.t('Loadcapacityavailable')} 32 KG`}</Text>
                </View>
                <View row mt={2} bbw={1} bc='border' stretch>
                    <Icon name='calendar' type='ant' color='primary' size={5} />
                    <Text color='black' ml={3} pb={3} size={4}>{`${I18n.t('Dateofarrivaltime')}  ${moment().format('DD/MM/YYYY - hh:mm A')}`}</Text>
                </View>
                <View stretch row spaceBetween pv={2}>
                    <View row>
                        <Image width={10} backgroundColor='black' height={6} source={require('../../assets/images/avatar.png')} />
                        <Text size={5} ml={3}>{'اسم المسافر'}</Text>
                    </View>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#FBB03B', '#FA7F2B']} style={{
                        flex: .48, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', borderRadius: 10
                    }}>
                        <View stretch row
                            center backgroundColor='transparent' onPress={() => { }}
                        >
                            <Text color='white' >{I18n.t('request')}</Text>

                        </View>
                    </LinearGradient>
                </View>
            </View >
        );
    }
}

const mapStateToProps = state => ({
    rtl: state.lang.rtl,
    lang: state.lang.lang,
    processing: state.auth.processing
})

export default connect(mapStateToProps, {})(RowCharges);
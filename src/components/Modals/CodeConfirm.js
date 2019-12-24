import React, { Component } from 'react';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, responsiveFontSize, Input, ScrollView, showError, showInfo, Swiper, List, Form, responsiveWidth, responsiveHeight, Indicator, moderateScale, getColors } from '../../ui';

import axios from 'axios';
import { API_ENDPOINT } from '../../configs';
import { connect } from 'react-redux';
import CodeInput from 'react-native-confirmation-code-input';
import { loginRequest } from '../../actions/auth';

class ModalCode extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 59,
            processing: false,
            code: '',
            phone: '123456789',
            callingCode: '996'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible && !this.props.visible) {
            this.counter()
        }
    }

    counter() {
        if (this.state.count <= 0) {
            return;
        }
        setTimeout(() => {
            this.setState({ count: this.state.count - 1 });
            this.counter();
        }, 1000);
    }

    resend() {
        axios.post(`${API_ENDPOINT}/signin`, { countryCode: this.props.callingCode, phone: this.props.phone }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': this.props.lang,
            },
        }).then(async response => {
            console.log("RESPONSE:::: ", response);
            this.setState({ count: 59 });
            this.counter();
        }).catch((error) => {
            console.log(error.response);
            if (!error.response) {
                showError(I18n.t('ui-networkConnectionError'));
                return;
            }
            if (error.response.data.errors) {
                showError(error.response.data.errors);
            }
            else {
                showError(I18n.t('ui-error-happened'));
            }
        })
    }

    _onFulfill(code) {
        
        if (code === '') {
            showInfo(I18n.t('enterCode'));
            return;
        }
        Navigation.init('MAIN_STACK', {
            rtl: this.props.rtl,
            sideMenu: 'SideMenu',
            name: 'Home',
        });
        // this.setState({ processing: true, code: code });
        // axios.post(`${API_ENDPOINT}/verifySignin`, { code: code, countryCode: this.props.callingCode, phone: this.props.phone }, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept-Language': this.props.lang,
        //     },
        // }).then(async response => {
        //     console.log("RESPONSE:::: ", response);
        //     this.setState({ processing: false });
        //     this.props.changeState(false);
        //     this.props.loginRequest(response);
        // }).catch((error) => {
        //     console.log(error.response);
        //     this.setState({ processing: false });
        //     if (!error.response) {
        //         showError(I18n.t('ui-networkConnectionError'));
        //         return;
        //     }
        //     if (error.response.data.errors) {
        //         showError(error.response.data.errors);
        //     }
        //     else {
        //         showError(I18n.t('ui-error-happened'));
        //     }
        // })
    }

    render() {
        return (
            <Modal
                isVisible={this.props.visible}
                transparent
                onRequestClose={() => {
                    this.props.changeState(false);
                }}
                useNativeDriver
                onBackdropPress={() => this.props.changeState(false)}
                onBackButtonPress={() => this.props.changeState(false)}
                style={{
                    alignSelf: 'center',
                }}
            >
                <View backgroundColor="white" width={85} height={40} borderRadius={10} >
                    <View p={5} stretch center>
                        <Text center size={6} color="secoundry">{I18n.t('phonecode')}</Text>
                        <Text center size={8} color="primary" stopTranslateNumbers>{`+${this.state.callingCode} ${this.state.phone}`}</Text>
                        <View stretch center mt={0}>
                            <CodeInput
                                keyboardType="decimal-pad"
                                activeColor={getColors().primary}
                                inactiveColor={'#F2F2F2'}
                                ref="codeInputRef1"
                                secureTextEntry
                                autoFocus={true}
                                className={'border-box'}
                                space={20}
                                codeLength={4}
                                inputPosition='center'
                                onFulfill={(code) => this._onFulfill(code)}
                                backgroundColor={'#F2F2F2'}
                                borderRadius={10}
                                size={50}
                                containerStyle={{ marginTop: 5 }}
                                codeInputStyle={{ borderWidth: 1.5, fontSize: responsiveFontSize(9), color: getColors().primary }}
                            />
                        </View>

                        <View row spaceBetween stretch mt={32}>
                            <Button stretch width={35} size={5} backgroundColor={'primary'} title={I18n.t('Authenticate')} radial
                                borderRadius={10} onPress={() => { this._onFulfill(this.state.code) }} touchableOpacity processing={this.state.processing} />
                            <Button stretch width={35} size={5}
                                title={this.state.count > 0 ? this.state.count > 9 ? `00:${this.state.count}` : `00:0${this.state.count}` : I18n.t('resend')}
                                radial secondary borderRadius={10}
                                onPress={this.state.count > 0 ? undefined : () => { }} touchableOpacity />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    rtl: state.lang.rtl,
    lang: state.lang.lang,
    token: state.auth.token
})

export default connect(mapStateToProps, { loginRequest })(ModalCode);


import React, { Component } from 'react';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import { View, Text, Button, Indicator, Image, moderateScale, Icon, showError, Navigation } from '../../ui';
import axios from 'axios';
import { RNToasty } from 'react-native-toasty';
import { API_ENDPOINT } from '../../configs';
import { Linking } from 'react-native';
import Communications from 'react-native-communications';

export default class NewConcept extends Component {
    state = {

    };

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
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                }}
            >
                <View stretch center style={{ alignSelf: 'center' }} width={100} backgroundColor='transparent' >

                    <View stretch backgroundColor="white" center borderRadius={15} mh={10}>

                        {/* <Image width={25} height={15} resizeMode="stretch" source={require('../../assets/images/logocompany.jpg')} /> */}

                        <View width={12} bw={2} bc={'#20607C'} borderRadius={3} />
                        <Text ph={5} size={5} color={'#AAAAAA'} mt={7} bold>{'visit our site'}</Text>
                        <Text ph={5} size={6} color={'black'} bold mt={3} mb={5}
                            onPress={() => Linking.openURL('https://newconcept-group.com/')}
                        >
                            {'newconcept-group.com'}
                        </Text>
                        <View stretch row mt={5} backgroundColor={'#20607C'} height={6} >
                            <View flex stretch center
                                backgroundColor={'#20607C'}
                                touchableOpacity
                                onPress={() => {
                                    Communications.email(['newconceptgroup2030@gmail.com'], null, null, 'My Subject', 'My body text')
                                }}
                            >
                                <Icon name="email" type='material' pv={3} color={'white'} />
                            </View>
                            <View flex stretch center
                                backgroundColor={'#20607C'}
                                touchableOpacity
                                blw={2} brw={2} bc={'white'}
                                onPress={() => Linking.openURL('whatsapp://send?phone=+201021178793')}
                            >
                                <Icon name="whatsapp" type='font-awesome5' color={'white'} />
                            </View>
                            <View flex stretch center
                                backgroundColor={'#20607C'}
                                touchableOpacity
                                onPress={() => {
                                    Communications.phonecall('+201021178793', true)
                                }}
                            >
                                <Icon name="phone" type='font-awesome' color={'white'} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal >
        );
    }

}

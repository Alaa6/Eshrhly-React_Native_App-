
import React, { Component } from 'react';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import { View, Text, Button, Indicator, Image, moderateScale, Icon, Navigation } from '../../ui';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class ModalLogout extends Component {
    state = {
        processing: false,
    };

    render() {
        return (
            <Modal
                isVisible={this.props.visible}
                transparent
                presentationStyle={'fullScreen'}
                onRequestClose={() => {
                    this.props.changeState(false);
                }}
                useNativeDriver
                onBackdropPress={() => this.props.changeState(false)}
                onBackButtonPress={() => this.props.changeState(false)}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >

                <View stretch center style={{ alignSelf: 'center' }} width={100} height={100} backgroundColor='transparent'  >
                    <View backgroundColor={'#FFFFFF'} style={{ opacity: 0.9, zIndex: -1, position: 'absolute', width: '100%', height: '100%' }}></View>
                    <View flex stretch center>
                        <Text size={6} color="#000000DE" pv={2} >{I18n.t('logout1')}</Text>
                        <Text size={7} color="#000000DE" pv={2} center >{I18n.t('wantLogout')}</Text>
                        <View width={65} spaceBetween center row mt={10}>
                            <Button title={I18n.t('cancel')} backgroundColor="#464646" width={30} touchableOpacity height={5} center size={5} elevation={4}
                                onPress={() => this.props.changeState(false)} />

                            <Button title={I18n.t('confirm')} backgroundColor="primary" width={30} touchableOpacity height={5} center size={5} elevation={4}
                                onPress={() => { this.props.logout() }} processing={this.state.processing} />

                        </View>
                    </View>

                </View>

            </Modal>
        );
    }
}
export default connect(null, { logout })(ModalLogout);
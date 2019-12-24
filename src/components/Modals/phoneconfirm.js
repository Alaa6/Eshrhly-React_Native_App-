
import React, { Component } from 'react';
import Modal from 'react-native-modal';
import I18n from 'react-native-i18n';
import { View, Text, Button, Indicator, Image, moderateScale, Icon, Navigation } from '../../ui';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class ModalLogout extends Component {
    state = {
      mobilenumber:'+966 123456789',
    

    };

    render() {
        return (
            <Modal
          
                isVisible={this.props.visible}
                transparent
                presentationStyle={'overFullScreen'}
                onRequestClose={() => {
                    this.props.changeState(false);
                }}
                useNativeDriver
                onBackdropPress={() => this.props.changeState(false)}
                onBackButtonPress={() => this.props.changeState(false)}
                style={{
                    justifyContent: 'center',
                    margin: 0,
                }}
            >

                <View stretch flx  center style={{ alignSelf: 'center' }} width={85} height={32} backgroundColor='#FFFFFF'  borderRadius={10} >
                    <View backgroundColor={'#FFFFFF'} style={{ opacity: 0.9, zIndex: -1, position: 'absolute', width: '100%', height: '100%' }}></View>
                    <View flex stretch center>
                        <Text size={6} color="#000000DE"  pv={2} >{I18n.t('phoneconfirm')}</Text>
                        <Text size={8} color="#000000DE" pv={2}  color={'primary'} center >{this.state.mobilenumber}</Text>
                        <View width={65}  center row mt={10}>
                        <Button  pv={10} bold pb={7} borderRadius={10}  title={I18n.t('confirm')}
                         onPress={()=>this.props.onDone()}
                        backgroundColor="primary" width={32} touchableOpacity height={7} center size={6} elevation={4}
                                />
                            <Button pv={10} bold pb={7} borderRadius={10}  ml={10} title={I18n.t('edit')} backgroundColor="#333333" width={32} touchableOpacity height={7} center size={6} elevation={4}
                                />

                            

                        </View>
                    </View>

                </View>

            </Modal>
        );
    }
}
export default connect(null, { logout })(ModalLogout);
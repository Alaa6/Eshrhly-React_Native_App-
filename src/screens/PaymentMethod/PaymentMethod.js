//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, TextArea, ScrollView, RadioGroup } from '../../ui';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header'
import Checkbox from '../../components/CheckBox';
import RadioButton from '../../components/RadioButton'


class RequestDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {


            selected: false,

            type: 'visa'

        }

    }



    onBack = () => {

        Navigation.pop();
    }

    onRadioButtonSelected = () => {
        if (this.props.type === 'visa') {
            this.setState({ selected: true });


        }
        else {
            this.setState({ selectedCash: true, type: 'cash' });

        }


    }







    render() {
        const { type } = this.props;

        return (
            <View backgroundColor='white' centerX stretch flex>
                <Header hideBack gradient backgroundColor="primary" />
                <Icon name='arrowleft' type='ant' color='gray' size={11} ml={120} mt={7} onPress={this.onBack} />
                <Text mb={20} bold size={8} color='#020202'>{I18n.t('Payment method')}</Text>
                <ScrollView flex stretch >
                    <View flex stretch height={100} stretch ph={7} >
                        <View stretch elevation={2} borderRadius={10} bc={'primary'} bw={1} mb={1} backgroundColor={'primaryLight'}>
                            <View center stretch row>
                                <Icon name='cash-multiple' type='material-community' color='primary' size={15} mh={15} mt={7} onPress={this.onBack} />
                                <Icon name='cc-visa' type='font-awesome' color='primary' size={11} mt={7} mh={15} onPress={this.onBack} />

                            </View>

                            <View row stretch center mt={7} mb={3}  >

                                <RadioButton

                                    type='visa'
                                    status={this.state.type === 'visa' ? true : false}
                                    onPress={
                                        () => {
                                            this.setState({ type: 'visa' })

                                        }}
                                />
                                <RadioButton
                                    type='cash'
                                    status={this.state.type === 'cash' ? true : false}
                                    onPress={
                                        () => {
                                            this.setState({ type: 'cash' })

                                        }}
                                />

                            </View>




                        </View>

                        <Text color={'gray'} stretch size={8} center mt={30}> {'AMOUNT'} </Text>
                        <Text stretch center size={11}> {'R.S 1,000'} </Text>

                        <View stretch  center mv={3} >
                            <Input mh={10} mv={2} stretch bw={1} bc={'primary'} backgroundColor={'primaryLight'} size={7}
                        placeholderColor={'gray'} placeholder={'CARD HOLDRʼS NAME'} style ={{ TextAlign : 'left'}}/>

                            <Input mh={10} mv={.1} stretch bw={1} bc={'primary'} backgroundColor={'primaryLight'} size={7}
                                placeholderColor={'gray'} placeholder={'CARD NUMBER'} style ={{ TextAlign : 'left'}}/>

                            <View row mv={2} >
                                <View bw={1} bc={'primary'} backgroundColor={'primaryLight'} size={5}
                                    placeholderColor={'gray'} width={39} mh={.7} height={7} />

                                <View stretch bw={1} bc={'primary'} backgroundColor={'primaryLight'} size={5}
                                    placeholderColor={'gray'} width={39} height={7} />


                            </View>

                        </View>

                        <Button height={7} width={40} size={5} centerSelf borderRadius={10} title={I18n.t('Payment')} gradient mt={30} />


                    </View>


                </ScrollView>

            </View >
        );
    }
}




const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(RequestDetails);
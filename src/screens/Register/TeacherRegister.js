//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Input, ScrollView, showError, showInfo, Swiper, List, Form, Picker ,TextArea } from '../../ui';
import { connect } from 'react-redux';
import { validationSchema } from './validation';
import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header'
import Checkbox from '../../components/CheckBox';


class TeacherRegister extends Component {
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
        Navigation.push('Login');
    }

    onBack = () => {
        Navigation.pop();

    }

    renderForm = ({ injectFormProps, handleSubmit }) => (
        <View stretch mh={0} mb={0} >


            <Text mt={3} mh={30}>{I18n.t('Teacher Name')}</Text>
            <Input   {...injectFormProps('phone')} mh={25} mv={4} stretch bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                borderRadius={30} placeholderColor={'#F7931E'} height={6} />




            <Text mv={2} mh={30}> {I18n.t('Nationality')} </Text>
            <Picker mv={4} bw={1} bc={'primary'} size={5}
                borderRadius={30} height={7} mh={5} width={70} mh={23} >

            </Picker>



            <View >
                <Text mv={2} mh={30}> {I18n.t('City')} </Text>
                <Picker mv={5} bw={1} bc={'primary'} size={5}
                    borderRadius={30} height={7} mh={5} width={70} mh={23} >

                </Picker>
            </View>




            <Text mt={10} mh={30}>{I18n.t('Bank account number')}</Text>
            <Input  {...injectFormProps('password')} mh={25} flex stretch mv={5} bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                borderRadius={30} secure bold />

            <Text mt={10} mh={30}>{I18n.t('Select educational levels')}</Text>

            <View row mh={25}>
                <View mv={5} bw={1} bc={'primary'} size={5}
                    borderRadius={30} height={7} width={70}  >

                </View>
                <Icon name='add-circle' type='material' color='primary' size={13} />


            </View>

            <Text mt={10} mh={30}>{I18n.t('Select learning materials')}</Text>

            <View row mh={25}>
                <View mv={5} bw={1} bc={'primary'} size={5}
                    borderRadius={30} height={7} width={70}  >

                </View>
                <Icon name='add-circle' type='material' color='primary' size={13} />


            </View>




            <Text mt={10} mh={30}>{I18n.t('Set class price')}</Text>
            <Input   {...injectFormProps('phone')} mh={25} mv={5} stretch bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                borderRadius={30} placeholderColor={'#F7931E'} height={6} />

            <Text mt={10} mh={30}>{I18n.t('Attach certification')}</Text>

            <View row mh={25}>
                <View mv={5} bw={1} bc={'primary'} size={5}
                    borderRadius={30} height={15} width={70}  center>
            <Icon name='cloud-upload' type='material-community' color='primaryLight' size={35} />


                </View>


            </View>


            <Text mt={10} mh={30}>{I18n.t('Attach identity')}</Text>

            <View row mh={25}>
                <View mv={5} bw={1} bc={'primary'} size={5}
                    borderRadius={30} height={15} width={70}  center>
            <Icon name='cloud-upload' type='material-community' color='primaryLight' size={35} />


                </View>


            </View>


            <Text mt={10} mh={30}>{I18n.t('Upload profile picture')}</Text>

            <View row mh={25}>
                <View mv={5} bw={1} bc={'primary'} size={5}
                    borderRadius={30} height={15} width={70}  center>
            <Icon name='photo' type='font-awesome' color='primaryLight' size={25} />
            <Icon name='photo' type='font-awesome' color='primaryLight' size={25} />

                </View>


            </View>


            <Text mt={10} mh={30}>{I18n.t('About educational qualification')}</Text>
            <TextArea   {...injectFormProps('phone')} mh={25} mv={5} stretch bw={1} bc={'primary'} backgroundColor={'transparent'} size={5}
                borderRadius={30} placeholderColor={'#F7931E'}  />




            <Button mv={15} centerSelf width={40} size={5} borderRadius={10} title={I18n.t('Save')} height={7} onPress={handleSubmit} backgroundColor={'primary'} />
        </View>
    );

    render() {
        const { user } = this.props;
        return (
            <View flex stretch backgroundColor='white' centerX>
                <Header hideBack gradient backgroundColor="primary" />
                <Icon name='arrowleft' type='ant' color='gray' size={11} ml={120} mt={7} onPress={this.onBack} />
                <Text mb={20} bold size={9} color='gray'>{I18n.t('Register')}</Text>
                <ScrollView flex stretch >



                    <Form
                        schema={{
                            phone: '',
                            password: '',
                            type: 'CLIENT'
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

export default connect(mapStateToProps, { loginRequest })(TeacherRegister);
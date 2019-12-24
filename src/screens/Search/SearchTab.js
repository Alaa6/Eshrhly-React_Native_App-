

//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, Button, Icon, Image, Navigation, Tabs } from '../../ui';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header'
import Search from './Search'
import Home from  '../Home/Home'
import Profile from '../Profile/Profile'
import ContactUs from '../ContactUs/ContactUs'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }

    }

    
    render() {
        const { user } = this.props;
        return (
            <View flex stretch backgroundColor='white' centerX >

                <Tabs   showUnderLine  bottom backgroundColor={'white'} >
                       

                       
                        <Home      icon ={{name :'home' , type :'ant'  ,color:'white'}} /> 
                        <Search    icon ={{name :'search' , type :'feather'}} centermargin />
                        <ContactUs icon ={{name :'phone-call' , type :'feather'}} centermargin/>
                        <Profile  icon ={{name :'user' , type :'ant'}} />
                    
                    </Tabs>

                
            </View >
        );
    }
}

const mapStateToProps = state => ({
    rtl: state.lang.rtl,
    lang: state.lang.lang,
    processing: state.auth.processing
})

export default connect(mapStateToProps, { loginRequest })(Login);




//UserLogin
import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { View} from '../../ui';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/auth';
import Header from '../../components/Header'
import MapView from 'react-native-maps';

import StyleSheet from 'react-native'

// AIzaSyBwfhcE1YQLG6tE8rHEHFxU_ldjyUljDqI
class MyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    onSubmit = async (values, { submitValues, setSubmitting }) => {
        // Navigation.init('MAIN_STACK', {
        //     rtl: this.props.rtl,
        //     sideMenu: 'SideMenu',
        //     name: 'Home',
        // });
    }



    render() {
       // const { user } = this.props;
        return (
            <View   stretch flex>
                <MapView
                    style={{width :'100%' , height: '100%' ,flex:1 , top:0 ,bottom:0 ,right:0 ,left :0 ,position: 'absolute'}}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />

            </View >
        );
    }
}




const mapStateToProps = state => ({
 
});

export default connect(mapStateToProps)(MyMap);
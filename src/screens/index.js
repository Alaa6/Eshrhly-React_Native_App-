import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View } from '../ui';
import { Provider } from 'react-redux';
import store from '../store';
import { MenuProvider } from 'react-native-popup-menu';



import SideMenu from '../components/SideMenu';
import Login from './Login/Login';
import Contact from './ContactUs/ContactUs';
import RequestDetails from './RequestDetails/RequestDetails';
import MoreDetails from './RequestDetails/MoreDetails';
import Search from './Search/Search'
import Rating from './Rating/rating'
import Wallet from './Wallet/Wallet'
import MyRequests from './MyRequests/MyRequests'
import MyFavorites from './MyFavorites/MyFavorites'
import SearchTab from './Search/SearchTab';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import ChooseRegister from './Register/ChooseRegister';
import TeacherRegister from './Register/TeacherRegister';

export default function () {

    const createScene = (InternalComponent, name = '') => () =>
        gestureHandlerRootHOC(
            class SceneWrapper extends Component {
                render() {
                    return (
                        <Provider store={store}>
                            <MenuProvider>
                                <SafeAreaView style={{ backgroundColor: '#FBB03B', flex: 1 }}>
                                    <View stretch flex backgroundColor="white">
                                        <InternalComponent {...this.props} />
                                    </View>
                                </SafeAreaView>
                            </MenuProvider>
                        </Provider>
                    );
                }
            },
        );

    Navigation.registerComponent('SideMenu', createScene(SideMenu, 'SideMenu'));
    Navigation.registerComponent('Login', createScene(Login));
    Navigation.registerComponent('Contact', createScene(Contact));
    Navigation.registerComponent('RequestDetails', createScene(RequestDetails));
    Navigation.registerComponent('MoreDetails', createScene(MoreDetails));
    Navigation.registerComponent('Search', createScene(Search));
    Navigation.registerComponent('Rating', createScene(Rating));
    Navigation.registerComponent('Wallet', createScene(Wallet));
    Navigation.registerComponent('MyRequests', createScene(MyRequests));
    Navigation.registerComponent('MyFavorites', createScene(MyFavorites));
    Navigation.registerComponent('SearchTab', createScene(SearchTab));
    Navigation.registerComponent('Payment', createScene(PaymentMethod));
    Navigation.registerComponent('ChooseRegister', createScene(ChooseRegister));
    Navigation.registerComponent('TeacherRegister', createScene(TeacherRegister));
  
   
}  
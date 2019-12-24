import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { View as ReactView, Dimensions, Alert } from 'react-native';
import {
  View,
  Text,
  Button,
  Icon,
  Navigation,
  responsiveFontSize,
  moderateScale,
  ScrollView,
  Image
} from '../ui';
import { closeSocket } from '../actions/socket';
import { logout } from '../actions/auth';
import { API_ENDPOINT_PATH } from '../configs';
import { responsiveWidth, responsiveHeight } from '../ui/utils/responsiveDimensions';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient';
import Wallet from '../screens/Wallet/Wallet';
// import ModalLogin from './Modal/ModalLogin';

const shareOptions = {
  title: 'Share via',
  message: 'You must try this app',
  url: 'https://play.google.com/store/apps/details?id=com.newsmarty',
};

const shareOptionsAr = {
  title: 'مشاركه عن طريق',
  message: 'عليك أن تجرب هذا التطبيق',
  url: 'https://play.google.com/store/apps/details?id=com.newsmarty',
};

class SideMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      logout: false,
      visibleModalLogin: false,
    }
  }

  renderModalLogout() {
    return (
      this.props.rtl ?
        Alert.alert(
          'هل انت متأكد من تسجيل الخروج ؟',
          '',
          [
            // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
            {
              text: 'الغاء',
              onPress: () => {
                this.setState({ logout: false })
              },
              style: 'cancel',
            },
            {
              text: 'تسجيل الخروج', onPress: () => {
                this.setState({ logout: false })
                Navigation.init('MAIN_STACK', {
                  rtl: this.props.rtl,
                  name: 'Login',
                });
                this.props.logout();
                this.props.closeSocket();
              }
            },
          ],
          { cancelable: false },
        ) :
        Alert.alert(
          'Are you sure you want to sign out ?',
          '',
          [
            // { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
            {
              text: 'cancel',
              onPress: () => {
                this.setState({ logout: false })
              },
              style: 'cancel',
            },
            {
              text: 'logout', onPress: () => {
                this.setState({ logout: false })
                Navigation.init('MAIN_STACK', {
                  rtl: this.props.rtl,
                  name: 'Login',
                });
                this.props.logout();
                this.props.closeSocket();
              }
            },
          ],
          { cancelable: false },
        )
    )
  }

  renderItem = (name, iconName, iconType, onPress = () => { }, flag) => (
    <View row stretch onPress={onPress} mb={3} mh={1} ph={4} backgroundColor={'transparent'} >
      <View flex stretch row pv={4} btw={iconName === 'logout' ? 1 :0} btc={'primary'}>
        <View flex={.1} >
          <Icon name={iconName} type={iconType} color={iconName === 'log-out' ? '#FE4651' : "primary"} size={8} />
        </View>
        {/* <View ml={3} flex={.03} >
          <Text size={2} bold color='primary'>{'|'}</Text>
          <Text size={2} bold color='primary'>{'|'}</Text>
          <Text size={2} bold color='primary'>{'|'}</Text>
          <Text size={2} bold color='primary'>{'|'}</Text>
        </View> */}
        {/* <ReactView style={{
          flex:.85,
          borderRightWidth: 1,
          borderColor: "#FA7F2B",
          borderStyle: "dashed",
          // borderRadius: responsiveHeight(15/2),

          // alignItems: 'center',
          // justifyContent:'center'

        }}> */}
        <View flex={.87} >
          <Text pr={4} ml={4} stretch flex size={6} color={iconName === 'log-out' ? '#FE4651' : "black"} >

            {name}
          </Text>
        </View>
        {/* </ReactView> */}
      </View>
      {this.props.unSeenCount > 0 && flag ?
        <View stretch center circleRadius={7} backgroundColor="secondary">
          <Text color="white" center>{this.props.unSeenCount}</Text>
        </View> : null}
    </View>
  );

  render() {
    const { rtl, user, token } = this.props;
    return (
      <View flex stretch backgroundColor="white">


        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#99d162', '#5aa411']} style={{ width: '100%', height: '20%', justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
          {/* <Image style={{ width: responsiveWidth(50), height: responsiveHeight(20) }} resizeMode="contain"
            source={require('../assets/images/logo.png')} /> */}
          <Text mt={2} mh={2} color='white' size={20} numberOfLines={1}>{I18n.t("Eshrhly")}</Text>
          {/* <View row backgroundColor="white" ph={8} borderRadius={8} style={{ position: 'absolute', bottom: -responsiveHeight(3), elevation: 4, }}
            onPress={() => {
              Navigation.push('ProfilePersonly');
              Navigation.closeMenu(this.props.componentId)
            }} > */}
            {/* <Icon name={"plus"} type={"ant"} color={"#FA7F2B"} size={6} /> */}
            {/* <Text stretch flex color='#3FBE5F' pv={2} size={6}>{I18n.t('showProfile')}</Text>
          </View> */}
        </LinearGradient>


        <ScrollView flex stretch mv={50}  >

   
        {this.renderItem(I18n.t("Student Login"), 'book-reader', 'font-awesome5',
            () => { 
              Navigation.push('Payment');
              Navigation.closeMenu(this.props.componentId)
            })}
         
        {this.renderItem(I18n.t("My requests"), 'tasklist', 'oct',
            () => { 
              Navigation.push('MyRequests');
              Navigation.closeMenu(this.props.componentId)
            })}
          
        {this.renderItem(I18n.t("Wallet"), 'wallet', 'ant',
            () => {
              Navigation.push('Wallet');
              Navigation.closeMenu(this.props.componentId) })} 

         
        {this.renderItem(I18n.t("Favorite"), 'hearto', 'ant',
            () => { 
              Navigation.push('MyFavorites');
              Navigation.closeMenu(this.props.componentId)
            })}

          {this.renderItem(I18n.t("shareApp"), 'share', 'ion',
            () => { Share.open(rtl ? shareOptionsAr : shareOptions) })}

          {this.renderItem(I18n.t('Settings'), 'gear', 'font-awesome',
            () => {
              Navigation.push('Settings');
              Navigation.closeMenu(this.props.componentId)

            })}

          {this.renderItem(I18n.t('logout'), 'logout', 'ant',
            () => {
              this.setState({ logout: true })
            })}
          {/* {this.props.token ?
            <View row stretch mh={1} ph={4} onPress={() => {
              this.setState({ logout: true })
            }}>
              <Icon name={"log-out"} type={"entypo"} color={"red"} size={responsiveFontSize(3.5)} />
              <Text ph={4} stretch flex color='red' size={responsiveFontSize(2.5)}>{I18n.t('logout')}</Text>
            </View> :
            <View row stretch mh={1} ph={4} onPress={() => {
              Navigation.push({ name: 'Login', passProps: { shouldLogin: true } })
            }}>
              <Icon name={"login"} type={"entypo"} color={"secondary"} size={responsiveFontSize(3.5)} />
              <Text ph={17}  stretch flex color='secondary' size={responsiveFontSize(2.5)}>{I18n.t('login')}</Text>
            </View>} */}
          {/* <ModalLogin
            visible={this.state.visibleModalLogin}
            changeState={() =>
              this.setState({ visibleModalLogin: false })}
          /> */}
        </ScrollView>
        {this.state.logout ? this.renderModalLogout() : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  user: state.auth.user,
  token: state.auth.token,
  unSeenCount: state.chat ? state.chat.unSeenCount : 0,
});

export default connect(mapStateToProps, { logout, closeSocket })(SideMenu);

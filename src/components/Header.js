import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, View as ReactView, TouchableOpacity, Easing, Animated, StyleSheet } from 'react-native';
import { View, Text, Navigation, Button, Icon, Image, responsiveFontSize, Input, moderateScale, responsiveHeight, responsiveWidth, Picker } from '../ui';
import NewPicker from '../ui/NewPicker'
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Navigation as NativeNavigation } from 'react-native-navigation';
import Share from 'react-native-share';
import Axios from 'axios';
import { refreshList } from '../actions/list';
import { RNToasty } from 'react-native-toasty';
const APPBAR_HEIGHT = Platform.OS === 'ios' ? responsiveHeight(6.5) : responsiveHeight(7);
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 54 : 56;

class Header extends Component {
  constructor(props) {
    super(props);
    this.dataAr = [{ label: 'تجارة عامة', value: 'grneralTrade' }, { label: 'فعاليات', value: 'events' }, { label: 'تجارة إلكترونية', value: 'onlineStores' }];
    this.dataEn = [{ label: 'General Trading', value: 'grneralTrade' }, { label: 'Events', value: 'events' }, { label: 'Online Stores', value: 'onlineStores' }];
  }

  static propTypes = {
    showMenu: PropTypes.bool,
    hideBack: PropTypes.bool,
  };
  state = {
    // the Green background default value
    defaultScaleValue: new Animated.Value(1),
    // the White background default value
    searchScaleValue: new Animated.Value(0.01),
    // we will resolve the radius and diameter whitin onLayout callback
    radius: 0,
    diameter: 0,
    // it'll change zIndex after the animation is complete
    order: 'defaultFirst',
    isSearchActive: false,
    searchValue: '',
    searchValueOld: '',
    spinValue: new Animated.Value(0),
    isVisible: false,
    bgcolor: false,
    total: 0,
    data: null,
    notifPressed: false,
    visibleModalLogin: false,
  }
  //
  onSearchOpenRequested = () => {
    this.animateBackground(this.state.searchScaleValue, () => {
      // this is what we need to do when the animation is completed
      this.state.defaultScaleValue.setValue(0.01);
      // move default background above the search background (higher zIndex)
      this.setState({ order: 'searchFirst' });
    });
  }
  onSearchCloseRequested = () => {
    this.animateBackground(this.state.defaultScaleValue, () => {
      // this is what we need to do when the animation is completed
      this.state.searchScaleValue.setValue(0.01);
      // move default bcakground under the search background (lower zIndex)
      this.setState({ order: 'defaultFirst' });
    });
  }
  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    // pythagorean
    const radius = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2));
    let diameter = radius * 2;
    // because there is issue in react native that we can't set scale value to 0, we need to use
    // 0.01 and it means we still see the point even if the scale set to 0.01
    const bgPosition = width - radius; // the correct left position of circle background
    // we need circle to be bigger, then we won't see the 0.01 scaled point (because it'll be
    // out of screen)
    const pointSize = diameter * 0.01;
    diameter += pointSize;
    this.setState({
      bgPosition,
      radius: diameter / 2,
      diameter,
    });
  }
  animateBackground = (value, onComplete) => {
    Animated.timing(value, {
      toValue: 1,
      duration: 325,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start(onComplete);
  }
  renderAnimatedBackgrounds = (styles) => {
    const { diameter, bgPosition, radius, defaultScaleValue, searchScaleValue, order } = this.state;
    const bgStyle = {
      position: 'absolute',
      top: -radius,
      width: diameter,
      height: diameter,
      borderRadius: radius,
    };
    const bgSearch = (
      <Animated.View
        key="searchBackground"
        style={[bgStyle, {
          left: bgPosition,
          backgroundColor: '#FA7F2B',
          transform: [{ scale: searchScaleValue }],
        }]}
      />
    );
    const bgDefault = (
      <Animated.View
        key="defaultBackground"
        style={[bgStyle, {
          right: bgPosition,
          backgroundColor: this.state.bgcolor && "white",
          transform: [{ scale: defaultScaleValue }],
        }]}
      />
    );
    let content = null;
    if (order === 'defaultFirst') {
      content = [bgDefault, bgSearch];
    } else {
      content = [bgSearch, bgDefault];
    }
    return (
      <View style={StyleSheet.absoluteFill}>
        {content}
      </View>
    );
  }
  getSearchData = () => {
    if (this.state.searchValue === this.state.searchValueOld) {
      this.setState({ pressed: false })
      return;
    }
    else {
      Axios.get(this.props.apiRequest.url + 'name=' + this.state.searchValue, {
        headers: {
          'Accept-Language': this.props.lang,
        },
      }).then((response) => {
        console.log("123123", response.data.data)
        data = response.data.data;
        total = response.data.totalCount;
        this.props.apiRequest.response(data, total);
        this.setState({ data: data, total: response.data.totalCount, pressed: false, searchValueOld: this.state.searchValue })
      }).catch((error) => {
        console.log("dddddd", error.response)
        if (!error.response) {
          return;
        }
      });
    }
  }
  //====================
  goBack = () => {
    NativeNavigation.dismissAllModals();
    Navigation.pop();
    // HomeTabId = Navigation.HomeTabComponentId
    // Navigation.closeMenu(HomeTabId)
    // Navigation.setSideMenuVisibility('SideMenuSouq', false)
  };
  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }
  componentWillUnmount() {
    if (this.props.onRef) {
      this.props.onRef(undefined);
    }
  }
  //
  back = () => {
    this.setState({ isSearchActive: false, searchValue: '' });
    this.props.apiRequest.response(null, null);
    if (this.state.searchValue !== this.state.searchValueOld) {
      // this.props.refreshList(['Home', 'advertisingList'])
    }
    this.onSearchCloseRequested();
  };
  //
  toggleMenu = () => {
    Navigation.openMenu(this.props.componentId);
  };
  renderRight = () => {
    const { rtl, share, present, showNotification, hideBack, seaechHome, showSearch, close, filter, token, filterPress } = this.props;
    return (
      <View row reverse flex={0.2}>
        {share &&
          <Button
            leftIcon={
              <Icon name="share-alt" type='font-awesome' size={9} color='primary' />
            }
            backgroundColor="transparent"
            style={{ borderColor: 'transparent', borderWidth: 0 }}
            size={8}
            ph={5}
            onPress={() => {
              Share.open(share);
            }}>
          </Button>
        }
        {present &&
          <Button
            leftIcon={
              <Icon name="gift" type='ion' size={10} color='primary' />
            }
            backgroundColor="transparent"
            style={{ borderColor: 'transparent', borderWidth: 0 }}
            size={8}
            ph={5}
            onPress={() => {
            }}>
          </Button>
        }
        {filter &&
          <Button
            circleRadius={9} mh={3}
            leftIcon={<Icon flip name="filter" type='font-awesome' size={5.5} color='primary' />}
            backgroundColor="transparent"
            size={8}
            elevation={4}
            style={{ borderColor: 'transparent', borderWidth: 0 }}
            onPress={() => filterPress()}
          />}
        {showNotification &&
          <Button
            leftIcon={<Icon flip name="notifications" type={'ion'} size={10} color='secondary' />}
            backgroundColor="transparent"
            size={8}
            elevation={4}
            style={{ borderColor: 'transparent', borderWidth: 0 }}
            onPress={() => Navigation.push('Notifications')}
          />}
        {showSearch && (
          <Button
            leftIcon={<Icon name="search" type='font-awesome' color='primary' size={6} />}
            backgroundColor="transparent"
            size={8}
            style={{ borderColor: 'transparent', borderWidth: 0 }}
          // onPress={
          // seaechHome ?
          //   () => { Navigation.push('Search') }
          //   : () => {
          //     this.setState({ isSearchActive: true, bgcolor: true, });
          //     this.onSearchOpenRequested();
          //   }}
          />
        )}
      </View>
    );
  };
  renderLeft = () => {
    const { showMenu, hideBack, filter, color, back } = this.props;
    return (
      <View row reverse >
        {!hideBack &&
          <View row stretch center>
            <Button
             leftIcon={<Icon flip name="arrow-back" size={10} color={'white'} />}
            backgroundColor="transparent"
              size={10}
              style={{ borderColor: 'transparent', borderWidth: 0 }}
              onPress={this.goBack}
            />
            {back && <Text mb={5} color='primary'>{I18n.t('back')}</Text>}
          </View>
        }
        {showMenu &&
          <Button
            leftIcon={<Icon name="menu" size={10} color='red' />}
            backgroundColor="transparent"
            onPress={this.toggleMenu}
            width={14}
            style={{ borderColor: 'transparent', borderWidth: 0 }}
          />}
      </View>
    );
  }
  render() {
    const { centerTitle, showSearch, backgroundColor, color, image, rtl } = this.props
    const { isSearchActive, searchValue, total } = this.state;
    Animated.timing(this.state.spinValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: Platform.OS === 'android',
    }).start(() => { });
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 0],
    });
    return (
      <View
        stretch onLayout={this.onLayout}
        elevation={this.props.elevation}
        backgroundColor={isSearchActive ? "white" : backgroundColor ? backgroundColor : "secondary"}
        style={{
          height: APPBAR_HEIGHT,
        }}
        row
        spaceBetween
      >
        {showSearch ? this.renderAnimatedBackgrounds() : null}
        {this.state.isSearchActive ?
          <View row stretch spaceBetween >
            <Button
              leftIcon={<Icon flip name="arrow-forward" size={10} color={'white'} />}
              backgroundColor="transparent"
              size={9}
              style={{ borderColor: 'transparent', borderWidth: 0 }}
              onPress={this.back}
              width={14}
            />
            <Input placeholder={I18n.t('search')} bw={0} placeholderColor={'white'} backgroundColor={'transparent'}
              size={5} width={70} color={'white'}
              initialValue={this.state.searchValue}
              onChangeText={(value) => {
                this.setState({ searchValue: value });
                setTimeout(() => {
                  // this.setState({ isVisible: true },
                  this.getSearchData();
                }, 1000);
              }}>
            </Input>
            {!this.state.pressed && <Button
              leftIcon={<Icon name="search" type='ion' color='white' size={10} />}
              backgroundColor="transparent"
              size={8}
              ph={5} width={14}
              style={{ borderColor: 'transparent', borderWidth: 0 }}
              onPress={() => {
                this.setState({ pressed: true })
                this.getSearchData();
              }}
            />}
          </View>
          :
          <React.Fragment>
            <View flex={0.2}>{this.renderLeft()}</View>
            {/* <View width={100} centerX centerY style={{ position: 'absolute', alignSelf: 'center', zIndex: -100 }}> */}
            <View flex={0.6} centerX centerY style={{ alignSelf: 'center' }}>
              {image ?
                <Image height={3} stretch source={require('../assets/images/logo.png')} resizeMode={'contain'} center />
                :
                <Text size={7} color={color ? color : "white"} numberOfLines={1} >
                  {this.props.title}
                </Text>}
            </View>
            {/* </View> */}
            {/* </View> */}
            {this.renderRight()}
          </React.Fragment>
        }
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentUser: state.auth.user,
    isAdmin: state.auth.isAdmin,
    token: state.auth.token,
    lang: state.lang.lang,
    rtl: state.lang.rtl,
  }
};
export default connect(mapStateToProps, { refreshList })(Header);
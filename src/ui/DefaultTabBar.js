import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Animated, Platform } from 'react-native';

import View from './View';
import Icon from './Icon';
import Text from './Text';
import Button from './Button';

import { getTheme, getColors } from './Theme';
import { getThemeColor } from './utils/colors';
import { moderateScale, responsiveWidth, responsiveHeight, responsiveFontSize } from './utils/responsiveDimensions';
// import * as titleActions from '../actions/changeTitle';

class DefaultTabBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activePage: 0,
    }
  }

  static defaultProps = {
    ...getTheme().tabBar,
  };

  renderTab = (name, page, isActive, onPressHandler, icon, left, right, bgc, countNotification, index, customView,centermargin) => {
    const {
      activeTextColor,
      activeTextSize,
      activeTextBold,
      inactiveTextColor,
      inactiveTextSize,
      inactiveTextBold,
    } = this.props;
    const textColor = isActive ? getColors().primary : inactiveTextColor;
    const textSize = isActive ? activeTextSize : inactiveTextSize;
    const _textSize = activeTextSize;
    const textBold = isActive ? activeTextBold : inactiveTextBold;
    if (isActive) {
      // this.props.changeTitle(page);
    }
    return (
      <View key={index} flex stretch centerX  centerY  onPress={() => {
        onPressHandler(page);
        this.setState({ activePage: index });
      }}
        style={{ borderTopRightRadius: right ? moderateScale(10) : 0, borderTopLeftRadius: left ? moderateScale(10) : 0, backgroundColor: bgc }} >
        {countNotification && countNotification > 0 ?
          <View >
            <Text
              backgroundColor="red" centerX
              style={{ textAlign: 'center', position: 'absolute', top: 5, zIndex: 30000  }}
              circleRadius={5} color="white" size={5} >{countNotification}</Text>
          </View> : null}
        {icon ?
          <View stretch flex centerX centerY center backgroundColor='primary' mh={centermargin?.2:0}>
            {customView ?
              <View center backgroundColor='#FAFAFA' circleRadius={30} >
                <View center elevation={3} bc={'white'} bw={8} circleRadius={18} mt={-10}>
                  <View circleRadius={15} backgroundColor={getColors().secondary} center >
                    <Icon name={icon.name} type={icon.type} size={10} color={'white'} />
                  </View>
                </View>
              </View>
              :
              <React.Fragment>
                <Icon name={icon.name} type={icon.type} size={ isActive? 15 : 12} pv={0} color={'white'}/>   
                <Text size={5} color={'black'} pv={0}>{name}</Text>
              </React.Fragment>
            }
          </View>
          : <Text style={{ textAlign: 'center', alignSelf: 'center' }} size={6} color={'black'} >{name}</Text>}

      </View>
    );
  };

  render() {
    const {
      bgc,
      containerWidth,
      tabs,
      backgroundColor,
      decision,
      height,
      moreHeight,
      activePage,
      goToPage,
      scrollValue,
      rtl,
      underlineColor,
      underlineHeight,
      showUnderLine,
      compact,
      fullUnderLine
    } = this.props;

    const numberOfTabs = tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      left: fullUnderLine ? undefined : !compact ? this.props.rtl ? (containerWidth / numberOfTabs) / 2 - ((containerWidth / numberOfTabs) / 4) / 2 : (containerWidth / numberOfTabs) / 2 - ((containerWidth / numberOfTabs) / 4) / 2 : undefined,
      right: fullUnderLine ? undefined : !compact ? this.props.rtl ? (containerWidth / numberOfTabs) / 2 - ((containerWidth / numberOfTabs) / 4) / 2 : undefined : undefined,
      width: fullUnderLine ? (containerWidth / numberOfTabs) : compact ? ((containerWidth / numberOfTabs) - moderateScale(20)) : (containerWidth / numberOfTabs) / 4,
      height: underlineHeight,
      backgroundColor: getColors().primary,
      bottom: 0,
    };
    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, !compact ? containerWidth / numberOfTabs * (rtl ? -1 : 1) : ((containerWidth / numberOfTabs) - moderateScale(20)) * (rtl ? -1 : 1)],
    });
    const newHeight = moreHeight ? height + responsiveHeight(moreHeight) : height;
    

    return (
      <View row height={10} backgroundColor={backgroundColor?backgroundColor:'transparent'} mh={compact ? 20 : 0}  >
        {tabs.map((tab, index) => {
          var isTabActive = false;
          if (decision) {
            isTabActive = this.state.activePage === tab.page;
          }
          else {
            isTabActive = activePage === tab.page;
          }
          return this.renderTab(tab.label, tab.page, isTabActive, goToPage, tab.icon, tab.left, tab.right, bgc, tab.countNotification, index, tab.customView,tab.centermargin);
        })}
        {showUnderLine ? <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [{ translateX }],
            },
            this.props.underlineStyle,
          ]}
        /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,

});

export default connect(mapStateToProps)(DefaultTabBar);

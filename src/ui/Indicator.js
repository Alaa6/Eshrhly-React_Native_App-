import React, { PureComponent } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit'
import { FlatList, RefreshControl, View as NativeView } from 'react-native';

import {
  responsiveFontSize,
  moderateScale,
} from './utils/responsiveDimensions';
import { getThemeColor } from './utils/colors';
import { getTheme } from './Theme';

// TODO add customize types and shapes
// TODO insure all activityindicators are removed
export default class Indicator extends PureComponent {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
  };

  static defaultProps = {
    ...getTheme().indicator,
  };

  render() {
    const { color, mv, style, type } = this.props;
    color1 = getThemeColor(color)
    let { size } = this.props;
    // if (Platform.OS === 'ios') {
    //   size = 'small';
    // } else {
      size = responsiveFontSize(size);
    // }

    return (
      // <ActivityIndicator
      //   size={size}
      //   color={color}
      //   style={[style, { marginVertical: moderateScale(mv) }]}
      // />

      <Spinner style={[style, { marginVertical: mv ? moderateScale(mv) : 0 }]} isVisible={true} size={size} type={type ? type : 'Circle'} color={color1} />
    );
  }
}

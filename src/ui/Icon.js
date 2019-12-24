import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getIconType, getIconSizeScaleFix } from './utils/icon';
import { getTheme } from './Theme';

import {
  BasePropTypes,
  fontSizeStyles,
  colorStyles,
  backgroundColorStyles,
  borderRadiusStyles,
  paddingStyles,
  marginStyles,
  elevationStyles,
} from './Base';

class Icon extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    type: PropTypes.string,
    name: PropTypes.string,
    flip: PropTypes.bool,
  };

  static defaultProps = {
    ...getTheme().icon,
  };

  flipDirectionStyles = () => {
    const { flip, reverse, rtl } = this.props;

    if ((flip && rtl) || (reverse && !rtl)) {
      return {
        transform: [{ scaleX: -1 }],
      };
    }

    return null;
  };

  render() {
    const { type, name, style, logo , ...rest} = this.props;
    const NativeIcon = getIconType(type);

    const prefix =
      type === 'ion' && !logo ? (Platform.OS === 'ios' ? 'ios-' : 'md-') : '';
    

    return (
      <NativeIcon
        {...rest}
        name={prefix + name}
        style={[
          this.flipDirectionStyles(),
          fontSizeStyles(this.props, getIconSizeScaleFix(type)),
          colorStyles(this.props),
          backgroundColorStyles(this.props),
          borderRadiusStyles(this.props),
          paddingStyles(this.props),
          marginStyles(this.props),
          elevationStyles(this.props),
          style,
          {
            textAlignVertical: 'center',
            textAlign: 'center',
          },
        ]}
      />
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Icon);

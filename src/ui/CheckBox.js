import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';

//import { copyMethodsToClass } from './utils/helpers';
import Base from './Base';
import View from './View';
import Text from './Text';
import Icon from './Icon';
import Theme from './defaults/theme';

import { responsiveWidth } from './utils/responsiveDimensions';

class CheckBox extends Component {
  static propTypes = {
    ...Base.propTypes,
    checked: PropTypes.bool,
    size: PropTypes.number,
    activeColor: PropTypes.string,
    normalColor: PropTypes.string,
    labelColor: PropTypes.string,
    onPress: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ]),
    index: PropTypes.number,
    label: PropTypes.string,
    labelSize: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    customActiveRenderer: PropTypes.func,
  };

  static defaultProps = {
    checked: false,
    size: Theme.checkBox.size,
    activeColor: Theme.checkBox.activeColor,
    normalColor: Theme.checkBox.normalColor,
    labelColor: Theme.checkBox.labelColor,
    onPress: () => {},
  };

  constructor(props) {
    super(props);

    //copyMethodsToClass(this, Base);
  }

  render() {
    const {
      size,
      labelSize,
      labelColor,
      label,
      onPress,
      style,
      checked,
      activeColor,
      normalColor,
      value,
      index,
      customActiveRenderer,
    } = this.props;

    const color = checked ? activeColor : normalColor;

    return (
      <RectButton
        onPress={() => {
          onPress(value, index);
        }}
        style={[this.marginStyles()]}
      >
        <View row style={style}>
          <View
            bc={color}
            bw={2}
            mr={5}
            center
            style={[
              {
                width: responsiveWidth(size * 0.9),
                height: responsiveWidth(size * 0.9),
              },
            ]}
          >
            {checked ? (
              customActiveRenderer ? (
                customActiveRenderer(size, color)
              ) : (
                <Icon
                  name="check"
                  type="entypo"
                  size={size * 1.2}
                  color={color}
                />
              )
            ) : null}
          </View>
          <Text size={labelSize || size} color={labelColor}>
            {label}
          </Text>
        </View>
      </RectButton>
    );
  }
}

export default connect()(CheckBox);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RectButton } from 'react-native-gesture-handler';

import { marginStyles } from './Base';
import View from './View';
import Text from './Text';
import { getTheme } from './Theme';

// TODO: Add custom button (for different radio shapes)
// TODO: REFACTOR
class RadioButton extends Component {
  static propTypes = {
    // ...Base.propTypes,
    selected: PropTypes.bool,
    size: PropTypes.number,
    activeColor: PropTypes.string,
    normalColor: PropTypes.string,
    labelColor: PropTypes.string,
    onPress: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    index: PropTypes.number,
    label: PropTypes.string,
    labelSize: PropTypes.number,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  };

  static defaultProps = {
    selected: false,
    size: getTheme().radioButton.size,
   // activeColor: getTheme().radioButton.activeColor,
     activeColor: '#96D007',

    //normalColor: getTheme().radioButton.normalColor,
    normalColor: '#96D007',

   // labelColor: getTheme().radioButton.labelColor,
    labelColor: 'white',


    onPress: () => {},
  };

  render() {
    const {
      selected,
      size,
      activeColor,
      normalColor,
      value,
      index,
      onPress,
      label,
      labelSize,
      labelColor,
      style,
    } = this.props;

    const color = selected ? activeColor : normalColor;

    return (
      <RectButton
        onPress={() => {
          onPress(value, index);
        }}
        style={[marginStyles(this.props)]}
      >
        <View row style={style}>
          <View bc={color} bw={2} circle circleRadius={size} mr={5} center>

            {selected ? (
              <View circle circleRadius={size * 0.6} backgroundColor={color} />
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

export default connect()(RadioButton);
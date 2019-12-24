/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import { View as UIView, Text as UIText, Icon } from '../../../ui'; 

export default class Actions extends React.Component {

  constructor(props) {
    super(props);
    this.onActionsPress = this.onActionsPress.bind(this);
  }

  onActionsPress() {
    const { options } = this.props;
    const optionKeys = Object.keys(options);
    const cancelButtonIndex = optionKeys.indexOf('Cancel');
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options: optionKeys,
        cancelButtonIndex,
        tintColor: this.props.optionTintColor,
      },
      (buttonIndex) => {
        const key = optionKeys[buttonIndex];
        if (key) {
          options[key](this.props);
        }
      },
    );
  }

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <Icon name="camera" type="font-awesome" color="#FA7F2B" size={8} />
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.props.onPressActionButton || this.onActionsPress}
      >
        {this.renderIcon()}
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  wrapper: {
    borderRadius: 13,
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

Actions.contextTypes = {
  actionSheet: PropTypes.func,
};

Actions.defaultProps = {
  onSend: () => { },
  options: {},
  optionTintColor: 'gray',
  icon: null,
  containerStyle: {},
  iconTextStyle: {},
  wrapperStyle: {},
};

Actions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  optionTintColor: PropTypes.string,
  icon: PropTypes.func,
  onPressActionButton: PropTypes.func,
  wrapperStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
};

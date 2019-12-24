/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewPropTypes } from 'react-native';
import I18n from 'react-native-i18n';
import { getColors, View, Image, Icon } from '../../../ui'; 

export default function Send({ text, containerStyle, onSend, children, textStyle, label, alwaysShowSend, color }) {
  if (alwaysShowSend || text.trim().length > 0) {
    return (
      <TouchableOpacity
        testID="send"
        accessible
        accessibilityLabel="send"
        style={[styles.container, containerStyle]}
        onPress={() => {
          if (text.trim().length > 0) {
            onSend({ text: text.trim() }, true);
          }
        }}
        accessibilityTraits="button"
      >
        <View flex stretch center p={2}>
          <Icon name="send" color={color} size={15} flip />
        </View>
      </TouchableOpacity>
    );
  }
  return <View />;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: getColors().primary,
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

Send.defaultProps = {
  text: '',
  onSend: () => { },
  label: 'Send',
  containerStyle: {},
  textStyle: {},
  children: null,
  alwaysShowSend: false,
};

Send.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  children: PropTypes.element,
  alwaysShowSend: PropTypes.bool,
};

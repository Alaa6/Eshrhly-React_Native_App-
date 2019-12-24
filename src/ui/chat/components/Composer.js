/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { responsiveHeight, responsiveFontSize } from '../../../ui';

export default class Composer extends React.Component {
  state = {
    height: this.props.composerHeight,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text === '') {
      this.setState({ height: this.props.composerHeight });
    }
  }

  onContentSizeChange(e) {
    const { contentSize } = e.nativeEvent;

    // Support earlier versions of React Native on Android.
    if (!contentSize) return;

    if (
      !this.contentSize ||
      this.contentSize.width !== contentSize.width ||
      this.contentSize.height !== contentSize.height
    ) {
      this.contentSize = contentSize;
      this.props.onInputSizeChanged(this.contentSize);
      this.setState({ height: this.contentSize.height });
    }
  }

  onChangeText(text) {
    this.props.onTextChanged(text);
  }

  render() {
    return (
      <TextInput
        testID={this.props.placeholder}
        accessible
        accessibilityLabel={this.props.placeholder}
        placeholder={this.props.placeholder}
        placeholderTextColor={this.props.placeholderTextColor}
        multiline={this.props.multiline}
        onChange={(e) => this.onContentSizeChange(e)}
        onContentSizeChange={(e) => this.onContentSizeChange(e)}
        onChangeText={(text) => this.onChangeText(text)}
        style={[styles.textInput, this.props.textInputStyle, { height: this.state.height, fontSize: this.props.composerFontSize, lineHeight: this.props.composerFontSize }]}
        autoFocus={this.props.textInputAutoFocus}
        value={this.props.text}
        enablesReturnKeyAutomatically
        underlineColorAndroid="transparent"
        keyboardAppearance={this.props.keyboardAppearance}
        {...this.props.textInputProps}
      />
    );
  }

}

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    margin: 2,
    // lineHeight: 16,
    // backgroundColor: 'red'
  },
});

Composer.defaultProps = {
  composerHeight: Platform.select({
    ios: 33,
    android: 41,
  }),
  text: '',
  placeholderTextColor: 'gray',
  placeholder: 'Type a message...',
  textInputProps: null,
  multiline: true,
  textInputStyle: {},
  textInputAutoFocus: false,
  keyboardAppearance: 'default',
  onTextChanged: () => { },
  onInputSizeChanged: () => { },
};

Composer.propTypes = {
  composerHeight: PropTypes.number,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  textInputProps: PropTypes.object,
  onTextChanged: PropTypes.func,
  onInputSizeChanged: PropTypes.func,
  multiline: PropTypes.bool,
  textInputStyle: TextInput.propTypes.style,
  textInputAutoFocus: PropTypes.bool,
  keyboardAppearance: PropTypes.string,
};

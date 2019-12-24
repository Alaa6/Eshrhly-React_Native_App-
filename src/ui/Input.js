import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as NativeInput,
  View as NativeView,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';

import {
  BasePropTypes,
  paddingStyles,
  fontSizeStyles,
  fontFamilyStyles,
  textDirectionStyles,
  colorStyles,
} from './Base';

import { View, Icon } from './';
import { getTheme } from './Theme';
import InputError from './micro/InputError';
import { convertNumbers } from './utils/numbers';

class Input extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    initialValue: PropTypes.string,
    name: PropTypes.string,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    secure: PropTypes.bool,
    leftItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    rightItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    activeColor: PropTypes.string,
    inactiveColor: PropTypes.string,
    color: PropTypes.string,
    error: PropTypes.string,
    showSecureEye: PropTypes.bool,
    nextInput: PropTypes.objectOf(PropTypes.any),
    noValidation: PropTypes.bool,
  };

  static defaultProps = {
    leftItems: [],
    rightItems: [],
    ...getTheme().input,
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      // height: props.height,
      secure: props.secure,
      text: props.initialValue,
      color: props.color || props.inactiveColor,
    };
  }

  componentDidMount() {
    if (this.props.reference) {
      this.props.reference(this.inputRef);
    }
  }

  onChangeText = text => {
    const { name, onChangeText, code } = this.props;
    if (code) {
      this.setState({
        text: text[0],
      });
    }
    else {
      this.setState({
        text,
      });
    }

    if (onChangeText) {
      if (name) onChangeText(name, text);
      else onChangeText(text);
    }
  };

  onBlur = () => {
    const { name, onBlur, color, inactiveColor } = this.props;

    if (!color) {
      this.setState({
        color: inactiveColor,
      });
    }

    if (onBlur) {
      if (name) onBlur(name, this.state.text);
      else onBlur(this.state.text);
    }
  };

  onFocus = () => {
    const { name, onFocus, color, activeColor } = this.props;

    if (!color) {
      this.setState({
        color: activeColor,
      });
    }

    if (onFocus) {
      if (name) onFocus(name, this.state.text);
      else onFocus(this.state.text);
    }
  };

  onSubmitEditing = () => {
    const { name, nextInput, onSubmitEditing } = this.props;

    if (nextInput) {
      nextInput.current.focus();
    }

    if (onSubmitEditing) {
      if (name) onSubmitEditing(name, this.state.text);
      else onSubmitEditing(this.state.text);
    }
  };

  focus = () => {
    this.inputRef.current.focus();
  };

  blur = () => {
    this.inputRef.current.blur();
  };

  clear = () => {
    this.inputRef.current.clear();
  };

  renderSecureEyeButton = () => (
    <Icon
      name={this.state.secure ? 'eye' : 'eye-off'} color={ this.props.eyeColor ? this.props.eyeColor : 'white'}
      onPress={() => {
        this.setState(prevState => ({ secure: !prevState.secure }));
      }}
      pr={5}
    />
  );

  renderItems = items => {
    const { size } = this.props;

    const nodes = items.map(item => {
      if (
        item.type.WrappedComponent &&
        (item.type.WrappedComponent.displayName === 'Button' ||
          item.type.WrappedComponent.displayName === 'Icon')
      ) {
        return React.cloneElement(item, {
          key: String(Math.random()),
          flat: true,
          stretch: true,
          color: item.props.color || this.state.color,
          size: item.props.size || size * 1.5,
          backgroundColor: 'transparent',
          ph: item.props.ph || size / 1.5,
          pv: 0,
        });
      }
      return React.cloneElement(item, {
        key: String(Math.random()),
      });
    });

    return nodes;
  };

  renderCover = () => (
    <TouchableWithoutFeedback
      onPress={() => {
        this.focus();
      }}
    >
      <NativeView
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      />
    </TouchableWithoutFeedback>
  );

  render() {
    const {
      size,
      secure,
      placeholderColor,
      width,
      height,
      backgroundColor,
      borderRadius,
      elevation,
      rtl,
      nextInput,
      showSecureEye,
      placeholder,
      translateNumbers,
      noValidation,
      error,
      flex,
      m,
      mh,
      mv,
      mt,
      mb,
      ml,
      mr,
      bw,
      btw,
      bbw,
      blw,
      brw,
      bc,
      btc,
      bbc,
      blc,
      brc,
      email,
      phone,
      number,
      maxLength,
      editable,
      multiline,
      notBlurOnSubmit,
      stopEditable,
      tansparent,
      ...rest
    } = this.props;

    let { leftItems, rightItems } = this.props;

    if (leftItems && !leftItems.map) leftItems = [leftItems];
    if (rightItems && !rightItems.map) rightItems = [rightItems];

    let keyboardType = 'default';
    if (number) keyboardType = 'numeric';
    if (phone) keyboardType = 'phone-pad';
    if (email) keyboardType = 'email-address';
    return (
      <View
        stretch
        flex={flex}
        m={m}
        mh={mh}
        mv={mv}
        mt={mt}
        mb={mb}
        ml={ml}
        mr={mr}
        width={width}
      // backgroundColor='red'
      >

        <View
          stretch
          row
          height={this.props.height ? height : this.state.height}
          backgroundColor={backgroundColor}
          borderRadius={borderRadius}
          elevation={elevation}
          bw={bw}
          btw={btw}
          bbw={bbw}
          blw={blw}
          brw={brw}
          bc={bc}
          btc={btc}
          bbc={bbc}
          blc={blc}
          brc={brc}
        >
          {tansparent && <View backgroundColor={'black'} style={{ opacity: 0.3, zIndex: -1, position: 'absolute', width: '100%', height: '100%' }}></View>}
          {leftItems.length ? this.renderItems(leftItems) : null}
          <NativeInput
            returnKeyType={nextInput ? 'next' : 'done'}
            {...rest}
            placeholder={convertNumbers(
              placeholder,
              translateNumbers ? rtl : false,
            )}
            editable={stopEditable ? false : true}
            placeholderTextColor={placeholderColor}
            blurOnSubmit={notBlurOnSubmit ? false : true}
            multiline={multiline ? multiline : false}
            // onContentSizeChange={(event) => {
            //   console.log('event.nativeEvent.contentSize.height', event.nativeEvent.contentSize.height);
            //   this.setState({ height: event.nativeEvent.contentSize.height })
            // }}
            ref={this.inputRef}
            value={this.props.value ? this.props.value : this.state.text}
            underlineColorAndroid="transparent"
            textAlign={this.props.centerText?'center':undefined}
            secureTextEntry={this.state.secure}
            onChangeText={this.onChangeText}
            onBlur={this.onBlur}
            keyboardType={keyboardType}
            onFocus={this.onFocus}
            maxLength={maxLength}
            onSubmitEditing={this.onSubmitEditing}
            style={[
              textDirectionStyles(this.props),
              fontSizeStyles(this.props),
              fontFamilyStyles(this.props),
              colorStyles({ color: this.state.color }),
              paddingStyles(this.props),
              {
                //height: this.state.heigh + 5,
                flex: 1,
                alignSelf: 'stretch',
                textAlignVertical: 'center',
                // paddingTop: multiline ? 0 : 0,
              },

            ]}
          />
          {rightItems.length ? this.renderItems(rightItems) : null}
          {secure && showSecureEye
            ? this.renderItems([this.renderSecureEyeButton()])
            : null}
        </View>
        {(!noValidation && error) ? <InputError error={error} size={size} /> : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps, null, null, { forwardRef: true })(Input);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';
import View from './View';
import Indicator from './Indicator';
import { getTheme } from './Theme';
import SoundEffects from './SoundEffects';
import {
  BasePropTypes,
  dimensionsStyles,
  selfLayoutStyles,
  childrenLayoutStyles,
  backgroundColorStyles,
  elevationStyles,
  paddingStyles,
  marginStyles,
  borderRadiusStyles,
  borderStyles,
} from './Base';
import { responsiveWidth } from './utils/responsiveDimensions';
import Icon from './Icon';

const log = () => {
};

class Button extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    onPress: PropTypes.func,
    processing: PropTypes.bool,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    flat: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
  };

  static defaultProps = {
    row: true,
    center: true,
    onPress: log,
    ...getTheme().button,
  };

  static getDerivedStateFromProps = (props, state) => ({
    processing: props.processing,
  });

  constructor(props) {
    super(props);

    this.state = {
      processing: props.processing,
      width: 0,
      height: 0,
    };
  }

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  };

  onPress = event => {
    if (this.props.disabled) return;
    if (this.state.processing) return;

    SoundEffects.pse(this.props.voice ? this.props.voice : 'click');

    this.props.onPress(event);
  };

  renderLeftIcon = c => {
    const { leftIcon, rightIcon, title, size } = this.props;

    return React.cloneElement(leftIcon, {
      size: leftIcon.props.size || size * 1.4,
      color: leftIcon.props.color || c,
      pr:
        leftIcon.props.pr ||
        (title || rightIcon ? (leftIcon.props.size || size) / 2 : 0),
    });
  };

  renderRightIcon = c => {
    const { leftIcon, rightIcon, title, size } = this.props;

    return React.cloneElement(rightIcon, {
      size: rightIcon.props.size || size * 1.4,
      color: rightIcon.props.color || c,
      pl:
        rightIcon.props.pl ||
        (title || leftIcon ? (rightIcon.props.size || size) / 2 : 0),
    });
  };

  renderChildren = () => {
    const {
      title,
      size,
      leftIcon,
      rightIcon,
      disabled,
      color,
      backgroundColor,
      disabledBackgroundColor,
      disabledColor,
      flat,
      bold,
      leftCount,
      rightCount,
      centerIcon,
      tansparent,
    } = this.props;

    const { processing } = this.state;

    const bg = disabled ? disabledBackgroundColor : backgroundColor;
    const fg = disabled ? disabledColor : color;

    const c = flat ? (color !== getTheme().button.color ? fg : bg) : fg;
    return processing ? (
      <View stretch center>
        <Indicator color="white" />
      </View>
    ) : (
        <React.Fragment>
          {tansparent && <View backgroundColor={'white'} style={{ opacity: 0.7, zIndex: -1, position: 'absolute', width: '100%', height: '100%' }}></View>}
          {rightCount && rightCount > 0 ? <Text style={{ textAlign: 'center' }} circleRadius={5} mh={1} backgroundColor={'v2thirdly'} size={4} color={'black'}>{rightCount > 99 ? "99+" : rightCount}</Text> : null}
          {leftIcon && this.renderLeftIcon(c)}
          <View row around>
            <View centerY centerX >
              {centerIcon && <Icon color={color} name={centerIcon.name} type={centerIcon.type} ></Icon>}
              <Text size={leftCount ? 4 : size ? size : 10} numberOfLines={1} stretch
                color={c} bold={bold} center pv={tansparent ? 3 : 0}>
                {title}
              </Text>
            </View>
            {leftCount && leftCount > 0 ? <Text style={{ textAlign: 'center' }} circleRadius={5} mh={1} backgroundColor={'v2thirdly'} size={4} color={'black'}>{leftCount > 99 ? "99+" : leftCount}</Text> : null}
            {rightIcon && this.renderRightIcon(c)}
          </View>
        </React.Fragment>
      );
  };

  render() {
    const {
      backgroundColor,
      disabledBackgroundColor,
      disabled,
      flat,
      children,
      style,
      touchableOpacity,
      tansparent,
      gradient,
    } = this.props;

    const bg = disabled ? disabledBackgroundColor : backgroundColor;

    const c = flat ? 'transparent' : bg;

    const Container = touchableOpacity ? TouchableOpacity : RectButton;

    return (
      <React.Fragment>
        {!gradient ?
          <Container
            style={[
              dimensionsStyles(this.props),
              selfLayoutStyles(this.props),
              childrenLayoutStyles(this.props),
              paddingStyles(this.props),
              marginStyles(this.props),
              borderStyles(this.props),
              backgroundColorStyles({ backgroundColor: c }),
              flat || disabled ? null : elevationStyles(this.props),
              flat || disabled ? null : borderRadiusStyles(this.props),
              this.state.width && { width: this.state.width },
              this.state.height && { height: this.state.height },
              style,
            ]}
            onPress={this.onPress}
            onLayout={event => {
              this.setState({
                width: event.nativeEvent.layout.width,
                height: event.nativeEvent.layout.height,
              });
            }}
          >
            {children || this.renderChildren()}
          </Container> :
          <TouchableOpacity onPress={this.onPress} style={[style,
            selfLayoutStyles(this.props),
            this.state.width && { width: this.state.width },
            this.state.height && { height: this.state.height }]}>
            <LinearGradient
              colors={["#99d162", "#5aa411"]}
              start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
              style={[
                dimensionsStyles(this.props),
                selfLayoutStyles(this.props),
                childrenLayoutStyles(this.props),
                paddingStyles(this.props),
                marginStyles(this.props),
                borderStyles(this.props),
                backgroundColorStyles({ backgroundColor: c }),
                flat || disabled ? null : elevationStyles(this.props),
                flat || disabled ? null : borderRadiusStyles(this.props),
                this.state.width && { width: this.state.width },
                this.state.height && { height: this.state.height },
                //style,
              ]}
              onLayout={event => {
                this.setState({
                  width: event.nativeEvent.layout.width,
                  height: event.nativeEvent.layout.height,
                });
              }}>
              {children || this.renderChildren()}
            </LinearGradient>
          </TouchableOpacity>

        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Button);

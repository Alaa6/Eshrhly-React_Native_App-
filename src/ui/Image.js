import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image as NativeImage,
  ImageBackground as NativeImageBackground,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

import View from './View';
import Text from './Text';
import Icon from './Icon';
import Indicator from './Indicator';

import { getThemeColor } from './utils/colors';
import { responsiveWidth } from './utils/responsiveDimensions';

import { getTheme } from './Theme';

import {
  BasePropTypes,
  dimensionsStyles,
  borderRadiusStyles,
  selfLayoutStyles,
} from './Base';

const styles = StyleSheet.create({
  fetchingStatusContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    opacity: 0.8,
  },
});

class Image extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    isConnected: PropTypes.bool,
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    resizeMode: PropTypes.string,
    progressColor: PropTypes.string,
    errorColor: PropTypes.string,
    errorBackgroundColor: PropTypes.string,
  };

  static defaultProps = {
    ...getTheme().image,
  };

  constructor(props) {
    super(props);

    if (typeof props.source === 'number') {
      this.local = true;
    }

    this.state = {
      status: this.local ? 'end' : 'initial',
      error: null,
      progress: 0,
    };

    this.resizeModes = {
      contain: FastImage.resizeMode.contain,
      cover: FastImage.resizeMode.cover,
      stretch: FastImage.resizeMode.stretch,
      center: FastImage.resizeMode.center,
    };

    this.diameter = 0;
    if (props.circleRadius) {
      this.diameter = props.circleRadius;
    } else if (props.equalSize) {
      this.diameter = props.equalSize;
    } else if (props.width && props.height) {
      this.diameter = Math.sqrt(props.width * props.height);
    }
  }

  componentDidMount = () => {
    
    if (this.local) return;

    this.timer = setTimeout(() => {
      if (this.state.status === 'initial') {
        this.setState({
          status: 'loading',
        });
        clearTimeout(this.timer);
      }
    }, 150);
  };

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  renderImageFetchingStatus = () => {
    if (!(this.state.status !== 'end' || this.state.error)) return null;

    const {
      progressColor,
      errorColor,
      errorBackgroundColor,
      isConnected,
    } = this.props;
    return (
      <View
        center
        backgroundColor={this.state.error ? errorBackgroundColor : null}
        style={styles.fetchingStatusContainer}
      >
        {!this.state.error && this.state.status === 'loading' ? (
          <Indicator size={this.diameter / 5} color={'primary'} />
        ) : null}
        {!this.state.error && this.state.status === 'inProgress' ? (
          <Indicator size={this.diameter / 5} color={'primary'} />
        ) : null}
        {/* {!this.state.error && this.state.status === 'inProgress' ? (
          <Progress.Bar
            useNativeDriver
            color={getThemeColor(progressColor)}
            progress={this.state.progress / 100}
            width={responsiveWidth(this.diameter) * 0.8}
          />
        ) : null} */}
        {this.state.error ? (
          <React.Fragment>
            <Icon
              name={isConnected ? 'image' : 'wifi-off'}
              type={isConnected ? 'entypo' : 'feather'}
              size={this.diameter / 2.5}
              color={errorColor}
            />
            <Text color={errorColor} size={this.diameter / 8} center>
              {!this.props.isConnected
                ? I18n.t('ui-networkConnectionError')
                : I18n.t('ui-couldNotLoadImage')}
            </Text>
          </React.Fragment>
        ) : null}
      </View>
    );
  };

  render() {
    const {
      children,
      source,
      resizeMode,
      row,
      top,
      bottom,
      centerY,
      left,
      right,
      centerX,
      center,
      stretchChildren,
      spaceBetween,
      spaceAround,
      reverse,
      style,
      p,
      ph,
      pv,
      pl,
      pr,
      pt,
      pb,
      onPress,
      ...rest
    } = this.props;

    const ImageComponent = this.local
      ? children
        ? NativeImageBackground
        : NativeImage
      : FastImage;

    const Container = onPress ? TouchableOpacity : React.Fragment;
    const containerProps = onPress ? { onPress } : {};

    return (
      <View {...rest} pt={0} pb={0} pl={0} pr={0}>
        {this.renderImageFetchingStatus()}
        <Container {...containerProps}>
          <ImageComponent
            style={[
              dimensionsStyles(this.props),
              borderRadiusStyles(this.props),
              selfLayoutStyles(this.props),
              style,
            ]}
            source={source}
            resizeMode={this.resizeModes[resizeMode]}
            onProgress={e => {
              this.setState({
                status: 'inProgress',
                progress: Math.round(
                  e.nativeEvent.loaded / e.nativeEvent.total * 100,
                ),
              });
            }}
            onError={error => {
              this.setState({
                error,
              });
            }}
            onLoad={() => {
              this.setState({
                error: null,
              });
            }}
            onLoadEnd={() => {
              this.setState({
                status: 'end',
              });
            }}
          >
            {children ? (
              <View
                flex
                stretch
                row={row}
                top={top}
                bottom={bottom}
                centerY={centerY}
                left={left}
                right={right}
                centerX={centerX}
                center={center}
                stretchChildren={stretchChildren}
                spaceBetween={spaceBetween}
                spaceAround={spaceAround}
                reverse={reverse}
                p={p}
                pv={pv}
                ph={ph}
                pt={pt}
                pb={pb}
                pl={pl}
                pr={pr}
              >
                {children}
              </View>
            ) : null}
          </ImageComponent>
        </Container>
      </View>
    );
  }
}

const mapStateToProps = state => {
return{
  rtl: state.lang.rtl,
  isConnected: state.network.isConnected
}
};

export default connect(mapStateToProps)(Image);

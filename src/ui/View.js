import React, { PureComponent } from 'react';
import { View as NativeView, TouchableOpacity} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import SoundEffects from './SoundEffects';
import LinearGradient from 'react-native-linear-gradient';
import {
  BasePropTypes,
  dimensionsStyles,
  selfLayoutStyles,
  childrenLayoutStyles,
  backgroundColorStyles,
  elevationStyles,
  paddingStyles,
  marginStyles,
  borderStyles,
  borderRadiusStyles,
} from './Base';

class View extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
  };

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  render() {
    const { onLayout, style, onPress, touchableOpacity, children, disabled, voice, gradient, gColors } = this.props;

    const Container = touchableOpacity ? TouchableOpacity : RectButton;

    const node = onPress ? (
      <Container
        onPress={() => {
          SoundEffects.pse(voice ? voice : 'click');
          onPress();
        }}
        activeOpacity={disabled ? .2 : .2}
        style={[
          childrenLayoutStyles(this.props),
          paddingStyles(this.props),
          { flex: 1, alignSelf: 'stretch' },
        ]}
      >
        {children}
      </Container>
    ) : (
        children
      );

    return (
      <NativeView
        onLayout={onLayout}
        onPress={this.props.onPress}
        style={[
          dimensionsStyles(this.props),
          selfLayoutStyles(this.props),
          !onPress ? childrenLayoutStyles(this.props) : undefined,
          backgroundColorStyles(this.props),
          !gradient ? elevationStyles(this.props) : undefined,
          !onPress ? paddingStyles(this.props) : undefined,
          !gradient ? marginStyles(this.props) : undefined,
          !gradient ? borderStyles(this.props) : undefined,
          !gradient ? borderRadiusStyles(this.props) : undefined,
          style,
        ]}
      >
        {gradient ?
          <LinearGradient
            colors={ gColors ? gColors : ["#347704", "#52A318"]}
            start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
            style={[
              dimensionsStyles(this.props),
              selfLayoutStyles(this.props),
              !onPress ? childrenLayoutStyles(this.props) : undefined,
              elevationStyles(this.props),
              !onPress ? paddingStyles(this.props) : undefined,
              marginStyles(this.props),
              borderStyles(this.props),
              borderRadiusStyles(this.props),
              style,
            ]}
          >
            {node}
          </LinearGradient>
          :
          node
        }

      </NativeView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(View);

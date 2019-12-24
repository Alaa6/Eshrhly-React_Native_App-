import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView as NativeScrollView, StyleSheet, RefreshControl,View as NativeView } from 'react-native';
import { connect } from 'react-redux';
import { View } from '../ui';

import {
  BasePropTypes,
  dimensionsStyles,
  selfLayoutStyles,
  childrenLayoutStyles,
  backgroundColorStyles,
  paddingStyles,
  marginStyles,
  borderStyles,
} from './Base';

const styles = StyleSheet.create({
  rtl: {
    transform: [{ scaleX: -1 }],
  },
});

class ScrollView extends PureComponent {
  static propTypes = {
    ...BasePropTypes,
    horizontal: PropTypes.bool,

  };

  constructor(props) {
    super(props);
    this.state = {
      listRefreshing: false,
    }
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (this.props.reference) {
      this.props.reference(this.ref);
    }
  }

  componentWillUnmount() {
    if (this.props.reference) {
      this.props.reference(undefined);
    }
  }

  render() {
    const { horizontal, rtl, ...rest } = this.props;
    let { children } = this.props;
    if (children && !children.map) {
      children = [children];
    }

    return (
      // <NativeView
      // style={{ flex: 1, scaleX: this.props.rtl ? horizontal ? 1 : -1 : 1 }}
      // >
        <NativeScrollView 
        
          refreshControl={!this.props.onRefresh ? undefined :
            <RefreshControl
              // tintColor={$.config.colors.style}
              onRefresh={() => this.props.onRefresh()}
              refreshing={this.state.listRefreshing}
            />
          }
          ref={this.ref}
          {...rest}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={this.props.hideHorizontalScrollIndicator?false:true}
          nestedScrollEnabled={true}
          right={null}
          left={null}
          flex={null}
          style={[
            dimensionsStyles(this.props),
            selfLayoutStyles(this.props),
            backgroundColorStyles(this.props),
            borderStyles(this.props),
            marginStyles({ ...this.props, row: horizontal }),
            rtl && horizontal ? styles.rtl : null,
            // { scaleX: this.props.rtl ? horizontal ? 1 : -1 : 1 },
          ]}
          contentContainerStyle={[
            !horizontal && childrenLayoutStyles(this.props),
            paddingStyles({ ...this.props, row: horizontal }),
          ]}
        >
          {children &&
            children.map(
              (child, index) =>
                child
                  ? React.cloneElement(child, {
                    key: String(index),
                    style: [
                      child.props.style,
                      rtl && horizontal ? styles.rtl : {},
                    ],
                  })
                  : child,
            )}
        </NativeScrollView>
      // </NativeView> 
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

// export default connect(mapStateToProps, null, null, { withRef: true })(
//   ScrollView,
// );
export default connect(mapStateToProps, null, null, { forwardRef: true })(
  ScrollView,
);
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Picker as NPicker } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import axios from 'axios';
import I18n from 'react-native-i18n';
import { BasePropTypes, paddingStyles } from './Base';
import Network from './Base/Network';
import View from './View';
import ScrollView from './ScrollView';
import Text from './Text';
import Icon from './Icon';
import Input from './Input';
import Indicator from './Indicator';
import InputError from './micro/InputError';
import { getTheme } from './Theme';
import { moderateScale, responsiveHeight } from './utils/responsiveDimensions';
const styles = StyleSheet.create({
  modalReset: {
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// TODO add dropdown menu option
// TODO customize dialog modal
// TODO refactoring insurance
class Picker extends Network {
  static propTypes = {
    ...BasePropTypes,
    ...Network.propTypes,
    name: PropTypes.string,
    onChange: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object),
    placeholder: PropTypes.string,
    leftItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    rightItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    farArrow: PropTypes.bool,
    error: PropTypes.string,
    noValidation: PropTypes.bool,
    setInitialValueAfterFetch: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]),
  };
  static defaultProps = {
    ...Network.defaultProps,
    ...getTheme().picker,
    paging: false,
    data: [],
    leftItems: [],
    rightItems: [],
  };
  constructor(props) {
    super(props);
    // const obj = props.initialValue
    //   ? props.data.find(i => i.value === props.initialValue)
    //   : null;
    // const label = obj ? obj.label : props.placeholder;
    this.mainIndicator = 'loading';
    this.state = {
      label: props.placeholder,
      visible: false,
      data: props.data,
      loading: false,
      networkError: false,
      filterText: '',
    };
  }
  async componentDidMount() {
    super.componentDidMount();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.isinMap) {
      this.setState({
        label: nextProps.placeholder,
      });
    }
    super.componentWillReceiveProps(nextProps, () => {
      this.setState({
        label: this.props.placeholder,
      });
      if (this.props.onChange && this.props.name) {
        this.props.onChange(this.props.name, undefined, true);
      }
    });
  }
  componentWillUnmount() {
    super.componentWillUnmount();
  }
  setStartFetching() {
    this.setState({
      networkError: false,
    });
  }
  setData = (data, cb) => {
    this.setState({ data }, cb);
  };
  setError = errorLabel => {
    this.setState({
      networkError: true,
    });
  };
  setEndFetching(data) {
    const { setInitialValueAfterFetch, onChange, name } = this.props;
    if (setInitialValueAfterFetch) {
      let label = data.length ? data[0].label : this.state.label;
      let { value } = data[0];
      if (typeof setInitialValueAfterFetch === 'number') {
        const target = data.find(
          item => item.value === setInitialValueAfterFetch,
        );
        if (target) {
          label = target.label;
          value = target.value;
        }
      }
      this.setState(prevState => ({
        label,
      }));
      if (onChange) {
        if (name) onChange(name, value);
        else onChange(value);
      }
    }
  }
  renderItems = items => {
    const { size, color } = this.props;
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
          color: item.props.color || color,
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
  setting(){
    console.log('hghgfhgfhnh')
 }
  render() {
    const monthsPicker = [
      { label: I18n.t("1"), value: "1" },
      { label: I18n.t("2"), value: "2" },
      { label: I18n.t("3"), value: "3" },
      { label: I18n.t("4"), value: "4" },
      { label: I18n.t("5"), value: "5" },
      { label: I18n.t("6"), value: "6" },
      { label: I18n.t("7"), value: "7" },
      { label: I18n.t("8"), value: "8" },
      { label: I18n.t("9"), value: "9" },
      { label: I18n.t("10"), value: "10" },
      { label: I18n.t("11"), value: "11" },
      { label: I18n.t("12"), value: "12" },
    ]
    const {
      rtl,
      size,
      color,
      backgroundColor,
      width,
      height,
      borderRadius,
      center,
      farArrow,
      error,
      flex,
      elevation,
      onChange,
      name,
      months,
      noValidation,
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
      useNative,
      tansparent,
      colorfarArrow,
      modal
    } = this.props;
    let { leftItems, rightItems } = this.props;
    if (months && this.state.data.length === 0) {
      this.setState({ data: monthsPicker });
    }
    if (leftItems && !leftItems.map) leftItems = [leftItems];
    if (rightItems && !rightItems.map) rightItems = [rightItems];
   
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
      >
       
        {!useNative ?
          <React.Fragment>
            <View
              stretch
              row
              height={height}
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
              <View
                touchableOpacity
                spaceBetween
                row
                onPress={() => {
                  this.setting()
                  if (this.state.loading || this.state.networkError) return;
                  if (this.props.changeState) {
                    this.props.changeState(false);
                  };
                  this.setState({
                    visible: true,
                    filterText: '',
                  });
                }}
                style={[
                  {
                    flexDirection: rtl ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    justifyContent:
                      this.state.loading || this.state.networkError
                        ? 'center'
                        : farArrow
                          ? 'space-between'
                          : center
                            ? 'center'
                            : 'flex-start',
                    flex: 1,
                    alignSelf: 'stretch',
                    padding: 0,
                  },
                ]}
              >
                {this.state.loading ? (
                  <Indicator size={size} />
                ) : this.state.networkError ? (
                  <Text size={size}>{I18n.t('ui-error')}</Text>
                ) : (
                      <React.Fragment>
                        <Text color={color} size={size} mh={3}>
                          {this.state.label}
                        </Text>
                        <Icon
                          name="keyboard-arrow-down"
                          type="material"
                          size={size * 1.3}
                          color={colorfarArrow?colorfarArrow:color}
                          mr={7}
                        />
                      </React.Fragment>
                    )}
              </View>
              {rightItems.length ? this.renderItems(rightItems) : null}
            </View>
            {(!noValidation && error) ? <InputError error={error} size={size} /> : null}
            <Modal
              isVisible={this.state.visible}
              transparent
              onRequestClose={() => {
                this.setState({
                  visible: false,
                });
                if (this.props.changeState) {
                  this.props.changeState(true);
                };
              }}
              style={styles.modalReset}
              useNativeDriver
              onBackdropPress={() => this.setState({ visible: false })}
              onBackButtonPress={() => this.setState({ visible: false })}
            >
              <View
                backgroundColor="white"
                width={85}
                height={this.props.fewData ? 25 : 50}
                borderRadius={4}
                elevation={4}
                style={{
                  marginTop: responsiveHeight(4),
                }}
              >
                {this.props.showSearchFilter ? (
                  <Input
                    stretch
                    backgroundColor="#eee"
                    borderRadius={0}
                    height={8}
                    size={7}
                    placeholder={I18n.t('ui-search-dots')}
                    onChangeText={text =>
                      this.setState({
                        filterText: text,
                      })
                    }
                  />
                ) : null}
                <ScrollView stretch>
                  {this.state.data
                    .filter(
                      item =>
                        this.state.filterText
                          ? item.label.startsWith(this.state.filterText)
                          : true,
                    )
                    .map((item, index) => (
                      <TouchableOpacity
                        key={String(item.value)}
                        style={{
                          alignSelf: 'stretch',
                          paddingVertical: moderateScale(8),
                          paddingHorizontal: moderateScale(8),
                          // borderTopColor: 'gray',
                          // borderTopWidth: index !== 0 ? 0.5 : 0,
                        }}
                        onPress={() => {
                          this.setState({
                            visible: false,
                            label: item.label,
                          });
                          if (this.props.changeState) {
                            this.props.changeState(true);
                          }
                          if (onChange) {
                            if (name) onChange(name, item.value);
                            else onChange(item.value);
                          }
                        }}
                      >
                        <Text size={size}>{item.label}</Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </Modal>
          </React.Fragment>
          :
          <React.Fragment>
            <View
              stretch
              row
              height={height}
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
              {this.state.loading ? (
                <View flex centerX centerY>
                  <Indicator size={size} />
                </View>
              ) : this.state.networkError ? (
                <Text stretch center size={size}>{I18n.t('ui-error')}</Text>
              ) :
                  <NPicker
                    mode="dialog"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: '100%', color: 'gray'}}
                    placeholder={this.props.placeholder}
                    placeholderStyle={{ color: "#4c4c4c" }}
                    //placeholderIconColor=""
                    itemStyle={{ color: 'red', textAlign: 'center', backgroundColor: 'red' }}
                    itemTextStyle={{ textAlign: 'center', color: 'gray', backgroundColor: 'red' }}
                    selectedValue={this.state.label}
                    onValueChange={(value) => {
                      if (onChange) {
                        onChange(value);
                        this.setState({ label: value });
                      }
                    }}
                  >
                    {(this.state.data).map((item, index) =>
                      <NPicker.Item label={item.label} value={item.value} key={index} />
                    )}
                  </NPicker>
              
              }
            </View>
            {(!noValidation && error) ? <InputError error={error} size={size} /> : null}
          </React.Fragment>
        }
      </View>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});
export default connect(mapStateToProps)(Picker);

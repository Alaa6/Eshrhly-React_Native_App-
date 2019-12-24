import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {
  BasePropTypes,
  paddingStyles,
  fontSizeStyles,
  fontFamilyStyles,
  textDirectionStyles,
  colorStyles,
} from './Base';

import { View, Icon, Text } from './';
import { getTheme } from './Theme';
import InputError from './micro/InputError';
import { convertNumbers } from './utils/numbers';

class DatePicker extends PureComponent {
  static propTypes = {
    // ...BasePropTypes,
    initialValue: PropTypes.string,
    name: PropTypes.string,
    // onChangeText: PropTypes.func,
    // onBlur: PropTypes.func,
    // onFocus: PropTypes.func,
    // onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    // secure: PropTypes.bool,
    leftItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    rightItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    // activeColor: PropTypes.string,
    // inactiveColor: PropTypes.string,
    color: PropTypes.string,
    error: PropTypes.string,
    // showSecureEye: PropTypes.bool,
    nextInput: PropTypes.objectOf(PropTypes.any),
    noValidation: PropTypes.bool,
  };

  static defaultProps = {
    leftItems: [],
    rightItems: [],
    ...getTheme().datePicker,
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      value: props.initialValue || props.placeholder,
      valueSet: !!props.initialValue,
      isDateTimePickerVisible: false,
      // text: props.initialValue,
      // color: props.color || props.inactiveColor,
    };
  }

  showDateTimePicker = () => {
    console.log('pressss')
    this.setState({ isDateTimePickerVisible: true })
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  };

  handleDatePicked = date => {
    const { name, onSelect } = this.props;

    this.setState({
      value: date,
      valueSet: true,
    });

    this.hideDateTimePicker();
    if (onSelect) {
      if (name) onSelect(name, date);
      else onSelect(date);
    }
  };

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

  render() {
    const {
      size,
      color,
      placeholderColor,
      width,
      height,
      backgroundColor,
      borderRadius,
      elevation,
      rtl,
      nextInput,
      placeholder,
      translateNumbers,
      noValidation,
      error,
      flex,
      time,
      datetime,
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
      p,
      pv,
      ph,
      pt,
      pb,
      pl,
      pr,
      showDropArrow,
      spinner,
      radial,
      primary,
      secondary,
      ...rest
    } = this.props;

    let { leftItems, rightItems } = this.props;

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
          {leftItems.length ? this.renderItems(leftItems) : null}

          <View
            flex
            stretch
            row
            onPress={this.showDateTimePicker}
            p={p}
            pv={pv}
            ph={ph}
            pt={pt}
            pb={pb}
            pl={pl}
            pr={pr}
            touchableOpacity
            spaceBetween={showDropArrow}
            radial={radial}
            primary={primary}
            secondary={secondary}
          >
            <Text color={color} size={size}  stretch>
              {this.state.valueSet && this.props.momentFormat
                ? moment(this.state.value).format(this.props.momentFormat)
                : this.state.value}
            </Text>

            {showDropArrow ? (
              <Icon name="calendar" color={color} type="ant" size={size * 1.3} mr={5} />
            ) : null}
          </View>
          {rightItems.length ? this.renderItems(rightItems) : null}
        </View>
        {!noValidation ? <InputError error={error} size={size} /> : null}

        <DateTimePicker
          date={
            this.state.valueSet ? new Date(this.state.value) : undefined
          }
          mode={datetime ? "datetime" : time ? "time" : "date"}
          format={datetime ? "DD-MM-YYYY HH:mm" : time ? "HH:mm" : "DD-MM-YYYY"}
          datePickerModeAndroid={datetime ? 'spinner' : time ? 'spinner' : 'calendar'}
          maximumDate={time ? undefined : this.props.maxDate ? new Date(this.props.maxDate) : undefined}
          minimumDate={time ? undefined : this.props.minDate ? new Date(this.props.minDate) : undefined}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(DatePicker);

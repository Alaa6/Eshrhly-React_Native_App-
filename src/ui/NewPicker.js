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

import Menu, {
    MenuProvider,
    MenuTrigger,
    MenuOptions,
    MenuOption,
    renderers,
} from 'react-native-popup-menu';


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
        if (nextProps.data) {
            this.setData(nextProps.data);
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
                        <View row spaceBetween stretch flex
                            onPress={() => {
                                if (this.state.loading || this.state.networkError || this.state.data.length < 1) return;

                                if (this.props.changeState) {
                                    this.props.changeState(false);
                                };
                                this.setState({
                                    visible: true,
                                    filterText: '',
                                });
                            }}
                        >
                            <Menu
                                opened={this.state.visible}
                                onBackdropPress={() => { this.setState({ visible: false }) }}
                            // onSelect={value => { console.log('value Selected ', value) }}
                            >
                                <MenuTrigger
                                    onPress={() => {
                                        if (this.state.loading || this.state.networkError || this.state.data.length < 1) return;

                                        if (this.props.changeState) {
                                            this.props.changeState(false);
                                        };
                                        // this.setState({
                                        //     visible: true,
                                        //     filterText: '',
                                        // });
                                    }}
                                    // text={this.state.label}
                                    customStyles={triggerStyles}
                                >
                                    <Text color={this.props.color} size={this.props.size} mh={5}>{this.state.label}</Text>
                                </MenuTrigger>
                                <MenuOptions customStyles={optionsStyles}>
                                    <ScrollView stretch flex height={this.props.menuHeight}>
                                        {this.state.data && this.state.data.map((item, key) => {
                                            return (
                                                <MenuOption text={item.label} onSelect={() => {
                                                    this.setState({
                                                        visible: false,
                                                        label: item.label,
                                                    });
                                                    if (this.props.changeState) {
                                                        this.props.changeState(true);
                                                    }
                                                    if (onChange) {
                                                        if (name) onChange(name, item.value);
                                                        else onChange(item.value, item.label);
                                                    }
                                                }} />


                                            )
                                        })}
                                    </ScrollView>
                                </MenuOptions>
                            </Menu>
                            <Icon ph={5} name='keyboard-arrow-down' type='material' color='primary' size={8} />
                        </View>


                    </View>

                    {(!noValidation && error) ? <InputError error={error} size={size} /> : null}


                </React.Fragment>

            </View>
        );
    }
}

const mapStateToProps = state => ({
    rtl: state.lang.rtl,
});


const triggerStyles = {
    triggerText: {
        color: '#0095DA',
        marginHorizontal: 5,
    },
    triggerOuterWrapper: {
        //   backgroundColor: 'orange',
        //   padding: 5,
        //   flex: 1,
    },
    triggerWrapper: {
        //   backgroundColor: 'blue',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   flex: 1,
    },
    triggerTouchable: {
        //   underlayColor: 'darkblue',
        //   activeOpacity: 70,
        //   style : {
        //     flex: 1,
        //   },
    },
};

const optionsStyles = {
    optionsContainer: {
        //   backgroundColor: 'green',
        //   padding: 5,
        width: '82%',
        marginTop: responsiveHeight(5),
        borderWidth: 1,
        borderColor: '#DCDCDC',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        //   justifyContent:'flex-start',
        alignItems: 'flex-end'
    },
    optionsWrapper: {
        //   backgroundColor: 'purple',
    },
    optionWrapper: {
        //   backgroundColor: 'yellow',
        margin: 5,
    },
    optionTouchable: {
        //   underlayColor: 'gold',
        //   activeOpacity: 70,
    },
    optionText: {
        color: 'gray',
    },
};

export default connect(mapStateToProps)(Picker);

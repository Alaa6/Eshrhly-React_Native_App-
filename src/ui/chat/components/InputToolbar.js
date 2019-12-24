/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Keyboard, ViewPropTypes } from 'react-native';
import { Composer, Actions } from 'react-native-gifted-chat';
import Send from './Send';
import { getColors, View as UIView } from '../../../ui'; 

export default class InputToolbar extends React.Component {

    constructor(props) {
        super(props);

        this.keyboardWillShow = this.keyboardWillShow.bind(this);
        this.keyboardWillHide = this.keyboardWillHide.bind(this);

        this.state = {
            position: 'absolute',
        };
    }

    componentWillMount() {
        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardWillShowListener.remove();
        this.keyboardWillHideListener.remove();
    }

    keyboardWillShow() {
        if (this.state.position !== 'relative') {
            this.setState({
                position: 'relative',
            });
        }
    }

    keyboardWillHide() {
        if (this.state.position !== 'absolute') {
            this.setState({
                position: 'absolute',
            });
        }
    }

    renderActions() {
        if (this.props.renderActions) {
            return this.props.renderActions(this.props);
        } else if (this.props.onPressActionButton) {
            return <Actions {...this.props} />;
        }
        return null;
    }

    renderSend() {
        if (this.props.renderSend) {
            return this.props.renderSend(this.props);
        }
        return <Send {...this.props} />;
    }

    renderComposer() {
        if (this.props.renderComposer) {
            return this.props.renderComposer(this.props);
        }

        return <Composer {...this.props} />;
    }

    renderAccessory() {
        if (this.props.renderAccessory) {
            return (
                <View style={[styles.accessory, this.props.accessoryStyle]}>{this.props.renderAccessory(this.props)}</View>
            );
        }
        return null;
    }

    render() {
        return (
            <View style={[styles.container, this.props.containerStyle, { position: this.state.position }]}>
                <View style={[styles.primary, this.props.primaryStyle, { flexDirection: this.props.rtl ? 'row-reverse' : 'row' }]}>
                    <UIView flex row center borderRadius={this.props.inputBr} m={4} style={{ backgroundColor: this.props.color }} bw={this.props.inputBw} bc={this.props.inputBc}>
                        {this.renderComposer()}
                        {this.renderActions()}
                    </UIView>
                    {this.renderSend()}
                </View>
                {this.renderAccessory()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 15,
        backgroundColor: '#FFFFFF'
    },
    primary: {
        // flexDirection: 'row',
        alignItems: 'center',
    },
    accessory: {
        height: 44,
    },
});

InputToolbar.defaultProps = {
    renderAccessory: null,
    renderActions: null,
    renderSend: null,
    renderComposer: null,
    containerStyle: {},
    primaryStyle: {},
    accessoryStyle: {},
    onPressActionButton: () => { },
};

InputToolbar.propTypes = {
    renderAccessory: PropTypes.func,
    renderActions: PropTypes.func,
    renderSend: PropTypes.func,
    renderComposer: PropTypes.func,
    onPressActionButton: PropTypes.func,
    containerStyle: ViewPropTypes.style,
    primaryStyle: ViewPropTypes.style,
    accessoryStyle: ViewPropTypes.style,
};

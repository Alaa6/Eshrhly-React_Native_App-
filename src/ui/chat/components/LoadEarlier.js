/* eslint no-use-before-define: ["error", { "variables": false }], react-native/no-inline-styles: 0 */

import PropTypes from 'prop-types';
import React from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewPropTypes,
} from 'react-native';
import I18n from 'react-native-i18n';
import { getColors } from '../../../ui'; 

export default class LoadEarlier extends React.Component {

    renderLoading() {
        if (this.props.isLoadingEarlier === false) {
            return (
                <Text style={[styles.text, this.props.textStyle]}>
                    {I18n.t('loadMore')}
                </Text>
            );
        }
        return (
            <View>
                <Text style={[styles.text, this.props.textStyle, { opacity: 0 }]}>
                    {I18n.t('loadMore')}
                </Text>
                <ActivityIndicator
                    color="gray"
                    size="small"
                    style={[styles.activityIndicator, this.props.activityIndicatorStyle]}
                />
            </View>
        );
    }
    render() {
        
        return (
            <TouchableOpacity
                style={[styles.container, this.props.containerStyle]}
                onPress={() => {
                    if (this.props.onLoadEarlier) {
                        this.props.onLoadEarlier();
                    }
                }}
                disabled={this.props.isLoadingEarlier === true}
                accessibilityTraits="button"
            >
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    {this.renderLoading()}
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F1F1',
        borderRadius: 15,
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    text: {
        color: "gray",
        fontSize: 12,
    },
    activityIndicator: {
        marginTop: Platform.select({
            ios: -14,
            android: -16,
        }),
    },
});

LoadEarlier.defaultProps = {
    onLoadEarlier: () => { },
    isLoadingEarlier: false,
    label: 'Load earlier messages',
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
    activityIndicatorStyle: {},
};

LoadEarlier.propTypes = {
    onLoadEarlier: PropTypes.func,
    isLoadingEarlier: PropTypes.bool,
    label: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    wrapperStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    activityIndicatorStyle: ViewPropTypes.style,
};

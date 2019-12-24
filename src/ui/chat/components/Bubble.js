/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Text, Clipboard, StyleSheet, TouchableWithoutFeedback, View, ViewPropTypes } from 'react-native';
import { Svg, Polygon, Polyline, G } from 'react-native-svg';

import MessageText from 'react-native-gifted-chat/lib/MessageText';
import MessageImage from 'react-native-gifted-chat/lib/MessageImage';
import MessageVideo from 'react-native-gifted-chat/lib/MessageVideo';

import Time from 'react-native-gifted-chat/lib/Time';
import Color from 'react-native-gifted-chat/lib/Color';

import { isSameUser, isSameDay } from 'react-native-gifted-chat/lib/utils';
import { getColors, View as UIView } from '../../../ui';

export default class Bubble extends React.Component {

    onLongPress = () => {
        if (this.props.onLongPress) {
            this.props.onLongPress(this.context, this.props.currentMessage);
        } else if (this.props.currentMessage.text) {
            const options =
                this.props.optionTitles.length > 0
                    ? this.props.optionTitles.slice(0, 2)
                    : ['Copy Text', 'Cancel'];
            const cancelButtonIndex = options.length - 1;
            this.context.actionSheet().showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                (buttonIndex) => {
                    switch (buttonIndex) {
                        case 0:
                            Clipboard.setString(this.props.currentMessage.text);
                            break;
                        default:
                            break;
                    }
                },
            );
        }
    };

    handleBubbleToNext() {
        if (
            isSameUser(this.props.currentMessage, this.props.nextMessage) &&
            isSameDay(this.props.currentMessage, this.props.nextMessage)
        ) {
            return StyleSheet.flatten([
                styles[this.props.position].containerToNext,
                this.props.containerToNextStyle[this.props.position],
            ]);
        }
        return null;
    }

    handleBubbleToPrevious() {
        if (
            isSameUser(this.props.currentMessage, this.props.previousMessage) &&
            isSameDay(this.props.currentMessage, this.props.previousMessage)
        ) {
            return StyleSheet.flatten([
                styles[this.props.position].containerToPrevious,
                this.props.containerToPreviousStyle[this.props.position],
            ]);
        }
        return null;
    }

    renderMessageText() {
        if (this.props.currentMessage.text) {
            const { containerStyle, wrapperStyle, ...messageTextProps } = this.props;
            if (this.props.renderMessageText) {
                return this.props.renderMessageText(messageTextProps);
            }
            return <MessageText {...messageTextProps} />;
        }
        return null;
    }

    renderMessageImage() {
        console.log("this.props.currentMessage.image", this.props.currentMessage.image)
        if (this.props.currentMessage.image) {
            const { containerStyle, wrapperStyle, ...messageImageProps } = this.props;
            if (this.props.renderMessageImage) {
                return this.props.renderMessageImage(messageImageProps);
            }
            return <MessageImage {...messageImageProps} />;
        }
        return null;
    }

    renderMessageVideo() {
        if (this.props.currentMessage.video) {
            const { containerStyle, wrapperStyle, ...messageVideoProps } = this.props;
            if (this.props.renderMessageVideo) {
                return this.props.renderMessageVideo(messageVideoProps);
            }
            return <MessageVideo {...messageVideoProps} />;
        }
        return null;
    }

    renderTicks() {
        const { currentMessage } = this.props;
        if (this.props.renderTicks) {
            return this.props.renderTicks(currentMessage);
        }
        if (currentMessage.user._id !== this.props.user._id) {
            return null;
        }
        if (currentMessage.sent || currentMessage.received || currentMessage.pending) {
            return (
                <View style={styles.tickView}>
                    {currentMessage.sent && <Text style={[styles.tick, this.props.tickStyle]}>✓</Text>}
                    {currentMessage.received && <Text style={[styles.tick, this.props.tickStyle]}>✓</Text>}
                    {currentMessage.pending && <Text style={[styles.tick, this.props.tickStyle]}>🕓</Text>}
                </View>
            );
        }
        return null;
    }

    renderTime() {
        if (this.props.currentMessage.createdAt) {
            const { containerStyle, wrapperStyle, ...timeProps } = this.props;
            if (this.props.renderTime) {
                return this.props.renderTime(timeProps);
            }
            return <Time {...timeProps} />;
        }
        return null;
    }

    renderUsername() {
        const { currentMessage } = this.props;
        if (this.props.renderUsernameOnMessage) {
            if (currentMessage.user._id === this.props.user._id) {
                return null;
            }
            return (
                <View style={styles.usernameView}>
                    <Text style={[styles.username, this.props.usernameStyle]}>~ {currentMessage.user.name}</Text>
                </View>
            );
        }
        return null;
    }

    renderCustomView() {
        if (this.props.renderCustomView) {
            return this.props.renderCustomView(this.props);
        }
        return null;
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: this.props.position === 'left' ? 'row' : 'row-reverse' }}>
                <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
                    {!this.props.timeBelow ?
                        <View style={{ alignItems: this.props.position === 'left' ? 'flex-start' : 'flex-end' }}>
                            {this.renderTime()}
                        </View> : null}
                    {!isSameUser(this.props.currentMessage, this.props.previousMessage) && this.props.pointer ?
                        <View style={[{
                            alignSelf: 'stretch', zIndex: 401, backgroundColor: this.props.position === 'right' ? 'white' : 'transparent',
                            width: 23, height: 20, position: 'absolute', top: 0,
                        }, styles[this.props.position].shift]}>
                            <Svg height="100%" width="100%">
                                {this.props.position === 'left' ?
                                    <Polygon
                                        points="0,0 23,0 23,20"
                                        fill={getColors().primary}
                                        stroke={getColors().primary}
                                        strokeWidth="1"
                                    /> :
                                    <G>
                                        <Polyline
                                            points="0,0 23,0"
                                            fill="white"
                                            stroke={"#3BA06F"}
                                            strokeWidth="6"
                                        />
                                        <Polyline
                                            points="23,1 0,20"
                                            fill="white"
                                            stroke={"#3BA06F"}
                                            strokeWidth="3"
                                        />
                                    </G>
                                }
                            </Svg>
                        </View> : null}
                    <View
                        style={[
                            styles[this.props.position].wrapper,
                            this.props.wrapperStyle[this.props.position],
                            this.handleBubbleToNext(),
                            this.handleBubbleToPrevious(),
                        ]}
                    >
                        <TouchableWithoutFeedback
                            onLongPress={this.onLongPress}
                            accessibilityTraits="text"
                            {...this.props.touchableProps}
                        >
                            <UIView>
                                {this.renderCustomView()}
                                {this.renderMessageImage()}
                                {this.renderMessageVideo()}
                                {this.renderMessageText()}
                                <View style={[styles[this.props.position].bottom, this.props.bottomContainerStyle[this.props.position]]}>
                                    {this.renderUsername()}
                                </View>
                            </UIView>
                        </TouchableWithoutFeedback>
                    </View>
                    {this.props.timeBelow ? this.renderTime() : null}
                    {this.renderTicks()}
                </View>
            </View>
        );
    }

}

const styles = {
    left: StyleSheet.create({
        container: {
            flexShrink: 1,
            alignSelf: 'stretch',
            alignItems: 'flex-start',
        },
        wrapper: {
            alignSelf: 'stretch',
            flex: 1,
            borderRadius: 20,
            borderTopLeftRadius: 0,
            backgroundColor: Color.leftBubbleBackground,
            marginRight: 5,
            marginLeft: 10,
            minHeight: 20,
            paddingVertical: 5,
            justifyContent: 'flex-end',
        },
        containerToNext: {
            borderBottomLeftRadius: 3,
        },
        containerToPrevious: {
            borderTopLeftRadius: 3,
        },
        bottom: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        shift: {
            left: 0,
        },
    }),
    right: StyleSheet.create({
        container: {
            flexShrink: 1,
            alignSelf: 'stretch',
            alignItems: 'flex-end',
        },
        wrapper: {
            alignSelf: 'stretch',
            flex: 1,
            borderRadius: 20,
            borderTopRightRadius: 0,
            backgroundColor: Color.defaultBlue,
            marginLeft: 5,
            marginRight: 10,
            minHeight: 20,
            paddingVertical: 5,
            justifyContent: 'flex-end',
        },
        containerToNext: {
            borderBottomRightRadius: 3,
        },
        containerToPrevious: {
            borderTopRightRadius: 3,
        },
        bottom: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        shift: {
            right: 0,
        }
    }),
    tick: {
        fontSize: 10,
        backgroundColor: Color.backgroundTransparent,
        color: Color.white,
    },
    tickView: {
        flexDirection: 'row',
        marginRight: 10,
    },
    username: {
        top: -3,
        left: 0,
        fontSize: 12,
        backgroundColor: 'transparent',
        color: '#aaa',
    },
    usernameView: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
};

Bubble.contextTypes = {
    actionSheet: PropTypes.func,
};

Bubble.defaultProps = {
    touchableProps: {},
    onLongPress: null,
    renderMessageImage: null,
    renderMessageVideo: null,
    renderMessageText: null,
    renderCustomView: null,
    renderUsername: null,
    renderTicks: null,
    renderTime: null,
    position: 'left',
    optionTitles: ['Copy Text', 'Cancel'],
    currentMessage: {
        text: null,
        createdAt: null,
        image: null,
    },
    nextMessage: {},
    previousMessage: {},
    containerStyle: {},
    wrapperStyle: {},
    bottomContainerStyle: {},
    tickStyle: {},
    usernameStyle: {},
    containerToNextStyle: {},
    containerToPreviousStyle: {},
};

Bubble.propTypes = {
    user: PropTypes.object.isRequired,
    touchableProps: PropTypes.object,
    onLongPress: PropTypes.func,
    renderMessageImage: PropTypes.func,
    renderMessageVideo: PropTypes.func,
    renderMessageText: PropTypes.func,
    renderCustomView: PropTypes.func,
    renderUsernameOnMessage: PropTypes.bool,
    renderUsername: PropTypes.func,
    renderTime: PropTypes.func,
    renderTicks: PropTypes.func,
    position: PropTypes.oneOf(['left', 'right']),
    optionTitles: PropTypes.arrayOf(PropTypes.string),
    currentMessage: PropTypes.object,
    nextMessage: PropTypes.object,
    previousMessage: PropTypes.object,
    containerStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    wrapperStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    bottomContainerStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    tickStyle: Text.propTypes.style,
    usernameStyle: Text.propTypes.style,
    containerToNextStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
    containerToPreviousStyle: PropTypes.shape({
        left: ViewPropTypes.style,
        right: ViewPropTypes.style,
    }),
};

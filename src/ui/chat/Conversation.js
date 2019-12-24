import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View as ViewNative,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import InputToolbar from './components/InputToolbar';
import Send from './components/Send';
import LoadEarlier from './components/LoadEarlier';
import Composer from './components/Composer';
import Actions from './components/Actions';
import Bubble from './components/Bubble';
import Avatar from './components/Avatar';
import Message from './components/Message';
import { GiftedChat, SystemMessage, Time, MessageText, Day } from 'react-native-gifted-chat';
import { View, Image, moderateScale, Text as UIText, Icon, responsiveFontSize, getColors, Navigation, Indicator } from '../../ui';
import { connect } from 'react-redux';
import axios from 'axios';
import { API_ENDPOINT, API_ENDPOINT_PATH } from '../../configs';
import { sendMessage, sendTyping, seen, getChatforUser } from '../../actions/socket';
import { refreshList } from '../../actions/list';
import { DotsLoader } from 'react-native-indicator';
import I18n from 'react-native-i18n';
import { database } from 'react-native-firebase';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import { responsiveHeight } from '../utils/responsiveDimensions';
import { getTheme } from '../Theme';


const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}

const optionsAr = {
    title: 'إختار صورة من',
    takePhotoButtonTitle: "الكاميرا",
    chooseFromLibraryButtonTitle: "المعرض",
    cancelButtonTitle: "رفض",
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
}

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const { width, height } = Dimensions.get('screen');

class Conversation extends React.Component {

    static defaultProps = {
        pointer: false,
        myBubbleColor: "#0084ff",
        friendBubbleColor: "#f0f0f0",
        myBubbleText: "white",
        friendBubbleText: "black",
        myBorderWidth: 0,
        myBorderColor: '#0084ff',
        friendBorderWidth: 0,
        friendBorderColor: '#f0f0f0',
        avatar: false,
        timeBelow: true,
        timeColor: "#aaa",
        sendButtonColor: "#0084ff",
        inputViewColor: "white",
        placeholderColor: "#aaa",
        inputBw: 0,
        inputBc: '#FFFFFF',
        composerHeight: 7,
        composerFontSize: 7,
        inputBr: 15,
        textSize: getTheme().text.size,
        timeSize: getTheme().text.size - 3,
    };

    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 2,
                    text: 'Hello there',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 3,
                    text: 'general kenobi',
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
                {
                    _id: 4,
                    text: 'hahahahahahaha',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
            uformDataFile: null,
            image: '',
            // loadingMessage: false
        };

        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        this.renderInputToolbar = this.renderInputToolbar.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderSystemMessage = this.renderSystemMessage.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.renderMessage = this.renderMessage.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
        this.renderTime = this.renderTime.bind(this);
        this.renderSend = this.renderSend.bind(this);
        this.renderComposer = this.renderComposer.bind(this);
        this.renderLoadEarlier = this.renderLoadEarlier.bind(this);
        this.renderMessageText = this.renderMessageText.bind(this);
        this.renderDay = this.renderDay.bind(this);
        this._isAlright = null;
    }

    page = 1;
    loadLastMessages(fromLoadinMore) {
        //this.props.getChatforUser(this.props.friend.id, this.page, fromLoadinMore);
    }

    componentDidMount() {
        if (this.props.type === 'ADMIN') {
            //seen({ type: this.props.type });
        }
        else {
            //seen({ user: this.props.friend.id });
        }
        this.props.refreshList(['chat']);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newMessage) {
            if (this.props.type === 'ADMIN') {
                //seen({ type: this.props.type });
            }
            else {
                //seen({ user: this.props.friend.id });
            }
            this.props.refreshList(['chat']);
        }
    }

    componentWillMount() {
        //this.props.getChatforUser(this.props.friend.id, this.page, false);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onLoadEarlier() {
        this.page = this.page + 1;
        this.loadLastMessages(true);
    }

    onSend(messages = []) {
        if (this.props.type === 'ADMIN') {
            //this.props.sendTyping({ type: this.props.type }, false);
            if (this.state.image) {
                //this.props.sendMessage({ message: this.state.uformDataFile }, true);
            }
            else {
                //this.props.sendMessage({ message: messages[0] });
            }
        }
        else {
            //this.props.sendTyping({ user: this.props.friend.id }, false);
            if (this.state.image) {
                //this.props.sendMessage({ message: this.state.uformDataFile, to: this.props.friend.id }, true);
            }
            else {
                console.log("FROMTHERERRR");
                //this.props.sendMessage({ message: messages[0], to: this.props.friend.id });
            }
        }
        this.props.refreshList(['chat']);
        this.setState({ uformDataFile: null, image: '' });
    }

    onReceive() {
        let newMessage = this.props.newMessage;
        console.log('this.props.newMessage', this.props.newMessage)
        if (newMessage)
            this.setState((previousState) => {
                return {
                    messages: GiftedChat.append(previousState.messages, newMessage)
                }
            });
        this.props.refreshList(['chat']);
    }

    uploadFile = async res => {
        const formData = new FormData();
        formData.append('file', {
            file: res.uri,
            type: res.type,
            name: res.fileName,
        });
        this.setState({ uformDataFile: res, image: res }, () => { this.onSend() });
    };

    renderCustomActions(props) {
        if (Platform.OS === 'ios') {
            return (
                <CustomActions
                    {...props}
                />
            );
        }
        const options = {
            'Camera': (props) => {
                Permissions.request('photo').then(response => {
                    if (response === 'authorized') {
                        ImagePicker.launchCamera(this.props.rtl ? optionsAr : options, response => {
                            if (!response.didCancel) {
                                let source = { uri: response.uri };
                                this.uploadFile(response);
                            }
                        });
                    }
                });
            },
            'Library': (props) => {
                Permissions.request('photo').then(response => {
                    if (response === 'authorized') {
                        ImagePicker.launchImageLibrary(this.props.rtl ? optionsAr : options, response => {
                            if (!response.didCancel) {
                                let source = { uri: response.uri };
                                this.uploadFile(response);
                            }
                        });
                    }
                });
            },
            'Cancel': () => { },
        };
        const optionsAr = {
            'الكاميرا': (props) => {
                Permissions.request('photo').then(response => {
                    if (response === 'authorized') {
                        ImagePicker.launchCamera(this.props.rtl ? optionsAr : options, response => {
                            if (!response.didCancel) {
                                let source = { uri: response.uri };
                                this.uploadFile(response);
                            }
                        });
                    }
                });
            },
            'المكتبه': (props) => {
                Permissions.request('photo').then(response => {
                    if (response === 'authorized') {
                        ImagePicker.launchImageLibrary(this.props.rtl ? optionsAr : options, response => {
                            if (!response.didCancel) {
                                let source = { uri: response.uri };
                                this.uploadFile(response);
                            }
                        });
                    }
                });
            },
            'الغاء': () => { },
        };
        return (
            <Actions
                {...props}
                options={this.props.rtl ? optionsAr : options}
            />
        );
    }

    renderDay(props) {
        return (
            <Day {...props}
                textStyle={{
                    color: this.props.timeColor,
                    fontSize: responsiveFontSize(this.props.timeSize),
                }}
            />
        );
    }

    renderMessageText(props) {
        return (
            <MessageText {...props}
                textStyle={{
                    right: {
                        fontSize: responsiveFontSize(this.props.textSize),
                        lineHeight: responsiveFontSize(this.props.textSize),
                    },
                    left: {
                        fontSize: responsiveFontSize(this.props.textSize),
                        lineHeight: responsiveFontSize(this.props.textSize),
                    }
                }}
            />
        );
    }

    renderMessage(props) {
        return (
            <Message {...props} />
        );
    }

    renderAvatar(props) {
        return (
            <Avatar {...props} />
        );
    }

    renderSend(props) {
        return (
            <Send {...props} image={this.state.image} color={this.props.sendButtonColor} />
        );
    }

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                timeBelow={this.props.timeBelow}
                pointer={this.props.pointer}
                textStyle={{
                    left: {
                        color: this.props.friendBubbleText,
                    },
                    right: {
                        color: this.props.myBubbleText,
                    }
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: this.props.friendBubbleColor,
                        borderColor: this.props.friendBorderColor,
                        borderWidth: this.props.friendBorderWidth
                    },
                    right: {
                        backgroundColor: this.props.myBubbleColor,
                        borderColor: this.props.myBorderColor,
                        borderWidth: this.props.myBorderWidth,
                    }
                }}
            />
        );
    }

    renderTime(props) {
        return (
            <Time {...props}
                textStyle={{
                    left: {
                        color: this.props.timeColor,
                        fontSize: responsiveFontSize(this.props.timeSize),
                    },
                    right: {
                        color: this.props.timeColor,
                        fontSize: responsiveFontSize(this.props.timeSize),
                    }
                }}
            />
        );
    }

    renderComposer(props) {
        return (
            <Composer {...props} placeholderTextColor={this.props.placeholderColor} composerHeight={responsiveHeight(this.props.composerHeight)}
                composerFontSize={responsiveFontSize(this.props.composerFontSize)} />
        );
    }

    renderInputToolbar(props) {
        return (
            <InputToolbar
                {...props} rtl={this.props.rtl} image={this.state.image} color={this.props.inputViewColor} inputBw={this.props.inputBw} inputBc={this.props.inputBc}
                inputBr={this.props.inputBr} />
        );
    }

    renderSystemMessage(props) {
        return (
            <SystemMessage
                {...props}
                containerStyle={{
                    marginBottom: 15,
                }}
                textStyle={{
                    fontSize: 1,
                }}

            />
        );
    }

    renderLoadEarlier(props) {
        return (
            <LoadEarlier loadEarlier={this.props.loadEarlier}
                onLoadEarlier={this.onLoadEarlier} isLoadingEarlier={this.props.isLoadingEarlier} />
        );
    }

    renderFooter(isTyping) {
        if (isTyping) {
            return (
                <ViewNative style={{
                    marginHorizontal: moderateScale(4), marginBottom: moderateScale(1),
                    alignItems: 'flex-start', alignSelf: 'stretch', zIndex: 501, paddingVertical: moderateScale(1)
                }}>
                    <Indicator size={16} type="ThreeBounce" color="#4C991A" />
                </ViewNative>
            );
        }
        return null;
    }


    render() {
        const { avater, currentUser, messages, title, friend, typing, type } = this.props
        return (
            <ViewNative style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
                <GiftedChat
                    messages={this.state.messages} //this.props.messages
                    onSend={this.onSend}
                    placeholder={I18n.t('typeMessage')}
                    loadEarlier={this.props.type === 'GROUP' ? false : this.props.loadEarlier}
                    onInputTextChanged={text => {
                        if (type === 'ADMIN') {
                            //this.props.sendTyping({ type: this.props.type }, true);
                        }
                        else {
                            //this.props.sendTyping({ user: friend.id }, true);
                        }
                        if (text === "") {
                            if (type === 'ADMIN') {
                                //this.props.sendTyping({ type: this.props.type }, false);
                            }
                            else {
                                //this.props.sendTyping({ user: friend.id }, false);
                            }
                        }
                    }}
                    onLoadEarlier={this.onLoadEarlier}
                    renderLoadEarlier={this.renderLoadEarlier}
                    isLoadingEarlier={this.props.isLoadingEarlier}
                    user={{
                        _id: 1, //currentUser.id,
                        name: "mostafa", //currentUser.fullName,
                        //avatar: `${API_ENDPOINT}${currentUser.image}`
                    }}
                    showUserAvatar={this.props.avatar}
                    renderMessage={this.renderMessage}
                    renderAvatarOnTop={true}
                    renderAvatar={this.props.avatar ? this.renderAvatar : null}
                    renderActions={this.renderCustomActions}
                    renderBubble={this.renderBubble}
                    renderSystemMessage={this.renderSystemMessage}
                    renderInputToolbar={this.renderInputToolbar}
                    renderMessageText={this.renderMessageText}
                    renderDay={this.renderDay}
                    // renderCustomView={this.renderCustomView}
                    renderTime={this.renderTime}
                    renderComposer={this.renderComposer}
                    renderSend={this.renderSend}
                    alwaysShowSend={true}
                    renderChatFooter={() => this.renderFooter(typing)}
                    extraData={this.props}
                    minInputToolbarHeight={height * 0.10}
                />
            </ViewNative>
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        backgroundColor: 'red'
    },
    footerText: {
        fontSize: 14,
        color: '#aaa',
    },
});

const mapStateToProps = state => {

    return {
        typing: state.chat.typing,
        messages: state.chat.messages ? state.chat.messages : [],
        newMessage: state.chat.newMessage,
        unSeenCount: state.chat.unSeenCount,
        loadEarlier: state.chat.loadEarlier,
        isLoadingEarlier: state.chat.isLoadingEarlier,
        rtl: state.lang.rtl,
        currentUser: state.auth.user,
        token: state.auth.token,
    }
};


export default connect(mapStateToProps, { sendMessage, sendTyping, seen, getChatforUser, refreshList })(Conversation);
//export default connect(mapStateToProps, { refreshList })(Conversation);


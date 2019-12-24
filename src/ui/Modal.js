import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from "react-redux";
import { Form, Text, Input, Button, Navigation, View, Icon, ScrollView } from '../ui'


class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        if (!this.props.visible) {
            return null;
        }
        else {
            return (
                <View style={styles.container}
                    onPress={() => (this.props.onBackdropPress) ? this.props.onBackdropPress() : null}>
                        {this.props.children}
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        alignSelf: 'stretch',
    }
})


const mapStateToProps = state => {
    return {
        //
    }
}

export default connect(mapStateToProps)(Modal);

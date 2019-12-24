
import React, { Component } from 'react';
import { View, Text, Icon } from '../ui';

export default class Checkbox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status: this.props.status,
    }
  }

  render() {
    const { status } = this.state;
    return (
        !status ?
          <View onPress={() => { this.props.onPress(true, this.props.value); this.setState({ status: true }) }} center mh={3} touchableOpacity>
            <Icon name='square-o' type='font-awesome' color={this.props.color ? this.props.color : 'primary'} size={6} />
          </View>
          :
          <View onPress={() => { this.props.onPress(false, this.props.value); this.setState({ status: false }) }} center mh={3} touchableOpacity >
            <Icon name='check-square' type='font-awesome' color={this.props.color ? this.props.color : 'primary'} size={6} />
          </View>
    );
  }
}

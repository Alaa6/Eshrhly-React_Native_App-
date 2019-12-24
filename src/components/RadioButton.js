import React, { Component } from 'react';
import { View, Text, Icon } from '../ui';

export default class RadioButton extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { status , square , color ,type} = this.props;
        return (
          square?(
              !status ?
                <View bw={1} bc={color?color:'orange'} borderRadius={4} height={3} width={5} onPress={() => this.props.onPress()} mh={3}/>
               : 
               <View bw={1} bc={color?color:'orange'} center borderRadius={4} height={3} width={5} onPress={() => this.props.onPress()} mh={3}>
               <Icon name='check' type='font-awesome' color={color?color:'secondary'}  size={9} />
              </View>
          ):(
            !status ?
                <View bw={1} bc={'primary'} circleRadius={6} onPress={() => this.props.onPress(this.props.value)} mh={19} backgroundColor={'white'} type ={ type?'visa' :'cash'}>
                     
                </View>
                :
                <View  circleRadius={6} onPress={() => this.props.onPress(this.props.value)} mh={18} >
                    <Icon name='checkcircle' type='ant' color='primary' size={10} />
                </View>
                )
        );
    }
}

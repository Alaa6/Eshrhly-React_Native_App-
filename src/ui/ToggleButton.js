import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RectButton } from 'react-native-gesture-handler';

// TODO add some predefined customized different shapes
class ToggleButton extends PureComponent {
  static propTypes = {
    render: PropTypes.func.isRequired,
    initialState: PropTypes.bool,
    name: PropTypes.string,
    onToggle: PropTypes.func,
    oneWaySwitch: PropTypes.bool,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      active: props.initialState,
    };
  }

  onToggle = () => {
    const { oneWaySwitch, onToggle, name } = this.props;

    if (oneWaySwitch) {
      if (onToggle) {
        if (name) onToggle(name, true);
        else onToggle(true);
      }
      this.setState({
        active: true,
      });
      return;
    }

    this.setState(prevState => {
      if (onToggle) {
        if (name) onToggle(name, !prevState.active);
        else onToggle(!prevState.active);
      }

      return {
        active: !prevState.active,
      };
    });
  };

  render() {
    return (
      <RectButton onPress={this.onToggle}>
        {this.props.render(this.state.active)}
      </RectButton>
    );
  }
}

export default ToggleButton;

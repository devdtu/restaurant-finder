import React, { Component } from "react";
import Toggle from "react-toggle";

class SwitchButton extends Component {
  constructor() {
    super();
    // this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    // console.log("here");
    // this.setState({ checked });
    this.props.switchChanged();
  }

  render() {
    return (
      <Toggle
        defaultChecked={this.props.checked}
        onChange={this.handleChange}
      />
    );
  }
}

export default SwitchButton;

import React, { Component } from 'react';

class ControlPanel extends Component {

    divStyle = {
        background: 'red',
        position: 'absolute',
        zIndex: '50',
      };

    render() {
        return <div style={this.divStyle}>PLOOPY</div>
    }
}
export default ControlPanel;
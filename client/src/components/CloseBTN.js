import React, { Component } from 'react';

class CloseBTN extends Component {
    state = {
        on: false,
    }

    toggle = () => {
        this.setState({
            on: !this.state.on
        })
    }
    render() {
        return (
            <div>
                {this.state.on && this.props.children
                }
                <button onClick={this.toggle}>Close</button>
            </div>
        );
    }
}

export default CloseBTN;
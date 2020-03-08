import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom';

class CompUI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }
    handleSubmit(e) {
        if (e.key === 'Enter') {
            return this.props.inputEnter();
        }
    }
    render() {  
        return (
            <div>
                <input type="number" value={this.state.value} placeholder="payment" onChange={this.handleChange} onKeyDown={this.handleSubmit.bind(this)}/>
                <button onClick={this.props.onClick}>Open</button>
            </div>
        );
    }
}

export default CompUI;
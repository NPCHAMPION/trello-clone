import React, { Component } from 'react';

import './main.css'

export class MainLayout extends Component {
    render() {
        return (
            <div className="main-bg">
                {this.props.children}
            </div>
        )
    }
}
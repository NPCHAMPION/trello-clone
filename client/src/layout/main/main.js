import React, { Component } from 'react';

import './main.css'

export class MainLayout extends Component {
    render() {
        return (
            <div class="main-bg">
                {this.props.children}
            </div>
        )
    }
}
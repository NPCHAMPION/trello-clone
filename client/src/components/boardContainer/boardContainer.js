import React, { Component } from 'react';

import './board.css';

class Items extends Component {

    render() {
        const fakeData = [
            {
                "name": 'item1',
                "contents": 'words about item1'
            },
            {
                name: 'item2',
                "contents": "words about item 2"
            }
        ];
        
        const items = fakeData.map( (item) => 
            <div className="item">
                <h3>{item.name}</h3>
                <p>{item.contents}</p>
            </div>
        )
        return (
            <div className="items-block">
                {items}
            </div>
        )
    }
}

class Board extends Component {

    render() {
        const title = this.props.title;
        return (
            <div className="board-container">
                <p className="close">x</p>
                <h1>{title}</h1>
                <Items />
            </div>
        )
    }
}

export class BoardContainer extends Component {

    render() {
        const boards = this.props.boards;

        return (
            <div>
                <input type="text" />
                { boards ? boards : null }
                <Board title="title!"/>
            </div>
        )
    }
}
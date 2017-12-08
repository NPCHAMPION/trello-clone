import React, { Component } from 'react'

import './item.css'

export default class Items extends Component {

    getItems = () => {

    }

    addItem = () => {

    }

    deleteItem = () => {

    }

    updateItem = () => {

    }

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

        const items = fakeData.map( (item,index) =>
            <div className="item" key={ index }>
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

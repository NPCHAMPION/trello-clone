import React, { Component } from 'react';
import './board.css';
import axios from 'axios';


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
        const title = this.props.info.name;
        return (
            <div className="board-container">
                <p className="close">x</p>
                <h1>{ title }</h1>
                <Items />
            </div>
        )
    }
}

export class BoardContainer extends Component {

    constructor (props) {
        super(props)

        this.state = {
            data: []
        }

        this.getData = this.getData.bind(this)
    }

    getData() {
        var url = '/api'
        axios.get(url)
            .then( (res) => {
                console.log(res.data)
                this.setState({ data: res.data })
            })
    }

    postData(name) {
        var url = '/api'
        axios.post()
    }

    componentDidMount() {
        this.getData()

    }

    render() {
        const boards = this.state.data ? this.state.data.map( (item, index) => <Board key={ item._id } info={ item } />) : null

        return (
            <div>
                <input type="text" />
                { boards ? boards : null }
            </div>
        )
    }
}
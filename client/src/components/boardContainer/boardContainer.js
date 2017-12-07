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
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const title = this.props.info.name;
        return (
            <div className="board">
                <div className="board-header">
                    { this.props.children }
                    <h2 className="board-name">{ title }</h2>
                </div>
                <div className="board-contents">
                    <Items />
                </div>
            </div>
        )
    }
}

export class BoardContainer extends Component {

    constructor (props) {
        super(props)

        this.state = {
            data: [],
            name: ''
        }

        this.getBoards = this.getBoards.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(event) {
        // add new board
        event.preventDefault()
        this.addBoard()
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }

    getBoards() {
        let url = this.props.url
        axios.get(url)
            .then( (res) => {
                console.log(res.data)
                this.setState({ data: res.data })
            })
            .catch( err => console.log(err))
    }

    addBoard = () => {
        let url = this.props.url
        let name = this.state.name.trim()
        axios.post(url, {
                name: name
                }
            )
        .then( res => {
            this.setState({ name: '' })
            this.getBoards()
        })
    }

    deleteBoard = (e) => {
        var url = this.props.url + e.target.id
        axios.delete(url)
            .then( res => {
                console.log('Board deleted!')
            })
            .catch( err => alert(err))

        // refresh boards
        this.getBoards()
    }

    componentDidMount() {
        this.getBoards()
    }

    render() {
        const boards = this.state.data ? this.state.data.map( (item, index) => (
            <Board url={ this.props.url } key={ item._id } info={ item }>
                <p id={ item._id } className="close" onClick={ this.deleteBoard }>x</p>
            </Board>
        )) : null

        return (
            <div className="board-container">
                { boards ? boards : null }
                <form className="board-input" onSubmit={ this.handleSubmit }>
                    <input type="text" placeholder='Enter new board name' value={ this.state.name } onChange={ this.handleNameChange } />
                </form>
            </div>
        )
    }
}
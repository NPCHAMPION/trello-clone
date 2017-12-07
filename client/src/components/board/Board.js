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

class List extends Component {
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

export class Board extends Component {

    constructor (props) {
        super(props)

        this.state = {
            data: [],
            name: ''
        }

        this.getLists = this.getLists.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(event) {
        // add new board
        event.preventDefault()
        this.addList()
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value })
    }

    getLists() {
        let url = this.props.url
        axios.get(url)
            .then( (res) => {
                console.log(res.data)
                this.setState({ data: res.data })
            })
            .catch( err => console.log(err))
    }

    addList = () => {
        let url = this.props.url
        let name = this.state.name.trim()
        axios.post(url, {
                name: name
                }
            )
        .then( res => {
            this.setState({ name: '' })
            this.getLists()
        })
    }

    deleteList = (e) => {
        var url = this.props.url + e.target.id
        axios.delete(url)
            .then( res => {
                console.log('Board deleted!')
            })
            .catch( err => alert(err))

        // refresh boards
        this.getLists()
    }

    componentDidMount() {
        this.getLists()
    }

    render() {
        const lists = this.state.data ? this.state.data.map( (item, index) => (
            <List url={ this.props.url } key={ item._id } info={ item }>
                <p id={ item._id } className="close" onClick={ this.deleteList }>x</p>
            </List>
        )) : null

        return (
            <div className="board-container">
                { lists ? lists : null }
                <form className="board-input" onSubmit={ this.handleSubmit }>
                    <input type="text" placeholder='Enter new board name' value={ this.state.name } onChange={ this.handleNameChange } />
                </form>
            </div>
        )
    }
}
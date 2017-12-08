import React, { Component } from 'react';
import List from '../list/List';
import './board.css';
import styles from './styles.js'
import axios from 'axios';

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
            <div style={styles.listBox} key={ item._id }>
              <p id={ item._id } style={styles.close} onClick={ this.deleteList }>x</p>
              <List url={ this.props.url } id={ item._id } info={ item } />
            </div>
        )) : null

        return (
            <div className="board-container">
                { lists ? lists : null }
                <form className="board-input" onSubmit={ this.handleSubmit }>
                    <input type="text" placeholder='Enter new list name' value={ this.state.name } onChange={ this.handleNameChange } />
                </form>
            </div>
        )
    }
}

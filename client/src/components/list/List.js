import React, { Component } from 'react';
import axios from 'axios';

import './list.css'

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

export default class List extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editing: false,
            keyPressed: false,
            name: this.props.info.name
        }
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value })
    }

    toggleKeyPressed = () => {
      this.setState(prevState => ({ keyPressed: !prevState.keyPressed }))
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.toggleKeyPressed()
            e.preventDefault()
            this.updateList()
            this.toggleEditing()
        }
    }

    handleBlur = () => {
      if (!this.state.keyPressed) {
        console.log('handleSubmit called. keyPressed: false.')
        this.updateList()
        this.toggleEditing()
      } else {
        // onBlur will be called when you toggleEditing() because
        // you are removing the input element. So, we toggle keyPressed
        // again to set everything back to normal.
        this.toggleKeyPressed()
      }
    }

    updateList = () => {
        console.log('updateList called');
        let name = this.state.name.trim()
        let url = this.props.url + this.props.info._id
        axios.put(url, {
            name: name
        })
            .then( res => {
              res.send
            })
            .catch( err => {
                console.log(err)
            })

    }

    edit = (e) => {
      this.toggleEditing()
    }
    toggleEditing = () => {
        this.setState( prevState => ({ editing: !prevState.editing }));
    }

    render() {
        let header = null
        if (this.state.editing) {
          header =
            <input autoFocus
                type="text"
                className='edit'
                maxLength="5"
                onChange={ this.handleNameChange }
                onFocus={ (e) => {
                  var val = e.target.value;
                  e.target.value = '';
                  e.target.value = val;
                }}
                defaultValue={ this.state.name }
                onBlur= { this.handleBlur }
                onKeyPress={ this.handleKeyPress }
                />
        } else {
          header =
            <h2
              className="board-name"
              onClick={ this.edit }>
              { this.state.name }
            </h2>
        }
        return (
            <div className="board">
                <div className="board-header">
                    { this.props.children } {/* for close button */}
                    {/* { if (this.state.editing )}
                    <input
                        className={ this.state.editing ? 'edit' : 'hide'}
                        id={ this.props.info._id }
                        onChange={ this.handleNameChange }
                        type="text"
                        defaultValue={ this.state.name }
                        onBlur= { this.handleBlur }
                        onKeyPress={ this.handleKeyPress }
                        />
                    <h2 className={ this.state.editing ? "board-name hide" : "board-name" } onClick={ this.edit }>{ this.state.name }</h2> */}
                    { header }
                </div>
                <div className="board-contents">
                    <Items />
                </div>
            </div>
        )
    }
}

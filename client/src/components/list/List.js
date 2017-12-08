import React, { Component } from 'react';
import axios from 'axios';
import Items from '../items/Items'

import './list.css'

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
              res.send('List updated')
            })
            .catch( err => {
                console.log(err)
            })

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
                maxLength="20"
                onChange={this.handleNameChange}
                onFocus={ (e) => {
                  var val = e.target.value;
                  e.target.value = '';
                  e.target.value = val;
                }}
                defaultValue={this.state.name}
                onBlur= {this.handleBlur}
                onKeyPress={this.handleKeyPress}
                />
        } else {
          header =
            <h2
              className="board-name"
              onClick={this.toggleEditing}>
              {this.state.name}
            </h2>
        }
        return (
            <div className="board">
                <div className="board-header">
                    {header}
                </div>
                <div className="board-contents">
                    <Items listId={this.props.info._id} url='/api/item/'/>
                </div>
            </div>
        )
    }
}

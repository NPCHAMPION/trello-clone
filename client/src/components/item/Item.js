import React, { Component } from 'react'
import axios from 'axios'

import './item.css'

export default class Items extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: null,
      itemText: '',
      keyPressed: false,
    }
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = () => {
    axios.get(this.props.url)
      .then( res => {
        this.setState({ items: res.data })
      })
  }

  addItem = () => {
    axios.post(this.props.url, {
      text: this.state.itemText
    })
    .catch(err => alert(err))
    this.getItems()
    this.setState({itemText: ''})
  }

  deleteItem = (e) => {
    axios.delete(this.props.url + e.target.id)
    .catch(err => alert(err))
    this.getItems()
  }

  updateItem = () => {

  }

  changeItemText = (e) => {
    this.setState({ itemText: e.target.value })
  }

  toggleKeyPressed = () => {
    this.setState( prevState => ({keyPressed: !prevState.keyPressed}))
  }

  blurAddItem = () => {
      if (!this.state.keyPressed) {
        console.log('blurAddItem called. keyPressed: false.')
        this.addItem()
      } else {
        // onBlur will be called when you toggleEditing() because
        // you are removing the input element. So, we toggle keyPressed
        // again to set everything back to normal.
        this.toggleKeyPressed()
      }

  }

  keyAddItem = (e) => {
    if (e.key === 'Enter') {
        this.toggleKeyPressed()
        e.preventDefault()
        this.addItem()
    }

  }

  render() {

    var renderedItems = null
    if (this.state.items) {
      renderedItems = this.state.items.map( (item, index) => {
        return (
          <div key={item._id} className="item">
            <p>{item.text}</p>
            <p className="close-item" id={item._id} onClick={this.deleteItem}>x</p>
          </div>
        )
      })
    } else {
      renderedItems = <p></p>
    }

    return (
      <div>
        {renderedItems}
        <input type="text"
          placeholder='New Item'
          value={this.state.itemText}
          onChange={this.changeItemText}
          onBlur= {this.blurAddItem}
          onKeyPress={this.keyAddItem}

        />
      </div>
    )
  }
}

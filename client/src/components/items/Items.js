import React, { Component } from 'react'
import axios from 'axios'
import Item from './Item'
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
    axios.get(this.props.url + this.props.listId)
      .then( res => {
        this.setState({ items: res.data })
      })
      console.log(this.state.items);
  }

  addItem = () => {
    axios.post(this.props.url + this.props.listId, {
      text: this.state.itemText,
      listId: this.props.listId
    })
    .catch(err => alert(err))
    this.getItems()
    this.setState({itemText: ''})
  }

  deleteItem = (e) => {
    console.log('delete called');
    axios.delete(this.props.url + e.target.id)
    .catch(err => alert(err))
    this.getItems()
  }

  changeItemText = (e) => {
    this.setState({ itemText: e.target.value })
  }

  toggleKeyPressed = () => {
    this.setState( prevState => ({keyPressed: !prevState.keyPressed}))
  }

  blurAddItem = () => {
      if (!this.state.keyPressed) {
        this.addItem()
      } else {
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
            <p
              className="close-item"
              id={item._id}
              onClick={this.deleteItem}
              >
                x
            </p>
            <Item
              url={this.props.url}
              id={item._id}
              text={item.text}
              updateItems={this.getItems}
            />
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
          className="item-input"
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

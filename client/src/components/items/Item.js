import React, { Component } from 'react'
import axios from 'axios'

export default class EditableP extends Component {

  constructor(props) {
    super(props)

    this.state = {
      editing: false,
      itemText: this.props.text,
      keyPressed: false,
    }
  }

  updateItem = (e) => {
    var id = e.target.id
    axios.put(this.props.url + id, {
      text: this.state.itemText
    })
    .then(
      this.props.updateItems()
    )
  }

  toggleEdit = () => {
    this.setState(prevState => ({ editing: !prevState.editing }))
  }

  changeItemText = (e) => {
    this.setState({ itemText: e.target.value.trim() })
  }

  toggleKeyPressed = () => {
    this.setState( prevState => ({keyPressed: !prevState.keyPressed}))
  }

  handleBlur = (e) => {
      if (!this.state.keyPressed) {
        this.updateItem(e)
      }
      this.toggleKeyPressed()
      this.toggleEdit()
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.toggleKeyPressed()
      e.preventDefault()
      this.updateItem(e)
      this.toggleEdit()
    }
  }

  render() {
    if (this.state.editing) {
      return (
        <input autoFocus
          id={this.props.id}
          type="text"
          onChange={this.changeItemText}
          onFocus={ (e) => {
            var val = e.target.value;
            e.target.value = '';
            e.target.value = val;
          }}
          defaultValue={this.state.itemText}
          onBlur= {this.handleBlur}
          onKeyPress={this.handleKeyPress}
        />
      )
    } else {
      return (
        <p
          onClick={this.toggleEdit}
          >{this.state.itemText}</p>
      )
    }
  }
}

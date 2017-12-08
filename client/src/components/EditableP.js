import React, { Component } from 'react'

export default class EditableP extends Component {

  constructor(props) {
    super(props)

    this.state = {
      editing: false,
      itemText: this.props.text,
      keyPressed: false,
    }
  }

  toggleEdit = () => {
    this.setState(prevState => ({ editing: !prevState.editing }))
  }

  changeItemText = (e) => {
    this.setState({ itemText: e.target.value })
  }

  toggleKeyPressed = () => {
    this.setState( prevState => ({keyPressed: !prevState.keyPressed}))
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.toggleKeyPressed()
      e.preventDefault()
      this.toggleEdit()
    }
  }

  handleBlur = () => {
    if (!this.state.keyPressed) {
      this.toggleEdit()
    } else {
      // onBlur will be called when you toggleEditing() because
      // you are removing the input element. So, we toggle keyPressed
      // again to set everything back to normal.
      this.toggleKeyPressed()
    }
  }

  render() {
    if (this.state.editing) {
      return (
        <input autoFocus
          type="text"
          onChange={this.handleNameChange}
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
          >{this.props.text}</p>
      )
    }
  }
}

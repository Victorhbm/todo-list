import React, { Component } from 'react'

export default class Item extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
    };
  }

  componentDidMount() {
    const { todo } = this.props;
    this.setState({
      checked: todo.checked,
    });
  }

  handleCheck(todo, onCheckChange) {
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    })
    onCheckChange(todo, checked);
  }

  render() {
    const { todo, onCheckChange, onItemRemove } = this.props;
    const { checked } = this.state;

    return (
      <li>
        <span className="todo-content">
          <label htmlFor={ todo.task } style={{ textDecoration: checked ? 'line-through' : 'none' }}>
            <input
              type="checkbox"
              name={ todo.task }
              id={ todo.task }
              className="input-todo"
              checked={ checked }
              onChange={ () => this.handleCheck(todo, onCheckChange) }
            />
            {todo.task}
          </label>
        </span>

        <span>
          <button
            className="remove-btn"
            onClick={ () => onItemRemove(todo) }
            type="button"
          >
            X
          </button>
        </span>
      </li>
    )
  }
}

import React, { Component } from 'react'
import Item from './Item';

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      task: '',
      taskList: [],
      opa: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onItemRemove = this.onItemRemove.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  componentDidMount() {
    this.getFromLocalStorage()
  }

  handleChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { task, taskList } = this.state;
    taskList.push({
      task,
      checked: false,
    });
    this.setState({
      task: '',
      taskList,
    });
    this.saveInLocalStorage(taskList);
  }

  onCheckChange(element, checked) {
    const { taskList } = this.state;
    const task = taskList.indexOf(element);
    taskList[task].checked = !checked;
    this.setState({
      taskList,
    })
    this.saveInLocalStorage(taskList);
  }

  onItemRemove(element) {
    const { taskList } = this.state;
    const newTaskList = taskList.filter((task) => task !== element);
    this.setState({
      taskList: newTaskList,
    })
    this.saveInLocalStorage(newTaskList);
  }

  clearCompleted() {
    const { taskList } = this.state;
    const filterNoCompleted = taskList.filter((task) => task.checked === false);
    this.setState({
      taskList: filterNoCompleted,
    });
    this.saveInLocalStorage(filterNoCompleted);
  }

  saveInLocalStorage = (item) => {
    localStorage.setItem('tasks', JSON.stringify(item));
  }

  getFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    this.setState({
      taskList: tasks ? tasks : [],
    });
  }

  render() {
    const { task, taskList } = this.state;

    return (
      <main>
        <form onSubmit={ (e) => this.handleSubmit(e) } className="input-container">
          <input
            type="text"
            name="input-task"
            id="input-task"
            maxLength="35"
            required
            placeholder="tarefa"
            value={ task }
            onChange={ ({target}) => this.handleChange('task', target.value) }
          />
          <button className="buttons" id="button-add" type="submit">
            +
          </button>
        </form>

        <div className="list-container">
          <ul>
            {taskList.map((todo, i) => (
              <Item
                key={ todo.task }
                todo={ todo }
                onCheckChange={ this.onCheckChange }
                onItemRemove={ this.onItemRemove }
              />
            ))}
          </ul>
        </div>

        <div className="info-tasks-container">
          <p>
            {taskList.filter((task) => task.checked).length} de 
            {' '}
            {taskList.length} concluídos
          </p>
        </div>

        <div className="buttons-container">
          <button className="buttons" onClick={ this.clearCompleted } type="button">
            Remover concluídos
          </button>
          <button
            className="buttons"
            onClick={ () => {
              this.setState({ taskList: [] })
              this.saveInLocalStorage([]);
            } }
          >
            Limpar lista
          </button>
        </div>
      </main>
    )
  }
}

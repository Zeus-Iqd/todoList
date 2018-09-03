import React, { Component } from 'react'
import axios from 'axios'
import {
  message,
  Modal
} from 'antd'
import TodoListUi from './TodoListUi'
import store from './store'
import {
  createAddListItemAction,
  asyncCreateAddListItemAction,
  createChangeInputValueAction,
  createDeleteListItemAction,
  createInitAction
} from './store/createAction'
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.addListItem = this.addListItem.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.deleteListItem = this.deleteListItem.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    console.log(store)
    store.subscribe(() => {
      this.handleStoreChange()
    })

  }
  render() {
    return (
      <TodoListUi
        inputValue={this.state.inputValue}
        handleInput={this.handleInput}
        addListItem={this.addListItem}
        list={this.state.list}
        deleteListItem={this.deleteListItem}
        handleKeyDown={this.handleKeyDown}
      />
    )
  }
  componentDidMount() {
    const action = createInitAction()
    store.dispatch(action)
  }
  addListItem() {
    const { inputValue } = this.state
    if (!inputValue) {
      message.error('内容不能为空', 1)
      return
    }
    const action = asyncCreateAddListItemAction(inputValue)
    store.dispatch(action)
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.addListItem()
    }
  }
  handleInput(e) {
    const { value } = e.target
    const action = createChangeInputValueAction(value)
    store.dispatch(action)
  }
  handleStoreChange() {
    this.setState(() => {
      return store.getState()
    })
  }
  deleteListItem(index, item) {
    const { confirm } = Modal
    confirm({
      title: '删除',
      content: '请确认是否删除',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        axios.post('get/delete', {
          id: item._id
        }).then(res => {
          const action = createDeleteListItemAction(index)
          store.dispatch(action)
        }).catch(res => {
          message.error(res, 1)
        })
      },
      onCancel() {
        message.info('有毛病', 1)
      },
    })

  }
}


export default TodoList
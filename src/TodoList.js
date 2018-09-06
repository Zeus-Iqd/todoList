import React, { Component } from 'react'
import axios from 'axios'
import {
  message,
  Modal
} from 'antd'
import TodoListUi from './TodoListUi'
import store from './store'
import {
  asyncCreateAddListItemAction,
  createChangeInputValueAction,
  createDeleteListItemAction,
  createInitAction
} from './store/createAction'
let detail
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.addListItem = this.addListItem.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.deleteListItem = this.deleteListItem.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.showDialog = this.showDialog.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
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
        handleOk={this.handleOk}
        showDialog={this.showDialog}
        visible={this.state.visible}
        content={this.state.content}
        handleCancel={this.handleCancel}
        handleChangeContent={this.handleChangeContent}
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
  handleOk() {
    this.setState((pre) => {
      return {
        visible: false
      }
    })
    axios.post('get/edit', {
      id: detail._id,
      list: this.state.content
    }).then(res => {
      const action = createInitAction()
      store.dispatch(action)
    })
  }
  handleCancel() {
    this.setState((pre) => ({
      visible: !pre.visible
    }))
  }
  showDialog(item) {
    detail = item
    console.log(detail, 'detail')
    this.setState((pre => {
      return {
        visible: true,
        content: item.list
      }
    }))
  }
  handleChangeContent(e) {
    const value = e.target.value
    console.log(value)
    this.setState(pre => {
      return {
        content: value
      }
    })
  }
}


export default TodoList
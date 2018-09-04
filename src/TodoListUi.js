import React from 'react'
import axios from 'axios'
import {
  createInitAction
} from './store/createAction'
import store from './store'
import {
  Input,
  Icon,
  Button,
  List,
  Modal
} from 'antd'
// 每一条
let detail
class TodoListUI extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {
      visible: false,
      content: ''
    }
  }
  render() {
    return (
      <div style={{ marginTop: 10, marginLeft: 10, width: 300 }}>
        <h2 className="title">TodoList</h2>
        <div style={{ marginBottom: 16, }}>
          <Input
            value={this.props.inputValue}
            onChange={this.props.handleInput}
            onKeyDown={this.props.handleKeyDown}
            addonAfter={
              <Icon type="plus" onClick={this.props.addListItem} />
            }
            placeholder="请输入待办事项" />
        </div>
        <List
          itemLayout="horizontal"
          bordered
          dataSource={this.props.list}
          renderItem={(item, index) => (
            <List.Item
              className="list"
            >
              <span className="content">{item.list}</span>
              {<Button
                size='small'
                type="primary"
                onClick={() => { this.showDialog(item) }}
              >
                编辑
                    </Button>}
              {<Button
                size='small'
                type="danger"
                onClick={() => { this.props.deleteListItem(index, item) }}
              >
                删除
                    </Button>}
            </List.Item>
          )}
        />
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input
            value={this.state.content}
            onChange={this.handleChange}
          />
        </Modal>
      </div >
    )
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
  handleChange(e) {
    const value = e.target.value
    console.log(value)
    this.setState(pre => {
      return {
        content: value
      }
    })
  }
}
export default TodoListUI
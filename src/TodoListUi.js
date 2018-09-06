import React from 'react'
import {
  Input,
  Icon,
  Button,
  List,
  Modal
} from 'antd'
// 每一条
class TodoListUI extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{ marginTop: 10, marginLeft: 10, width: 300 }}>
        <h2 className="title">TodoList120</h2>
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
                onClick={() => { this.props.showDialog(item) }}
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
          visible={this.props.visible}
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
        >
          <Input
            value={this.props.content}
            onChange={this.props.handleChangeContent}
          />
        </Modal>
      </div >
    )
  }
}
export default TodoListUI
import {
  Add_List_Item,
  Change_InputValue,
  Delete_List_Item,
  Init_List
} from './actionTypes'
import axios from 'axios'

function createAddListItemAction() {
  return {
    type: Add_List_Item,
  }
}
function asyncCreateAddListItemAction(value) {
  return (dispatch) => {
    axios.post('/get/addList', {
      list: value
    })
      .then(function (res) {
        console.log(res)
        const action = createAddListItemAction()
        dispatch(action)
      })
      .catch(res => {
        console.log(res)
      })
  }
}
function createChangeInputValueAction(value) {
  return {
    type: Change_InputValue,
    value
  }
}
function createDeleteListItemAction(index) {
  return {
    type: Delete_List_Item,
    index
  }
}
function syncCreateInitAction(data) {
  return {
    type: Init_List,
    data
  }
}
function createInitAction() {
  return (dispatch) => {
    axios.get('/get/todoList')
      .then(function (res) {
        const action = syncCreateInitAction(res.data)
        dispatch(action)
      })
  }
}


export {
  createAddListItemAction,
  asyncCreateAddListItemAction,
  createChangeInputValueAction,
  createDeleteListItemAction,
  createInitAction
}
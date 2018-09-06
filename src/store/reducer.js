import {
  Add_List_Item,
  Change_InputValue,
  Delete_List_Item,
  Init_List
} from './actionTypes'
const defaultState = {
  inputValue: '',
  visibility: false,
  content: '',
  list: []
}
export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  if (action.type === Change_InputValue) {
    newState.inputValue = action.value
    return newState
  }
  if (action.type === Add_List_Item) {
    newState.list.push({ list: newState.inputValue, id: '' })
    newState.inputValue = ''
    return newState
  }

  if (action.type === Delete_List_Item) {
    newState.list.splice(action.index, 1)
    return newState
  }
  if (action.type === Init_List) {
    newState.list = action.data
    return newState
  }
  return state
}
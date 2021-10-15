import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
} from './reducers/authReducers'

import {
  addSubjectReducer,
  listSubjectReducer,
  updateSubjectReducer,
  deleteSubjectReducer,
  detailSubjectReducer,
  addTopicReducer,
} from './reducers/subjectReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  addSubject: addSubjectReducer,
  listSubject: listSubjectReducer,
  updateSubject: updateSubjectReducer,
  deleteSubject: deleteSubjectReducer,
  detailSubject: detailSubjectReducer,
  addTopic: addTopicReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

import {
  ADD_SUBJECT_REQUEST,
  ADD_SUBJECT_SUCCESS,
  ADD_SUBJECT_FAIL,
  LIST_SUBJECT_REQUEST,
  LIST_SUBJECT_SUCCESS,
  LIST_SUBJECT_FAIL,
  UPDATE_SUBJECT_SUCCESS,
  UPDATE_SUBJECT_REQUEST,
  UPDATE_SUBJECT_FAIL,
  UPDATE_SUBJECT_RESET,
  DELETE_SUBJECT_REQUEST,
  DELETE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_FAIL,
  DELETE_SUBJECT_RESET,
  ADD_SUBJECT_RESET,
  DETAIL_SUBJECT_REQUEST,
  DETAIL_SUBJECT_SUCCESS,
  DETAIL_SUBJECT_RESET,
  DETAIL_SUBJECT_FAIL,
} from "../constants/subjectConstants";

export const addSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SUBJECT_REQUEST:
      return { loading: true };
    case ADD_SUBJECT_SUCCESS:
      return { loading: false, success: true, subject: action.payload };
    case ADD_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case ADD_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const listSubjectReducer = (state = { subjects: [] }, action) => {
  switch (action.type) {
    case LIST_SUBJECT_REQUEST:
      return { loading: true };
    case LIST_SUBJECT_SUCCESS:
      return { loading: false, subjects: action.payload };
    case LIST_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSubjectReducer = (state = { subject: {} }, action) => {
  switch (action.type) {
    case UPDATE_SUBJECT_REQUEST:
      return { loading: true };
    case UPDATE_SUBJECT_SUCCESS:
      return { loading: false, success: true, subject: action.payload };
    case UPDATE_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SUBJECT_RESET:
      return { subject: {} };
    default:
      return state;
  }
};

export const deleteSubjectReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUBJECT_REQUEST:
      return { loading: true };
    case DELETE_SUBJECT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_SUBJECT_RESET:
      return {};
    default:
      return state;
  }
};

export const detailSubjectReducer = (state = { subject: {} }, action) => {
  switch (action.type) {
    case DETAIL_SUBJECT_REQUEST:
      return { loading: true };
    case DETAIL_SUBJECT_SUCCESS:
      return { loading: false, subject: action.payload };
    case DETAIL_SUBJECT_FAIL:
      return { loading: false, error: action.payload };
    case DETAIL_SUBJECT_RESET:
      return { subject: {} };
    default:
      return state;
  }
};

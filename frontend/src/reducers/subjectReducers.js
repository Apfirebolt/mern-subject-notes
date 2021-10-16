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
  ADD_TOPIC_REQUEST,
  ADD_TOPIC_SUCCESS,
  ADD_TOPIC_FAIL,
  ADD_TOPIC_RESET,
  DELETE_TOPIC_REQUEST,
  DELETE_TOPIC_SUCCESS,
  DELETE_TOPIC_FAIL,
  DELETE_TOPIC_RESET,
  UPDATE_TOPIC_REQUEST,
  UPDATE_TOPIC_SUCCESS,
  UPDATE_TOPIC_FAIL,
  UPDATE_TOPIC_RESET,
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAIL,
  ADD_NOTE_RESET,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_RESET,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_RESET,
  UPDATE_NOTE_FAIL,
  GET_TOPIC_REQUEST,
  GET_TOPIC_FAIL,
  GET_TOPIC_SUCCESS,
  GET_TOPIC_RESET
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

// Reducers for topics
export const getTopicReducer = (state = { topic: {} }, action) => {
  switch (action.type) {
    case GET_TOPIC_REQUEST:
      return { loading: true };
    case GET_TOPIC_SUCCESS:
      return { loading: false, topic: action.payload };
    case GET_TOPIC_FAIL:
      return { loading: false, error: action.payload };
    case GET_TOPIC_RESET:
      return { topic: {} };
    default:
      return state;
  }
};

export const addTopicReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TOPIC_REQUEST:
      return { loading: true };
    case ADD_TOPIC_SUCCESS:
      return { loading: false, success: true };
    case ADD_TOPIC_FAIL:
      return { loading: false, error: action.payload };
    case ADD_TOPIC_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteTopicReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TOPIC_REQUEST:
      return { loading: true };
    case DELETE_TOPIC_SUCCESS:
      return { loading: false, success: true };
    case DELETE_TOPIC_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_TOPIC_RESET:
      return {};
    default:
      return state;
  }
};

export const updateTopicReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TOPIC_REQUEST:
      return { loading: true };
    case UPDATE_TOPIC_SUCCESS:
      return { loading: false, topic: action.payload, success: true };
    case UPDATE_TOPIC_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_TOPIC_RESET:
      return {};
    default:
      return state;
  }
};

// Reducers for Notes
export const addNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTE_REQUEST:
      return { loading: true };
    case ADD_NOTE_SUCCESS:
      return { loading: false, success: true };
    case ADD_NOTE_FAIL:
      return { loading: false, error: action.payload };
    case ADD_NOTE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NOTE_REQUEST:
      return { loading: true };
    case DELETE_NOTE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_NOTE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_NOTE_RESET:
      return {};
    default:
      return state;
  }
};

export const updateNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_NOTE_REQUEST:
      return { loading: true };
    case UPDATE_NOTE_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_NOTE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_NOTE_RESET:
      return {};
    default:
      return state;
  }
};



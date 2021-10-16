import axiosInstance from "../plugins/interceptor";
import {
  ADD_SUBJECT_REQUEST,
  ADD_SUBJECT_SUCCESS,
  ADD_SUBJECT_FAIL,
  LIST_SUBJECT_REQUEST,
  LIST_SUBJECT_SUCCESS,
  LIST_SUBJECT_FAIL,
  DELETE_SUBJECT_REQUEST,
  DELETE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_FAIL,
  DETAIL_SUBJECT_REQUEST,
  DETAIL_SUBJECT_SUCCESS,
  DETAIL_SUBJECT_FAIL,
  UPDATE_SUBJECT_REQUEST,
  UPDATE_SUBJECT_SUCCESS,
  UPDATE_SUBJECT_FAIL,
  ADD_TOPIC_REQUEST,
  ADD_TOPIC_SUCCESS,
  ADD_TOPIC_FAIL,
  UPDATE_TOPIC_REQUEST,
  UPDATE_TOPIC_SUCCESS,
  UPDATE_TOPIC_FAIL,
  DELETE_TOPIC_REQUEST,
  DELETE_TOPIC_SUCCESS,
  DELETE_TOPIC_FAIL,
  ADD_NOTE_REQUEST,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAIL,
  UPDATE_NOTE_REQUEST,
  UPDATE_NOTE_SUCCESS,
  UPDATE_NOTE_FAIL,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL
} from "../constants/subjectConstants";

import { logout } from "./authActions";

export const addSubjectAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_SUBJECT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosInstance.post(`/api/subjects`, payload, config);

    dispatch({
      type: ADD_SUBJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ADD_SUBJECT_FAIL,
      payload: message,
    });
  }
};

export const listSubjectsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_SUBJECT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axiosInstance.get("/api/subjects", config);

    dispatch({
      type: LIST_SUBJECT_SUCCESS,
      payload: data.results,
    });
  } catch (error) {
    dispatch({
      type: LIST_SUBJECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSubjectsAction =
  (subjectId) => async (dispatch, getState) => {
    try {
      dispatch({ type: DELETE_SUBJECT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosInstance.delete(
        `/api/subjects/${subjectId}`,
        config
      );

      dispatch({
        type: DELETE_SUBJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_SUBJECT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const detailSubjectAction = (subjectId) => async (dispatch, getState) => {
    try {
      dispatch({ type: DETAIL_SUBJECT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosInstance.get(
        `/api/subjects/${subjectId}`,
        config
      );

      dispatch({
        type: DETAIL_SUBJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_SUBJECT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const updateSubjectAction = (payload) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_SUBJECT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axiosInstance.put(
        `/api/subjects/${payload.id}`,
        { name: payload.name },
        config
      );

      dispatch({
        type: UPDATE_SUBJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SUBJECT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // Actions for topics begin
  export const addTopicAction = (payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_TOPIC_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axiosInstance.post(`/api/subjects/${payload.id}/topics`, 
      { 
        topicName: payload.topicName, 
        topicDescription: payload.topicDescription 
      }, config);
  
      dispatch({
        type: ADD_TOPIC_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ADD_TOPIC_FAIL,
        payload: message,
      });
    }
  };

  export const updateTopicAction = (payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_TOPIC_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axiosInstance.put(`/api/subjects/${payload.subjectId}/topics/${payload.topicId}`, 
      { 
        topicName: payload.topicName, 
        topicDescription: payload.topicDescription 
      }, config);
  
      dispatch({
        type: UPDATE_TOPIC_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: UPDATE_TOPIC_FAIL,
        payload: message,
      });
    }
  };

  export const deleteTopicAction = (payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_TOPIC_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axiosInstance.delete(`/api/subjects/${payload.subjectId}/topics/${payload.topicId}`, config);
  
      dispatch({
        type: DELETE_TOPIC_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: DELETE_TOPIC_FAIL,
        payload: message,
      });
    }
  };

  // Actions for notes
  export const addNoteAction = (payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_NOTE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axiosInstance.post(`/api/subjects/${payload.subjectId}/topics/${payload.topicId}`, 
      { 
        heading: payload.heading, 
        content: payload.content 
      }, config);
  
      dispatch({
        type: ADD_NOTE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ADD_NOTE_FAIL,
        payload: message,
      });
    }
  };

  export const updateNoteAction = (payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_NOTE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axiosInstance.put(`/api/subjects/${payload.subjectId}/topics/${payload.topicId}/notes/${payload.noteId}`, 
      { 
        heading: payload.heading, 
        content: payload.content 
      }, config);
  
      dispatch({
        type: UPDATE_NOTE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: UPDATE_NOTE_FAIL,
        payload: message,
      });
    }
  };

  export const deleteNoteAction = (payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_NOTE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axiosInstance.delete(`/api/subjects/${payload.subjectId}/topics/${payload.topicId}/notes/${payload.noteId}`, config);
  
      dispatch({
        type: DELETE_NOTE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: DELETE_NOTE_FAIL,
        payload: message,
      });
    }
  };
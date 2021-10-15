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
  UPDATE_SUBJECT_RESET,
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

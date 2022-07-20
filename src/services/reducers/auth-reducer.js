import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,

} from "../actions/auth-actions.js";

const initialState = {
  isAuth: false,
  user: null,
  isRequest: false,
  requestFailed: false,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        isAuth: false,
        user: null,
        isRequest: true,
        requestFailed: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        user: payload,
        isRequest: false,
        requestFailed: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        isAuth: false,
        user: null,
        isRequest: false,
        requestFailed: true,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        isAuth: false,
        user: null,
        isRequest: true,
        requestFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        user: payload,
        isRequest: false,
        requestFailed: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isAuth: false,
        user: null,
        isRequest: false,
        requestFailed: true,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        isRequest: true,
      }
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        user: payload,
        isRequest: false
      }
    }

    case GET_USER_FAILED: {
      return {
        ...state,
        isAuth: false,
        user: null,
        isRequest: false
      }
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
        isRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...initialState,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        isRequest: false,
        requestFailed: true,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        isRequest: true,
        requestFailed: false,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        isAuth: true,
        user: payload,
        isRequest: false,
        requestFailed: false,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        isRequest: false,
        requestFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

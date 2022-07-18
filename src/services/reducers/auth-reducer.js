import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  // SEND_LOGOUT_REQUEST,
  // LOGOUT_SUCCESSED,
  // LOGOUT_FAILED,
  // CHECK_TOKEN_REQUEST,
  // CHECK_TOKEN_SUCCESSED,
  // CHECK_TOKEN_UNSUCCESSED,
  // CHECK_TOKEN_FAILED,
  // SEND_UPDATE_REQUEST,
  // UPDATE_SUCCESSED,
  // UPDATE_FAILED,
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
    // case SEND_LOGOUT_REQUEST: {
    //   return {
    //     ...state,
    //     sendRequest: true,
    //   };
    // }
    // case LOGOUT_SUCCESSED: {
    //   return {
    //     ...initialState,
    //   };
    // }
    // case LOGOUT_FAILED: {
    //   return {
    //     ...state,
    //     sendRequest: false,
    //     requestFailed: true,
    //   };
    // }
    // case CHECK_TOKEN_REQUEST: {
    //   return {
    //     ...state,
    //     sendRequest: true,
    //     requestFailed: false,
    //   };
    // }
    // case CHECK_TOKEN_SUCCESSED: {
    //   return {
    //     isAuthChecked: true,
    //     data: payload,
    //     sendRequest: false,
    //     requestFailed: false,
    //   };
    // }
    // case CHECK_TOKEN_UNSUCCESSED: {
    //   return {
    //     isAuthChecked: true,
    //     data: null,
    //     sendRequest: false,
    //     requestFailed: false,
    //   };
    // }
    // case CHECK_TOKEN_FAILED: {
    //   return {
    //     isAuthChecked: true,
    //     data: null,
    //     sendRequest: false,
    //     requestFailed: true,
    //   };
    // }
    // case SEND_UPDATE_REQUEST: {
    //   return {
    //     ...state,
    //     sendRequest: true,
    //     requestFailed: false,
    //   };
    // }
    // case UPDATE_SUCCESSED: {
    //   return {
    //     isAuthChecked: true,
    //     data: payload,
    //     sendRequest: false,
    //     requestFailed: false,
    //   };
    // }
    // case UPDATE_FAILED: {
    //   return {
    //     ...state,
    //     sendRequest: false,
    //     requestFailed: true,
    //   };
    // }
    default: {
      return state;
    }
  }
};

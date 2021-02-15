import localStore from "@utils/localStore";
import { UserActionTypes } from "./types";
// Import Action Names
import { LOGIN, LOGIN_GOOGLE, LOGOUT } from "./types";

const initialState = {
  isAuthenticated: false,
  loginType: "",
  email: "",
  username: "",
  token: "",
};

// Actions

export const login = (value: boolean) => {
  return {
    type: LOGIN,
    payload: value,
  };
};

export const loginWithGoogle = (data: any) => {
  console.log("LOGIN GOOGLE", data);
  localStore.set("token", data.credential?.idToken);
  return {
    type: LOGIN_GOOGLE,
    payload: {
      email: data.user.email,
      username: data.user.displayName,
      token: data.credentail?.idToken,
      loginType: "google",
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: false,
  };
};

// Reducer
const userSlice = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }
    case LOGIN_GOOGLE: {
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload.email,
        username: action.payload.username,
        token: action.payload.token,
        loginType: action.payload.loginType,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userSlice;

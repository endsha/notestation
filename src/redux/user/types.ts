export const LOGIN = "LOGIN";
export const LOGIN_GOOGLE = "LOGIN_GOOGLE";
export const LOGOUT = "LOGOUT";

// Action Payload Types

interface LoginPayload {
  email: String;
  username: String;
  token: String;
  loginType: String;
}

// Action Types

interface LoginAction {
  type: typeof LOGIN;
  payload: boolean;
}

interface LoginGoogleAction {
  type: typeof LOGIN_GOOGLE;
  payload: LoginPayload;
}

interface LogoutAction {
  type: typeof LOGOUT;
  payload: boolean;
}

export type UserActionTypes = LoginAction | LogoutAction | LoginGoogleAction;

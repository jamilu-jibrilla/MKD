import React, { useReducer } from "react";
import { useLocation } from "react-router";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("role", action.payload.role)
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  let location = useLocation()
  const [state, dispatch] = useReducer(reducer, initialState);
  React.useEffect(() => {
    //TODO
    let sdk = new MkdSDK();
    const role = localStorage.getItem("role");
    let res = sdk.check(role)
    res.then((res)=> {
      // tokenExpireError(dispatch, res.message)
    })
  }, [location]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

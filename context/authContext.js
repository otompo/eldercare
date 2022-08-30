import { useReducer, createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
// initial state
const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  userInfor: null,
};

// create context
export const AuthContext = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// context provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  // config axios
  const token = state && state.user && state.user.token ? state.user.token : "";
  //   configure axios
  // console.log("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

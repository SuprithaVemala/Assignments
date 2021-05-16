import React from "react";
import { useReducer } from "react";
import reducer from "./reducer";
import {books,users} from "./globalStore"
const UserContext = React.createContext<any>({});

interface Props{
    children?:any
}
const ContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, {}, () => {
    return {
      books:books,
      users:users,
      activeUser:null
    };
  });
  return (
      <UserContext.Provider value={{state,dispatch}}>
          {props.children}
      </UserContext.Provider>
  )
};

export {ContextProvider,UserContext}
import React, { useReducer } from "react"
import $userReducer from "./user.reducer"
import LoginContext from "./user.context"

const UserState = (props) => {
  const initialstate = {
    login: false
  }

  const [state, dispatch] = useReducer($userReducer, initialstate)

  const getLogin = (value) => {
    dispatch(
      {
        type: 'LOGIN',
        payload: value ?? state.login
      }
    )
  }

  return (
    <LoginContext.Provider value={{
      login: state.login,
      getLogin
    }}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default UserState
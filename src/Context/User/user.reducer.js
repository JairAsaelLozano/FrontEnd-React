const $userReducer =(state, action) => {
  const {payload, type} = action
  switch(type){
    case 'LOGIN':
      return {
        ...state,
        login: payload
      }
    default:
      return state
  } 
}

export default $userReducer
import React, { useContext } from 'react'
import {logoutHandler} from './utils/user/user';
import { StoreContext } from './utils/Store';

const home = () => {
  const { state, dispatch } = useContext(StoreContext);
  console.log(state)
  return (
    <div>
      <h1>Welcome to Inshorts Clone App </h1>

      <button  onClick={(e) => logoutHandler(dispatch)}> Log Out</button>
    </div>
  )
}

export default home
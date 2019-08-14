import React, {useContext} from "react";
import BlogContext from "../../context/Context";
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {state} = useContext(BlogContext);
    const { loggedIn } = state;

    return (
        <Route {...rest} render={props => (
          loggedIn ? (<Component {...props} />) : (
            <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }} />
          )
        )} />
      )
    }
    
export default ProtectedRoute;
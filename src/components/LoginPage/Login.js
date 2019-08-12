import React, {useState, useContext} from 'react';
import {auth} from "../../firebase/index.js";
import "../../index.css";

import BlogContext from "../../context/Context";

const Login = () => {
    const [userInfo, setUser] = useState({user:"", pass:""});
    const {dispatch} = useContext(BlogContext);

    const login = () => {
        auth.signInWithEmailAndPassword(userInfo.user,userInfo.pass).then(user => {
            dispatch({type:"LOGGED_STATUS", payload:true});
            alert("Succesfully logged in!");
            setUser({user:"", pass:""});
        }).catch((error) => {
            console.log(error);
            alert("Could not log in!");
            setUser({user:"",pass:""});
        });
    }

    const onUserChange = (event) => {
        setUser({...userInfo, user:event.target.value});
    }

    const onPassChange = (event) => {
        setUser({...userInfo, pass:event.target.value})
    }
    return(
        <div>
            <div style={{height:"80px"}}></div>
            <div className="loginContainer">
                <h1>Login</h1>
                <form>
                    <input onChange={onUserChange} value={userInfo.user} type="text" placeholder="Input username..."></input>
                    <input onChange={onPassChange} value={userInfo.pass} type="password" placeholder="Input password"></input>
                </form>
                <button onClick={() => auth.signOut()}>Log-in with Google</button>
                <button onClick={login}>Login</button>              
            </div>
        </div>
    )
}

export default Login;
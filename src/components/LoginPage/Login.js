import React, {useState, useContext} from 'react';
import {auth, provider} from "../../firebase/index.js";
import "../../index.css";
import {withRouter} from 'react-router-dom';

import BlogContext from "../../context/Context";

const Login = (props) => {
    const [userInfo, setUser] = useState({user:"", pass:""});
    const {dispatch} = useContext(BlogContext);

    const login = () => {
        auth.signInWithEmailAndPassword(userInfo.user,userInfo.pass).then(user => {
            dispatch({type:"LOGIN", payload:userInfo.user});
            alert("Succesfully logged in!");
            setUser({user:"", pass:""});
            props.history.push(`/`);
        }).catch((error) => {
            console.log(error);
            alert("Could not log in!");
            setUser({user:"",pass:""});
        });
    }

    const googleLogin = () => {
        auth.signInWithPopup(provider).then(user => {
            dispatch({type:"LOGIN", payload:user.displayName});
            alert("Succesfully logged in!");
            setUser({user: "", pass:""});
            props.history.push(`/`);
        }).catch((error) => {
            console.log(error);
            alert("Could not log in!");
            setUser({user:"", pass:""});
        })
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
                <form style={{display:"inline"}}>
                    <input onChange={onUserChange} value={userInfo.user} type="text" placeholder="Input username..."></input>
                    <input onChange={onPassChange} value={userInfo.pass} type="password" placeholder="Input password"></input>
                </form>
                <button onClick={login}>Login</button>    
                <button style={{background:"#de6464"}} onClick={googleLogin}>Log-in with Google</button>          
            </div>
        </div>
    )
}

export default withRouter(Login);
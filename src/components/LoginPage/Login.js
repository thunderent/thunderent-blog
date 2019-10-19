import React, {useState, useContext} from 'react';
import {auth, provider, functions} from "../../firebase/index.js";
import "../../index.css";
import {withRouter} from 'react-router-dom';

import BlogContext from "../../context/Context";

const Login = (props) => {
    const [userInfo, setUser] = useState({user:"", pass:""});
    const {dispatch} = useContext(BlogContext);

    /* Delete this afterwards */
    const [tempValue,setTempValue] = useState("");

    const onChangeTemp = (e) => {
        setTempValue(e.target.value);

    }
    const makeAdmin = () => {
        console.log(tempValue);
        const addAdminRole = functions.httpsCallable('addAdminRole');

        addAdminRole({email:tempValue}).then(result => console.log(result));
    }

    const login = () => {
        auth.signInWithEmailAndPassword(userInfo.user,userInfo.pass).then(user => {
            user.getIdTokenResult().then(idTokenResult => {
                dispatch(
                    {
                    type:"LOGIN", 
                    payload:{
                        userName: user.displayName,
                        isAdmin:idTokenResult.claims.admin || false
                    }
                });
                alert("Succesfully logged in!");
                setUser({user:"", pass:""});
                props.history.push(`/`);
              })
        }).catch((error) => {
            console.log(error);
            alert("Could not log in!");
            setUser({user:"",pass:""});
        });
    }

    const googleLogin = () => {
        auth.signInWithPopup(provider).then(user => {
            dispatch( {
                type:"LOGIN", 
                payload:{
                    userName: user.displayName,
                    isAdmin:false
                }});
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
         
                <form>
                    <input type="email"value={tempValue} onChange={onChangeTemp}></input>
                </form>
                <button onClick={makeAdmin}>Make Admin!</button>
            </div>
        </div>
    )
}

export default withRouter(Login);
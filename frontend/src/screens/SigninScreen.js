import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props){

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const redirect=props.location.search ? props.location.search.split('=')[1]:'/';

    const userSignin=useSelector(state=>state.userSigninRed);
    const {userInfo,loading,error}=userSignin;

    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        dispatch(signin(email,password))
    }

    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect);
        }
    },[userInfo])
    return(
        <div className="login-page">
        <form className="form" onSubmit={submitHandler}>
            <div>
                <h1>Please authenticate your account</h1>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <div className="avatar-div">
                <img className="avatar-img" src="./images/avatar.png" alt=""/>
            </div>
            <div className="input-type-div">
                <label htmlFor="email">Email-address</label>
                <input 
                    className="input-type" 
                    type="email" id="email" 
                    placeholder="Please Enter your Email-address here" 
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    />
            </div>
            <div className="input-type-div">
                <label htmlFor="password">Password</label>
                <input 
                    className="input-type" 
                    type="password" id="password" 
                    placeholder="Enter your password here"
                    required
                    onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div>
                <button className="signin-btn" type="submit">Click to Login</button>
            </div>
            <div className="signin-reg"><p>Not Registered ? <span><Link to={`/register?redirect=${redirect}`}>Sign-Up here</Link></span></p></div>
        </form>
    </div>
    )
}
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Login1() {
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let navigate=useNavigate()
    let dispatch=useDispatch();
    axios.defaults.baseURL='http://localhost:5697';
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");

    useEffect(()=>{
      //if(localStorage.getItem("email")&&localStorage.getItem("password")){
      //emailInputRef.current.value=localStorage.getItem("email");
      //passwordInputRef.current.value=localStorage.getItem("password");
      //validateLogin();
      //validateToken();
    },[])

    let validateToken=async()=>{
      if(localStorage.getItem("token")){

      
        let dataToSend=new FormData()
        dataToSend.append("token",localStorage.getItem("token"));

        let reqOptions={
          method:"POST",
          body:dataToSend
        }
        let JSONData=await fetch("/Login1WithToken",reqOptions)
        let JSOData=await JSONData.json();
        
        if(JSOData.status=="Success"){
          //localStorage.setItem("token",JSOData.data.token);
          //localStorage.setItem("password",passwordInputRef.current.value);
          dispatch({type:"Login1",data:JSOData.data})       
          navigate("/Home");
        }else{
            alert(JSOData.msg)
        }
        console.log(JSOData);
      }
    }

    let validateLogin2=()=>{
      return async()=>{
        let dataToSend=new FormData()
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value)
        
        let reqOptions={
            method:"POST",
            body:dataToSend
        }
        let JSONData=await fetch("/Login1",reqOptions);
        let JSOData=await JSONData.json()
        if(JSOData.status=="Success"){
          localStorage.setItem("token",JSOData.data.token);
          //localStorage.setItem("password",passwordInputRef.current.value);
          dispatch({type:"Login1",data:JSOData.data})       
          navigate("/Home");
        }else{
            alert(JSOData.msg)
        }
        console.log(JSOData)
      }
    }

    let validateLogin=async()=>{
        let dataToSend=new FormData()
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);

        let response=await axios.post("Login1",dataToSend);
        console.log(response);
        //let reqOptions={
            //method:"POST",
            //body:dataToSend
        //}
        //let JSONData=await fetch("http://localhost:5697/Login1",reqOptions);
        //let JSOData=await JSONData.json()
        if(response.data.status=="Success"){
          localStorage.setItem("token",response.data.data.token);
          //localStorage.setItem("password",passwordInputRef.current.value);
          dispatch({type:"Login1",data:response.data.data})       
          navigate("/Home");
        }else{
            alert(response.data.data.msg)
        }
        console.log(response.data.data)
    }

  return (
 
    
    <div className="App">
       <form>
       <h1>LOGIN</h1>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <button type="button" onClick={()=>{
            validateLogin();
            //dispatch(validateLogin2());
          }}>Login</button>
        </div>
      </form> 
      <br></br>
      <Link to="/Signup">Signup</Link>
    </div>

  )
}

export default Login1
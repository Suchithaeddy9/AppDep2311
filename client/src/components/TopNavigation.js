import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

function TopNavigation() {
  let navigate=useNavigate();
  let storeObj=useSelector((store)=>{
    return store
  })
  useEffect(()=>{
    if(storeObj.loginReducer.userDetails.email){

    }else{
      navigate("/");
    }
  },[])
  return (
    <nav>
        <NavLink to="/Home">Home</NavLink>
        <NavLink to="/Tasks">Tasks</NavLink>
        <NavLink to="/Leaves">Leaves</NavLink>
        <NavLink to="/EditProfile">Edit Profile</NavLink>
        <NavLink to="/" 
          onClick={()=>{
          localStorage.clear()
        }}>Logout</NavLink>
    </nav>
  )
}

export default TopNavigation
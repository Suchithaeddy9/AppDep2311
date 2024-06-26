import React, {useEffect, useRef, useState } from 'react'
//import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux';

function EditProfile() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic, setProfilePic] = useState("./images/pht.jpeg")

  let storeObj=useSelector((store)=>{return store})
  useEffect(()=>{
    firstNameInputRef.current.value=storeObj.userDetails.firstName;
    lastNameInputRef.current.value=storeObj.userDetails.lastName;
    ageInputRef.current.value=storeObj.userDetails.age;
    emailInputRef.current.value=storeObj.userDetails.email;
    passwordInputRef.current.value=storeObj.userDetails.password;
    mobileNoInputRef.current.value=storeObj.userDetails.mobileNo;
    //profilePicInputRef.current.value=storeObj.userDetails.profilePic;
    setProfilePic(`/${storeObj.userDetails.profilePic}`);
  },[])

  //let onSignupUsingFD = async () => {
      //let dataToSend = new FormData();
      //dataToSend.append("firstName", firstNameInputRef.current.value);
      //dataToSend.append("lastName", lastNameInputRef.current.value);
      //dataToSend.append("age", ageInputRef.current.value);
      //dataToSend.append("email", emailInputRef.current.value);
      //dataToSend.append("password", passwordInputRef.current.value);
      //dataToSend.append("mobileNo", mobileNoInputRef.current.value);
      //dataToSend.append("profilePic", profilePicInputRef.current.files[0]);

      //for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
          //.append("profilePic", profilePicInputRef.current.files[i]);
       //}
      //let myHeader=new Headers();
      //myHeader.append("content-type","application/x-www-form-urlencoded");

      //let reqOptions = {
          //method: "POST",
          //body: dataToSend
      //}
      //let JSONData = await fetch("http://localhost:5697/Signup", reqOptions);
      //let JSOData = await JSONData.json();
      //alert(JSOData.msg);
      //console.log(JSOData);
  //}

  let sendUpdatedProfileData=async ()=>{
    let dataToSend=new FormData();
      dataToSend.append("firstName", firstNameInputRef.current.value);
      dataToSend.append("lastName", lastNameInputRef.current.value);
      dataToSend.append("age", ageInputRef.current.value);
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);
      dataToSend.append("mobileNo", mobileNoInputRef.current.value);
      dataToSend.append("profilePic", profilePicInputRef.current.files[0]);
    let reqOptions={
      method:"PATCH",
      body:dataToSend
    }
    let JSONData =await fetch("/updateProfile",reqOptions)
    let JSOData=await JSONData.json();
    console.log(JSOData)
  }

  return (
      <div className="App">
        <TopNavigation></TopNavigation>
          <form>
              <h1>Edit Profile</h1>
              <div>
                  <label>First Name</label>
                  <input ref={firstNameInputRef}></input>
              </div>
              <div>
                  <label>Last Name</label>
                  <input ref={lastNameInputRef}></input>
              </div>
              <div>
                  <label>Age</label>
                  <input ref={ageInputRef}></input>
              </div>
              <div>
                  <label>Email</label>
                  <input ref={emailInputRef} readOnly></input>
              </div>
              <div>
                  <label>Password</label>
                  <input ref={passwordInputRef}></input>
              </div>
              <div>
                  <label>Mobile No.</label>
                  <input ref={mobileNoInputRef}></input>
              </div>
              <div>
                  <label>Profile Pic</label>
                  <input ref={profilePicInputRef} type="file"
                      //multiple 
                      onChange={(eventObj) => {
                          let selectedFileURL = URL.createObjectURL(
                              eventObj.target.files[0]);
                          setProfilePic(selectedFileURL);
                      }}></input>
              </div>
              <div>
                  <img className="profilePicPreview" src={profilePic}></img>
              </div>
              <div>
                  
                  <button type="button" onClick={() => {
                      sendUpdatedProfileData();
                  }}>Update Profile</button>
              </div>
          </form>
      </div>
  )
}

export default EditProfile
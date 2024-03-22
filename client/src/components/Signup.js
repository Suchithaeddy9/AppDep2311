import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';


function Signup() {

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();

    let [profilePic, setProfilePic] = useState("./images/pht.jpeg")

    let onSignup = async () => {

        let dataToSend = {
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
            age: ageInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            mobileNo: mobileNoInputRef.current.value,
            profilePic: profilePicInputRef.current.value
        };
        console.log(dataToSend);

        let myHeader = new Headers();
        myHeader.append("content-type", "application/json")

        let reqOptions = {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: myHeader,
        }
        let JSONData = await fetch("/Signup", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        //console.log("Some Dummy Response.");
    }

    let onSignupUsingURLE = async () => {
        let dataToSend = new URLSearchParams();
        dataToSend.append("firstName", firstNameInputRef.current.value);
        dataToSend.append("lastName", lastNameInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        dataToSend.append("mobileNo", mobileNoInputRef.current.value);
        dataToSend.append("profilePic", profilePicInputRef.current.value);

        let myHeader = new Headers();
        myHeader.append("content-type", "application/x-www-form-urlencoded");

        let reqOptions = {
            method: "POST",
            body: dataToSend,
            headers: myHeader,
        }
        let JSONData = await fetch("/Signup", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
    }

    let onSignupUsingFD = async () => {
        let dataToSend = new FormData();
        dataToSend.append("firstName", firstNameInputRef.current.value);
        dataToSend.append("lastName", lastNameInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", emailInputRef.current.value);
        dataToSend.append("password", passwordInputRef.current.value);
        dataToSend.append("mobileNo", mobileNoInputRef.current.value);
        dataToSend.append("profilePic", profilePicInputRef.current.files[0]);

        //for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
            //.append("profilePic", profilePicInputRef.current.files[i]);
         //}
        let myHeader=new Headers();
        myHeader.append("content-type","application/x-www-form-urlencoded");

        let reqOptions = {
            method: "POST",
            body: dataToSend
        }
        let JSONData = await fetch("/Signup", reqOptions);
        let JSOData = await JSONData.json();
        alert(JSOData.msg);
        console.log(JSOData);
    }


    return (
        <div className="App">
            <form>
                <h1>SIGNUP</h1>
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
                    <input ref={emailInputRef}></input>
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
                        onSignup()
                    }}>SIGNUP(JSON)</button>
                    <button type="button" onClick={() => {
                        onSignupUsingURLE()
                    }}>SIGNUP(URLEncoded)</button>
                    <button type="button" onClick={() => {
                        onSignupUsingFD()
                    }}>SIGNUP(FD)</button>
                </div>
            </form>
            <br></br>
            <Link to="/">Login</Link>
        </div>
    )
}

export default Signup;
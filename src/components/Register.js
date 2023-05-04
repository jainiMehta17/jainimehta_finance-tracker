import React, { useEffect, useState,useRef, Component } from 'react';
import {Link, useNavigate} from "react-router-dom"
const Register = () =>{
    const navigate = useNavigate()
    const dataFromLocalStorage = localStorage.getItem("Users")!==null?JSON.parse(localStorage.getItem("Users")):null
    const initialUserData = {username:"", email:"",password:"", confirmPassword:"" } 
    const initialValidationErrors = {username:"", email:"",password:"", confirmPassword:"" } 
    const [userInfo, setUserInfo] = useState(initialUserData)
    const [submitClicked, setSubmitClicked] = useState(false)
    const [validationErrors, setValidationErrors] = useState(initialValidationErrors)
    const [allFieldsVerified, setAllFieldsVerified] = useState(false)
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setUserInfo({...userInfo, [name]:value})
        validate(name, {...userInfo, [name]:value})
    }
    const updateNullError = (element)=>{
        setValidationErrors(prevState=>({...prevState, [element]:`${element} is required`}))
    }
    const updateErrors =(name, err)=>{
        setValidationErrors(prevState=>({...prevState, [name]:err}))

    }
    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(firstUpdate.current){
            firstUpdate.current = false;
            return;
        }
        Object.keys(validationErrors).forEach(element=>{
            if(validationErrors[element]===""){
                setAllFieldsVerified(true)
            }else{
                setAllFieldsVerified(false)
            }
        })
    }, [validationErrors])
    const handleSubmit=(e)=>{
        e.preventDefault();
        setSubmitClicked(true)
        console.log("thisssssss", {allFieldsVerified});
        const userDetails = [userInfo]
        console.log("userDetailos ", userDetails);
        if(allFieldsVerified){
            if(localStorage.getItem("Users")!==null){
                const receivedData = JSON.parse(localStorage.getItem("Users")   )
                console.log({receivedData});
                receivedData.push(userInfo);
                localStorage.setItem("Users", JSON.stringify(receivedData))
                navigate("/login")

            }else{
                localStorage.setItem("Users", JSON.stringify(userDetails))
                navigate("/login")

            }
           
        }
    }
    useEffect(()=>{
        if(submitClicked)
        Object.keys(userInfo).forEach((key)=>{
            validate(key, userInfo)
        })
    }, [submitClicked])

    const validateAll = (name, updatedValues)=>{
        switch (name) {
            case "username":
                if(updatedValues[name].length>12){
                updateErrors(name, "Minimum length allowed is 12")
               }else{
                updateErrors(name, "")
               }
                break;

            case "email":
                const emailRegEx = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
                var email = updatedValues[name]
                if(!emailRegEx.test(email)){
                    updateErrors(name, "Enter a valid email")
                }else if(dataFromLocalStorage!==null){
                    dataFromLocalStorage.filter((item)=>{
                        if(item[name]===email){
                    updateErrors(name, "Email already registered!")
                        }else{
                            updateErrors(name, "")
                        }
                    })                 
                }else {
                    updateErrors(name, "")
                }
                break;

            case "password":
                var passwordRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                const password = updatedValues[name]
                if(!passwordRegx.test(password)){
                    updateErrors(name, "Password must contain atleast one special character and an least on integer")
                } else{
                    updateErrors(name, "")

                }
                break;
                
            case "confirmPassword":
                const confirmPassword = updatedValues[name];
                if(updatedValues["password"]!==confirmPassword){
                    updateErrors(name, "Confirm Password didn't match password")
                }else{
                    updateErrors(name, "")
                }
            break;
            default:
                break;
        }
    }
    const validate=(name, updatedValues)=>{
        console.log({updatedValues});
        console.log({submitClicked});
        if(submitClicked){
            Object.keys(updatedValues).map((element)=>{
                if(updatedValues[element]===""){    
                    updateNullError(element)
                }else{
                    validateAll(name, updatedValues)
                }
            })
        }else{
            validateAll(name, updatedValues)
        }
    }
    // console.log({validationErrors});
    // console.log({allFieldsVerified});
return(
    <div>
    <h1>Register Here</h1>
    <form onSubmit={(event)=>{handleSubmit(event)}}>
        <label>Username</label>
        <input type='text' onChange={handleChange} name='username'/>
        <p>{validationErrors.username}</p><br/>
        <label>Email ID</label>
        <input type='text' onChange={handleChange} name='email'/>
        <p>{validationErrors.email}</p><br/>
        <label>Password</label>
        <input type='text' onChange={handleChange} name='password'/>
        <p>{validationErrors.password}</p><br/>
        <label>Confirm Password</label>
        <input type='text' onChange={handleChange} name='confirmPassword'/>
        <p>{validationErrors.confirmPassword}</p><br/>
        <button type='submit'>Register</button>

    </form><br/>
    <span>Already Registered?</span> <Link to="/login">Sign In</Link>
    </div>
)
}
export default Register;
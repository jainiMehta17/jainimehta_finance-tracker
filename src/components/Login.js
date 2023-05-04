import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
const Login = () =>{
    let firstTimeSubmit = false;
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const navigate = useNavigate()
    const localStorageData = localStorage.getItem("Users")!==null?JSON.parse(localStorage.getItem("Users")):null;
    const initialValues = {email:"", password:""}
    const [userData , setUserData] = useState(initialValues)
    const [validationError, setValidationError] = useState({err:""})
    const [currentUser, setCurrentUser] = useState()
    const [userToken, setUserToken] = useState()
    const [userLocalStorageIndex, setUserLocalStorageIndex] = useState()
    const handleSubmit = (e)=>{
        e.preventDefault();
        const searchIndex = localStorageData.findIndex((user)=>user["email"]===userData["email"]);
        setUserLocalStorageIndex(searchIndex)
        if(userData["email"]==="" && userData["password"]===""){
            setValidationError(prevState=>({...prevState, err:"Please enter your login credentials"}))
        }else if(userData["email"]==="" ){
            setValidationError(prevState=>({...prevState, err:"Please enter your email"}))
        }
        else if(userData["password"]===""){
            setValidationError(prevState=>({...prevState, err:"Please enter your passsword"}))
        }else{

            if(searchIndex===-1){
                setValidationError(prevState=>({...prevState, err:"Sorry, we could not find your account"}))
            }else{
                const currentUserData = localStorageData[searchIndex]
                if(currentUserData["password"]===userData["password"]){
                    setCurrentUser(currentUserData)
                    setValidationError(prevState=>({...prevState, err:""}))
    
                }else{
                setValidationError(prevState=>({...prevState, err:"Invalid login credentials"}))
                }
    
            }
        }
    
        console.log("firstTimeSubmit", firstTimeSubmit);
        console.log({userData});
    }
    const firstUpdate = useRef(true);
    useEffect(()=>{
        if(firstUpdate.current){
            firstUpdate.current=false;
            return;
        }
        if(validationError["err"]===""){
            console.log("Successful");
            console.log({currentUser});
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            let updatedMonth;
            let updatedDay;
            let updatedHours;
            let updatedMinutes;
            let updatedSeconds;
            if(month<10){
                updatedMonth = "0"+month;
            }else{
                updatedMonth= month;
            }

            if(day<10){
                updatedDay= "0"+day;
            }else{
                updatedDay= day;
            }

            if(hours<10){
                updatedHours = "0"+hours;
            }else{
                updatedHours= hours;
            }

            if(minutes<10){
                updatedMinutes = "0"+minutes;
            }else{
                updatedMinutes= minutes;
            }
            
            if(seconds<10){
                updatedSeconds = "0"+seconds;
            }else{
                updatedSeconds= seconds;
            }

            const finalHours = Number(updatedHours)+1;
            const currentDateTime =year +":"+updatedMonth+":"+updatedDay+":"+finalHours+":"+updatedMinutes+":"+updatedSeconds;
            console.log(currentDateTime);
            let token = '';
            for ( let i = 0; i < 16; i++ ) {
                token += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            localStorageData[userLocalStorageIndex]["token"] =token;
            localStorageData[userLocalStorageIndex]["tokenExpirationTime"] = currentDateTime;
            console.log("thisssss",localStorageData);
            localStorage.setItem("Users", JSON.stringify(localStorageData))
            localStorage.setItem("Token", JSON.stringify(localStorageData[userLocalStorageIndex]["token"]))
            localStorage.setItem("TokenExpirationTime", JSON.stringify(localStorageData[userLocalStorageIndex]["tokenExpirationTime"]))
            navigate("/home", {state:{
                name:`${currentUser["username"]}`,
                email :`${currentUser["email"]}`
            }})
        }
    }, [validationError])
    const handleChange=(e)=>{
        const {name, value}  = e.target;
        setUserData(prevState=>({...prevState, [name]:value}))
    }
return(
    <div>
<h1>Login Here</h1>
<form onSubmit={handleSubmit}>
        <label>Email ID</label>
        <input type='text' value={userData.email} onChange={handleChange} name="email"/>
        <br/><br/>
        <label>Password</label>
        <input type='text' value={userData.password} onChange={handleChange} name="password"/>
        <br/>
        <p>{validationError.err}</p>
        <button type='submit'>Login</button>
    </form><br/> 
    <span>Not Registered yet?</span> <Link to="/register">Sign Up</Link>

    </div>
)
}
export default Login;
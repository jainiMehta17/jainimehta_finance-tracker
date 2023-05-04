import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const GetMail = ()=>{
    const navigate = useNavigate()
    const localStorageData = localStorage.getItem("Users")!==null?JSON.parse(localStorage.getItem("Users")):null;
    const localStorageExternalToken = localStorage.getItem("Token")!==null?JSON.parse(localStorage.getItem("Token")):null;
    const localStorageExternalTokenExpirationTime = localStorage.getItem("TokenExpirationTime")!==null?JSON.parse(localStorage.getItem("TokenExpirationTime")):null;
    const [userMail , setUserMail] = useState({email:""});
    const [validationError , setValidationError] = useState({err:""});
    console.log("localStorageExternalToken", localStorageExternalToken);
    console.log("localStorageExternalTokenExpirationTime", localStorageExternalTokenExpirationTime);
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(userMail["email"]===""){
            setValidationError(prevState=>({...prevState, err:"Please enter your mail"}))
        }else{
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

            const currentDateTime =year +":"+updatedMonth+":"+updatedDay+":"+updatedHours+":"+updatedMinutes+":"+updatedSeconds;
            console.log(currentDateTime);
            const [currentYear, currentMonth, currentDate, currentHours, currentMinutes, currentSeconds] = currentDateTime.split(":")
            
            let currentDateObj = new Date(currentYear, currentMonth, currentDate, currentHours, currentMinutes, currentSeconds);

          if(localStorageExternalToken!==null){
            const [externalTokenYear, externalTokenMonth, externalTokenDate, externalTokenHours, externalTokenMinutes, externalTokenSeconds] = localStorageExternalTokenExpirationTime.split(":")
            let externalTokenDateObj = new Date(externalTokenYear, externalTokenMonth, externalTokenDate, externalTokenHours, externalTokenMinutes, externalTokenSeconds);
            console.log("currentDateObj", currentDateObj);
            console.log("externalTokenDateObj", externalTokenDateObj);
            if(currentDateObj.getTime()> externalTokenDateObj.getTime()){
                localStorage.removeItem("Token")
                localStorage.removeItem("TokenExpirationTime")
            }else{

            }

          }


            if(localStorageData!==null){
            const searchIndex = localStorageData.findIndex((user)=>user["email"]===userMail["email"]);
            if(searchIndex===-1){
                console.log("Seems like new user logged in");
                // setValidationError(prevState=>({...prevState, err:"Sorry, we Could not find your account"}))
                navigate("/financeTrackerAllLinks", {
                    state:{
                        email:`${userMail["email"]}`
                    }
                })
            }else{
                const currentUserData = localStorageData[searchIndex];
                if(currentUserData["tokenExpirationTime"]){
                    console.log(currentUserData["tokenExpirationTime"]);

               
                const [tokenYear, tokenMonth, tokenDate, tokenHours, tokenMinutes, tokenSeconds] = currentUserData["tokenExpirationTime"].split(":")
                    let tokenDateObj = new Date(tokenYear, tokenMonth, tokenDate, tokenHours, tokenMinutes, tokenSeconds);
                    if(tokenDateObj.getTime()>=currentDateObj.getTime()){
                        console.log("valid, token not expired yet");
                        navigate("/financeTrackerAllLinks", {state:{
                            email:`${currentUserData["email"]}`,
                            name:`${currentUserData["username"]}`,
                            token:`${currentUserData["token"]}`,
                            tokenExpirationTime:`${currentUserData["tokenExpirationTime"]}`
                        }})
                       
                    }else if(tokenDateObj.getTime()<currentDateObj.getTime()){
                        console.log("not valid, token expired");
                        delete localStorageData[searchIndex]["token"]
                        delete localStorageData[searchIndex]["tokenExpirationTime"]
                        console.log(localStorageData);
                        localStorage.setItem("Users", JSON.stringify(localStorageData))
                        navigate("/financeTrackerAllLinks", {state:{
                            email:`${currentUserData["email"]}`,
                            name:`${currentUserData["username"]}`
                        }})
                        
                    }
                }else{
                    console.log("no token");
                    navigate("/financeTrackerAllLinks", {state:{
                        email:`${currentUserData["email"]}`,
                        name:`${currentUserData["username"]}`
                    }})

                }
               }
           }else{
            navigate("/financeTrackerAllLinks",{
                state:{
                    email:`${userMail["email"]}`
                }
            })
           }

           
        }
        console.log({userMail});

    }
    const handleChange=(e)=>{
        const {value} = e.target;
        const emailRegEx = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if(!emailRegEx.test(value)){
            setValidationError(prevState=>({...prevState, err:"Enter a valid email"}))
        }else{
            setValidationError(prevState=>({...prevState, err:""}))

        }
        setUserMail(prevState=>({...prevState, email:value}))
    }

return (
    <form onSubmit={handleSubmit}>
    <input type='text' placeholder='Enter your mail' value={userMail.email} onChange={handleChange} name='email'/>
    <button type='submit'>Go</button>
    <p>{validationError.err}</p>
    </form>
)
}
export default GetMail;
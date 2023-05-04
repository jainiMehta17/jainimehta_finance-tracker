import React, { useEffect } from 'react';
import { useParams, useLocation ,  useNavigate } from 'react-router-dom';


const Home = ()=>{
    const navigate = useNavigate()
    const location = useLocation();
    console.log("location", location);
    // const username= location.state.name;
    const token = JSON.parse(localStorage.getItem("Token"))
    console.log();
    const localStorageData = localStorage.getItem("Users")!==null?JSON.parse(localStorage.getItem("Users")):null;
   const searchIndex =  localStorageData.findIndex(user=>user["token"]===token);
   const username = localStorageData[searchIndex]["username"]; 
   const userMail = localStorageData[searchIndex]["email"]
   const handleLogout= () =>{
       const newArr = localStorageData.filter(obj=>{
        console.log(obj["email"]!==userMail);
        return obj["email"]!==userMail;
    })
    console.log("newArr", newArr);
    if(newArr.length!==0){
        delete localStorageData[searchIndex]["token"]
        delete localStorageData[searchIndex]["tokenExpirationTime"]
        localStorage.setItem("Users", JSON.stringify(localStorageData))
        localStorage.removeItem("Token");
        localStorage.removeItem("TokenExpirationTime")
        navigate("/login")
    }else{
        delete localStorageData[searchIndex]["token"]
        delete localStorageData[searchIndex]["tokenExpirationTime"]
        localStorage.setItem("Users", JSON.stringify(localStorageData))
        localStorage.removeItem("Token");
        localStorage.removeItem("TokenExpirationTime")
        navigate("/login")
    }
   } 
return(
    <div>
        <h1>Welcome {username}</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
)
}
export default Home;
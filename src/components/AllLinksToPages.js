import React, { useEffect } from 'react';
import { Link, Navigate, useLocation} from "react-router-dom";

const AllLinksToPages = ()=>{
    const localStorageData = localStorage.getItem("Users")!==null?JSON.parse(localStorage.getItem("Users")):null;
    console.log(localStorageData);
    const location = useLocation();
    console.log(location);
    const searchIndex = localStorageData.findIndex((user)=>user["email"]===location.state["email"]);
    console.log(searchIndex);
    useEffect(()=>{
        location.state["token"]?localStorage.setItem("Token", JSON.stringify(location.state["token"])):localStorage.removeItem("Token");
        location.state["tokenExpirationTime"]?localStorage.setItem("TokenExpirationTime", JSON.stringify(location.state["tokenExpirationTime"])):localStorage.removeItem("TokenExpirationTime");
        
    },[])
    // const handleHomeNavigation = ()=>{
    //     if(localStorageData!==null){
    //         if(searchIndex===-1){
    //             console.log("go to register page,data not found,  home page not accessible");
    //         }
    //         else{
    //             if(!localStorageData[searchIndex]["token"]){
    //                 console.log("redirect to login page, data found but not logged in ,home page not accesible");
    //             }else{
    //                 console.log("home page accessible, token found and  not expired yet")
    //             }
    //         }
    //     }else{
    //         console.log("Not registered, so home page not acessible, redirect to registeration page ")
    //     }
    // }
    // const handleRegisterNavigation = ()=>{
    //     if(localStorageData!==null){
    //         if(searchIndex===-1){
    //            console.log("data not found , so registraytion page accessible");
    //         }else{
    //             if(!localStorageData[searchIndex]["token"]){
    //                 console.log("redirect to login page, data found but not logged in ,registration page not accesible");
    //             }else{
    //                 console.log("redirect to home page , user have token, so can't register until token don't expire")
    //             }
    //         }
    //         }else{
    //             console.log("local storage data is null, so registration accessible ");
    //         }
    // }
    // const handleLoginNavigation = ()=>{
    //     if(localStorageData!==null){
    //         if(searchIndex===-1){
    //             console.log("data not found , go to registration page , login not accessible");
    //          }else{
    //              if(!localStorageData[searchIndex]["token"]){
    //                  console.log("login page accessible coz user doesn't have token");
    //              }else{
    //                  console.log("redirect to home page , user have token, so can't login until token don't expire")
    //              }
    //          }
    //     }else{
    //         console.log("local storage data is null, so login not accessible,  redirect to register page  ");
    //     }
    // }
return(
    <div>

            <span><Link to="/home">Home</Link></span><br/>
            <span><Link to="/register">Register</Link></span><br/>
            <span><Link to="/login">Login</Link></span><br/>
                                    
    </div>
)
}
export default AllLinksToPages;
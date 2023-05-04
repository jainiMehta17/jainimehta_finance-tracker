import React, { useEffect } from 'react';
import { Navigate , redirect} from 'react-router-dom';

const Authguard = props=>{
   
    const {isPublic, Component} = props;
    const localStorageToken = localStorage.getItem("Token")?JSON.parse(localStorage.getItem("Token")):null

        if(isPublic){
            console.log(isPublic);
            if(localStorageToken===null){
                console.log(Component);
                return <Component/>
            }else{
                return <Navigate to="/home"/>
                
            }   
        }else{
            if(localStorageToken===null){
                return <Navigate to="/login"/>

            }else{
                return <Component/>

            }
        }


}
export default Authguard;
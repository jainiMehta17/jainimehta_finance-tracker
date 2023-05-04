import React, {Component} from "react";
function FunctionClick(){
    function functionCall(){
        console.log("functionCall clicked")
    }
    return(
        <div>
            <button onClick={functionCall}>FunctionClick</button>
        </div>
    )
}
export default FunctionClick;
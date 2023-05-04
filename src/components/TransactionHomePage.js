import React from "react";
import { Link } from "react-router-dom";

function TransactionHomePage (){
    return(
        <>
        <Link to={`/transaction/add-transaction` } >VIEW POSTS</Link>
                </>
    )
}
export default TransactionHomePage;
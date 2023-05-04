import React, { useState } from 'react'; 
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom';
function ViewTransaction(){
    const navigate = useNavigate()
    let {id} = useParams();
    const allTransactions = JSON.parse(localStorage.getItem("Transactions"))
    const data = allTransactions.slice(id, Number(id)+1)
    const goBackToShowTransactions=()=>{
        navigate("/transaction/show-transactions")
    }
    return (<>
        <table>
            <tr>
            <th>Transaction Date</th>
            <td>{data[0].transactionDate}</td>
            </tr>
            <tr>
            <th>Month Year</th>
            <td>{data[0].monthYear}</td>
            </tr>
            <tr>
            <th>Transaction Type</th>
            <td>{data[0].transactionType}</td>
            </tr>
            <tr>
            <th>From Account</th>
            <td>{data[0].fromAccount}</td>
            </tr>
            <tr>
            <th>To Account </th>
            <td>{data[0].toAccount}</td>
            </tr>
            <tr>
            <th>Amount</th>
            <td>{data[0].amount}</td>
            </tr>
            <tr>
            <th>Receipt</th>
            <td><img src={data[0].receipt} alt='img'width="100px" height="50px"/></td>
            </tr>
            <tr>
            <th>Notes</th>
            <td>{data[0].notes}</td>
            </tr>
        </table>

        <button onClick={goBackToShowTransactions}>Back</button>
    
    </>
    )
}
export default ViewTransaction;
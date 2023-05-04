import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
function ShowTransaction(){
const searchArr = []
const navigate = useNavigate();
let allTransactions = JSON.parse(localStorage.getItem("Transactions"))
const [totalTransactions , setTotalTransactions] = useState(allTransactions)
const rowsPerPage = 4;
const firstPageTransactions = allTransactions.slice(0, rowsPerPage)
const initialColumnState = {transactionDate:"-", monthYear:"-", transactionType:"-", fromAccount:"-", toAccount:"-", amount:"-", receipt:"-", notes:"-"}
const [transactions , setTransactions] = useState(firstPageTransactions)
const [columnOrder , setColumnOrder] = useState(initialColumnState);
const [groupByColumnName, setGroupByColumnName] = useState("")
const [uniqueColumnElements, setUniqueColumnElement] = useState()
const monthYearArr= ['Jan 2023', 'Feb 2023','Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023', 'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023' ]
const [currenPageTransactions , setCurrentPageTransactions] = useState()
const [currentPage, setCurrentPage] = useState(1)
const [searchValue , setSearchValue] = useState({searchVal:""})
let groupedArray = []
const transactionsLength = allTransactions.length;
const totalPages = Math.ceil(transactionsLength/rowsPerPage);
let pagesArray = []
for (let i = 1; i <=totalPages; i++) {
   pagesArray.push(i)
    
}
console.log({allTransactions});

const setOrder=(e)=>{
const {name, value} = e.target;
let columnOrderClone = initialColumnState;
    Object.keys(columnOrderClone).forEach(key=>{
        if(key!==name && columnOrderClone[key]!=="-"){
            columnOrderClone[key]="-"
        }else{
            if(key===name && value ==="-"){
                columnOrderClone[key]="˅";
                if(name==="monthYear"){
                    setTransactions(prevState=>([...prevState].sort((a,b)=>monthYearArr.indexOf(a[name])-monthYearArr.indexOf(b[name]))))
                }else if(name==="amount"){
                    setTransactions(prevState=>([...prevState].sort((a,b)=>a[name]-b[name])))
                }else{
                    setTransactions(prevState=>([...prevState].sort((a,b)=>(a[name]>b[name])?1:-1)))
                }
            }else if(key===name && value ==="˅"){
                columnOrderClone[key]="˄"
                if(name==="monthYear"){
                    setTransactions(prevState=>([...prevState].sort((a,b)=>monthYearArr.indexOf(b[name])-monthYearArr.indexOf(a[name]))))
                }else if(name==="amount"){
                    setTransactions(prevState=>([...prevState].sort((a,b)=>b[name]-a[name])))
                }else{
                    setTransactions(prevState=>([...prevState].sort((a,b)=>(a[name]>b[name])?-1:1)))
                }
            }else if(key===name && value ==="˄"){
                columnOrderClone[key]="˅"
                if(name==="monthYear"){
                    setTransactions(prevState=>([...prevState].sort((a,b)=>monthYearArr.indexOf(a[name]-monthYearArr.indexOf(b[name])))))
                }else if(name==="amount"){
                    setTransactions(prevState=>([...prevState].sort((a,b)=>a[name]-b[name])))
                }else{
                    setTransactions(prevState=>([...prevState].sort((a,b)=>(a[name]>b[name])?1:-1)))
                }
            }
        }
    })
    setColumnOrder(initialColumnState)
}

const setPage = (currPage)=>{
    setCurrentPage(currPage)
    const lowerLimitOfPage = rowsPerPage*(currPage-1);
    const upperLimitOfPage = (rowsPerPage*currPage) -1
    const updatedData = allTransactions.slice(lowerLimitOfPage, upperLimitOfPage+1)
    setTransactions(updatedData)
}
const calculateRange = (e) => {
    const {value} = e.target
    let page = value;
    if(value==="prev"){
        if(Number(currentPage)===1){
            setPage(1)
        }else{
            page = Number(currentPage)-1;
            setPage(page)
            setCurrentPage(page)
            
        }
    }else if(value ==="next"){
        if(Number(currentPage)===totalPages){
            setPage(totalPages)
            setCurrentPage(totalPages)
        }else{
            setPage(Number(currentPage)+1)
            setCurrentPage(Number(currentPage)+1)
        }

    }else{
        setCurrentPage(value)
        setPage(value)
    }


  };

const handleGroupBy=(e)=>{
const {value} = e.target;
setGroupByColumnName(value)
let unique = Array.from(new Set(allTransactions.map((item) => item[value])));
setUniqueColumnElement(unique)
}


const viewTransaction=(index)=>{
const transactionId = (rowsPerPage*(Number(currentPage)-1))+index;
navigate(`/transactions/${transactionId}`)

}
const editTransaction=(index)=>{
    const transactionId = (rowsPerPage*(Number(currentPage)-1))+index;
    navigate(`/transaction/edit-transaction/${transactionId}`)

}
const afterDeletionTransactions = []
const deleteTransaction =(index)=>{
    const transactionId = (rowsPerPage*(Number(currentPage)-1))+index;
    allTransactions.map((obj, index)=>{
        if(index!==Number(transactionId)){
           afterDeletionTransactions.push(obj)
        }
        
    })
    localStorage.setItem("Transactions", JSON.stringify(afterDeletionTransactions));
    setTotalTransactions(afterDeletionTransactions)
}
const goToAddTransactionPage = ()=>{
    navigate(`/transaction/add-transaction`)
}
const handleSearch=(e)=>{
    const {name, value} = e.target;
    console.log("val", value==="");
    setSearchValue(prevState=>({...prevState, searchVal:value}))
    
}
const firstUpdate = useRef(true)
useEffect(()=>{
    if(firstUpdate.current){
        firstUpdate.current=false;
        return;
    }
    if(searchValue.searchVal!==""){

        totalTransactions.map((obj,index)=>{
            // console.log(index, obj["monthYear"].startsWith("O"));
            // console.log(index, obj["monthYear"]);
    
            Object.keys(obj).forEach((key,elementIndex)=>{
            if(key!=="receipt"){
                const objLower = obj[key].toLowerCase();
                const objUpper = obj[key].toUpperCase();
                if((objLower.startsWith(searchValue.searchVal.toLowerCase())  || objLower.startsWith(searchValue.searchVal.toUpperCase()) || objUpper.startsWith(searchValue.searchVal.toLowerCase())  || objUpper.startsWith(searchValue.searchVal.toUpperCase()) )){
                    searchArr.push(obj)
                }
    
            }
            })
            setTransactions(searchArr)
        })
    }else{
        console.log("======================================================");
        setTransactions(firstPageTransactions )
    }
}, [searchValue])

console.log("thisss", {transactions});
return(
    <div>
        <input type='text' placeholder='Search transaction type...' name='searchVal' onChange={handleSearch} value={searchValue.searchVal}/>
        <input type='button' value="Search" name='searchBtn'/><br/><br/>
        <label>Group By</label>
        <select onChange={handleGroupBy}>
            <option value="None" >None</option>
            <option value="monthYear" >Month Year</option>
            <option value="transactionType" >Transaction Type</option>
            <option value="fromAccount" >From Account</option>
            <option value="toAccount" >To Account</option>
        </select><br/><br/>


    {
        groupByColumnName===""|| groupByColumnName==="None"?(
            <table>
            <thead>
                <tr>
                <th>Transaction Date <input type='button' name='transactionDate' value={columnOrder.transactionDate} onClick={(event)=>setOrder(event)}/></th>
                <th>Month Year <input type='button' name='monthYear' value={columnOrder.monthYear} onClick={(event)=>setOrder(event)}/></th>
                <th>Transaction Type <input type='button' name='transactionType' value={columnOrder.transactionType} onClick={(event)=>setOrder(event)}/></th>
                <th>From Account <input type='button' name='fromAccount' value={columnOrder.fromAccount} onClick={(event)=>setOrder(event)}/></th>
                <th>To Account <input type='button' name='toAccount' value={columnOrder.toAccount} onClick={(event)=>setOrder(event)}/></th>
                <th>Amount <input type='button' name='amount' value={columnOrder.amount} onClick={(event)=>setOrder(event)}/></th>
                <th>Receipt <input type='button' name='receipt' value={columnOrder.receipt} onClick={(event)=>setOrder(event)}/></th>
                <th>Notes <input type='button' name='notes' value={columnOrder.notes} onClick={(event)=>setOrder(event)}/></th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr> 
            </thead>
            <tbody>
       
            {
                 transactions.map((element,index)=>{
                    return(
                        <tr key={index}>
                    <td>{element.transactionDate}</td>
                    <td>{element.monthYear}</td>
                    <td>{element.transactionType}</td>
                    <td>{element.fromAccount}</td>
                    <td>{element.toAccount}</td>
                    <td>{element.amount}</td>
                    <td><img src={element.receipt} alt='img'width="100px" height="50px"/></td>
                    <td>{element.notes}</td>
                    <td><span onClick={()=>{viewTransaction(index)}}>View</span></td>
                    <td><span onClick={()=>{editTransaction(index)}}>Edit</span></td>
                    <td><span onClick={()=>{deleteTransaction(index)}}>Delete</span></td>
                </tr>
                    )
            })
            }
                 </tbody>
            </table>

        ):(
           
            uniqueColumnElements.map((element, index)=>{
                return(
          <>
         
                    <h2>{element}</h2>
                <table key={index}>
                        <thead>
                <tr>
                <th>Transaction Date <input type='button' name='transactionDate' value={columnOrder.transactionDate} onClick={(event)=>setOrder(event)}/></th>
                <th>Month Year <input type='button' name='monthYear' value={columnOrder.monthYear} onClick={(event)=>setOrder(event)}/></th>
                <th>Transaction Type <input type='button' name='transactionType' value={columnOrder.transactionType} onClick={(event)=>setOrder(event)}/></th>
                <th>From Account <input type='button' name='fromAccount' value={columnOrder.fromAccount} onClick={(event)=>setOrder(event)}/></th>
                <th>To Account <input type='button' name='toAccount' value={columnOrder.toAccount} onClick={(event)=>setOrder(event)}/></th>
                <th>Amount <input type='button' name='amount' value={columnOrder.amount} onClick={(event)=>setOrder(event)}/></th>
                <th>Receipt <input type='button' name='receipt' value={columnOrder.receipt} onClick={(event)=>setOrder(event)}/></th>
                <th>Notes <input type='button' name='notes' value={columnOrder.notes} onClick={(event)=>setOrder(event)}/></th>
                <th>View</th>
                </tr> 
            </thead>

                {
                totalTransactions.map((obj, index)=>{
                    if(obj[groupByColumnName] ===element){
                        groupedArray.push(obj)
                        return(

                            <tr key={index}>
                                <td>{obj.transactionDate}</td>
                                <td>{obj.monthYear}</td>
                                <td>{obj.transactionType}</td>
                                <td>{obj.fromAccount}</td>
                                <td>{obj.toAccount}</td>
                                <td>{obj.amount}</td>
                                <td><img src={obj.receipt} alt='img'width="100px" height="50px"/></td>
                                <td>{obj.notes}</td>
                                <td>View</td>
                            </tr>
                                )

                    }
                })
            }
                 </table>
                 </>
                )
            })


        )
        
        
    }
    <button onClick={calculateRange} value="prev">Prev</button>
   {
       pagesArray.map((element, index)=>{
        return (
            Number(currentPage)===element?<button onClick={calculateRange} value={element} style={{color: 'red' }} key={index}>{element}</button>:<button onClick={calculateRange} value={element} key={index}>{element}</button>
        )
    })
   }
    <button onClick={calculateRange} value="next">Next</button><br/><br/>


<button onClick={goToAddTransactionPage}>Add Transaction</button>
        
    </div>
)
}
export default ShowTransaction;
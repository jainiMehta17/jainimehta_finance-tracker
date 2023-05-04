import React, {useEffect, useState,useRef }from "react";
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
function EditTransaction(){
    let {id} = useParams();
    const monthYearArr= ['Jan 2023', 'Feb 2023','Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023', 'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023' ]
const transactionTypeArr= ['Home Expense', 'Personal Expense','Income' ]
const fromAndToAccountArray = ['Personal Account', 'Real Living', 'My Dream Home', 'Full Circle', 'Core Realtors', 'Big Block']

const navigate = useNavigate()
const initialValidationErrorsState = {transactionDate:"", monthYear:"", transactionType:"", fromAccount:"", toAccount:"", amount:"", receipt:"", notes:""}

    const allTransactions = JSON.parse(localStorage.getItem("Transactions"))
    const data = allTransactions.slice(id, Number(id)+1)
    const [formValues, setFormValues] = useState(data[0])
    const [validationErrors, setValidationErrors]= useState(initialValidationErrorsState)
    const [isSubmit, setIsSubmit] = useState(true);
    console.log({formValues});
    function handleChange(e){
        const {name, value} = e.target;


        if(name ==="amount"){
            const val = value+"";
            const reversedAmount = val.split("").reverse().join("");
            const splitreversedAmount = reversedAmount.split("")
            const amountLength = splitreversedAmount.length;
            const multiplesOfThreeArray = []
            for(let i=1;i<=amountLength;i++){
                if(i%3===0){
                    multiplesOfThreeArray.push(i)
                }
            }
            console.log(multiplesOfThreeArray);
          
            if(amountLength>3){
                // for(let i=0;i<splitreversedAmount.length;i++){
                    if(multiplesOfThreeArray.length===1){
                        console.log("hii");
                        splitreversedAmount.splice(3,0, ",")
                        console.log(splitreversedAmount)

                    }else{

                    }
                // }
            }
            console.log("length", splitreversedAmount.length)
            console.log("multiplesOfThreeArray",multiplesOfThreeArray);
            setFormValues({...formValues, [name]:value})
        }else if(name ==="receipt"){
            const file =e.target.files[0]
                var fileSize = Math.round(file.size/1024);
                console.log("filesize", fileSize);
                if (fileSize >1024) {
                    e.target.value =''
                    console.log("uploaded", validationErrors);
                    setValidationErrors({...validationErrors, receipt:"File size greater than 1mb"});
                    setFormValues({...formValues, receipt:""})
                } else {
                    validationErrors.receipt=""
                    const reader = new FileReader();
                    reader.onloadend=()=>{
                        const readerResult = reader.result.toString();
                        setFormValues({...formValues, receipt:readerResult  })
                        setValidationErrors({...validationErrors, receipt:""});
                    }
                    reader.readAsDataURL(file)
                }
        }
        else{

            setFormValues({...formValues, [name]:value})
            // console.log({formValues});
        }
        if(name!=="receipt"){
            validate(e.target.name,{...formValues, [name]:value})
        }

    }

    const firstUpdate = useRef(true);
    useEffect(()=>{
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
          }  
    console.log({validationErrors});                               
    const isNullUndefEmptyStr = Object.values(validationErrors).every(value => {
        // 👇️ check for multiple conditions
        if (value === null || value === undefined || value === '') {
          return true;
        }
        return false;
      })
      console.log("isNullUndefEmptyStr", isNullUndefEmptyStr);
      setIsSubmit(isNullUndefEmptyStr)


}, [validationErrors])
 
    function setErrors(fieldName, errorMessage){
        setValidationErrors(prevState=>({...prevState, [fieldName]:errorMessage}))
    }
    function handleSubmit(e){
        e.preventDefault();
        console.log();
        Object.keys(formValues).forEach((key)=>{
            validate(key, formValues)
        })
        console.log("submitted");
        console.log({validationErrors});
        
        console.log({isSubmit});
        console.log("this", {isSubmit});
          if(isSubmit){
            console.log("in is submkitttttttttttttttttt ");
            console.log({formValues});
            const userOldDataFromLocalStorage = JSON.parse(localStorage.getItem("Transactions"));
            console.log("jkhsdbAEJNxc", userOldDataFromLocalStorage, id);
            userOldDataFromLocalStorage.map((obj, index)=>{
                if(index===Number(id)){
                    userOldDataFromLocalStorage[index]=formValues;
                }
                
            })
            localStorage.setItem("Transactions", JSON.stringify(userOldDataFromLocalStorage));
            navigate("/transaction/show-transactions")
            

            // if (localStorage.getItem('Transactions') !== null) {
            //     console.log("in if");
            //     const retrievedString =  localStorage.getItem("Transactions")
            //     console.log(JSON.parse(retrievedString));
            //     const parsedArray = JSON.parse(retrievedString);
            //     parsedArray.push(formValues);
            //     console.log(parsedArray);
            //         localStorage.setItem("Transactions", JSON.stringify(parsedArray))
            //         navigate("/transaction/show-transactions")

            //         } else {
            //             console.log("in else");
            //             localStorage.setItem("Transactions", JSON.stringify(localstorageValue))
            //             navigate("/transaction/show-transactions")

            //         }
          }else{
            console.log("in not is submittttt");
          }
        
        }
        function validate(name,updatedFormValues){ 
            if(name==="transactionDate"){
                if(!updatedFormValues.transactionDate){
                        setErrors(name, "Transaction date is required")
                }
                else{
                    setErrors(name,"" )
                }
            }else
            if(name==="monthYear"){
                if(!updatedFormValues.monthYear){
                    setErrors(name, "Transaction-Month Year is required")
                }else{
                    setErrors(name, "")
    
                }
            }
            if(name==="transactionType"){
    
                if(!updatedFormValues.transactionType){
                    setErrors(name, "Transaction-type is required")
                }else{
                    setErrors(name, "")
    
                }
            }
            if(name==="fromAccount"){
    
                if(!updatedFormValues.fromAccount){
                    setErrors(name, "The account from which transaction happened is required")
                }else{
                    setErrors(name, "")
                }
            }
            if(name==="toAccount"){
    
                if(!updatedFormValues.toAccount){
                    // setValidationErrors({...validationErrors, toAccount:"The account to which transaction happened is required"})
                    setErrors(name, "The account to which transaction happened is required")
                }else{
                    setErrors(name, "")
                }
            }
            if(name==="amount"){
    
                if(!updatedFormValues.amount){
                    setErrors(name, "Transaction-amount is required")
                }else if(isNaN(updatedFormValues.amount)){
                    setErrors(name, "Transaction-amount must contains only numbers")
                }
                else if(updatedFormValues.amount.includes(".")){
                    setErrors(name, "Transaction-amount should not be a decimal")
                }
                else if(updatedFormValues.amount.startsWith("0")){
                    setErrors(name, "Transaction-amount should not starts with '0'")
                } 
                else{
                    setErrors(name, "")
                }
            }
    
            if(name==="receipt"){
                if(!updatedFormValues.receipt){
                    setErrors(name, "Transaction-receipt is required")
                }else{
                    setErrors(name, "")
                }
            }
            if(name==="notes"){
                if(!updatedFormValues.notes){
                    setErrors(name, "Transaction-notes is required")
                }else if(updatedFormValues.notes.length>250){
                    setErrors(name, "Maximum 250 characters are allowed")
                }
                else{
                    setErrors(name, "")
                }
            }  
        }
        // {console.log("this",formValues.receipt)};
    return (
        <div>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <label>Transaction Date</label>
            <input type="date" name="transactionDate" onChange={handleChange} value={formValues.transactionDate}/><br/>
            <p>{validationErrors.transactionDate}</p><br/>
            <label>Month Year</label>
            <select name="monthYear" onChange={handleChange}  value={formValues.monthYear}>
               {
                   monthYearArr.map((element,index)=>{
                    return <option id={`month${index}`} key={`month${index}`}>{element} </option>
                })
            }
            </select><br/>
            <p>{validationErrors.monthYear}</p><br/>
            <label>Transaction Type</label>
            <select name="transactionType" onChange={handleChange}  value={formValues.transactionType}>
               {
                   transactionTypeArr.map((element, index)=>{
                       return <option id={`transactionType${index}`}  key={`transactionType${index}`}>{element}</option>
                    })
                }
            </select><br/>
            <p>{validationErrors.transactionType}</p><br/>
            <label>From Account</label>
            <select name="fromAccount" onChange={handleChange} value={formValues.fromAccount}>
            {
                formValues.toAccount===''?fromAndToAccountArray.map((element,index)=>{
                    return <option id={`fromAccount${index}`}  key={`fromAccount${index}`}>{element}</option>
                }) : fromAndToAccountArray.filter(element=>element!==formValues.toAccount).map((element,index)=>{
                    return <option id={`fromAccount${index}`} key={`fromAccount${index}`} >{element}</option>
                })
            }            
            </select><br/>
            <p>{validationErrors.fromAccount}</p><br/>
            <label>To Account</label>
            <select name="toAccount" onChange={handleChange} value={formValues.toAccount}>
            {
                formValues.fromAccount===''?fromAndToAccountArray.map((element,index)=>{
                    return <option id={`toAccount${index}`}  key={`toAccount${index}`}>{element}</option>
                }) : fromAndToAccountArray.filter(element=>element!==formValues.fromAccount).map((element,index)=>{
                    return <option id={`toAccount${index}`} key={`toAccount${index}`}>{element}</option>
                })
            }
            </select><br/>
            <p>{validationErrors.toAccount}</p><br/>
            <label>Amount </label>
            <input type="text" name="amount" onChange={handleChange} value={formValues.amount}/><br/>
            <p>{validationErrors.amount}</p><br/>
            <label>Receipt</label>
            <div style={{border:"1px solid black", height:"200px", width:"350px",   display: "flex",justifyContent: "center"}}><img src={
                formValues.receipt?formValues.receipt:"https://haryana.gov.in/wp-content/themes/sdo-theme/images/default/image-gallery.jpg"
            } height="150px" width="250px" alt='Transaction Receipt'style={{margin:"auto", display:"block"}}/> </div>
            <input type="file" accept="image/jpeg, image/png, image/jpeg" name="receipt" onChange={handleChange} /><br/>
            <p>{validationErrors.receipt}</p><br/>
            <label>Notes </label>
            <textarea rows="10" cols="30" name="notes" onChange={handleChange} value={formValues.notes}/><br/>
            <p>{validationErrors.notes}</p><br/>
            <button type="submit">Update Transaction</button>
        </form>
        </div>
    )
}
export default EditTransaction;
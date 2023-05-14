import axios from 'axios'
import React, {useState, useEffect}  from 'react'
import { useNavigate, useParams } from "react-router-dom"
import {useFormik} from "formik"
import './UpdateBooking.css';

const UpdateBill = () => {
    const ID = localStorage.getItem("bill_id")
    const [code, setCode] = useState("")
    const [totalamount, setTotalAmount] = useState("")
    const [amountpaid, setAmountPaid] = useState("")
    const [paymenttype, setPaymentType] = useState("")
    const [discount, setDiscount] = useState("")

   const navigate = useNavigate();
  
  const loadBillings = async() =>{
    const {data} = await axios.get(`http://127.0.0.1:8000/api_app/bill/${ID}`)
    console.log(data)
    setCode(data.bill_code)
    setTotalAmount(data.bill_total_amount)
    setAmountPaid(data.bill_amount_paid)
    setPaymentType(data.bill_payment_type)
    setDiscount(data.bill_discount)
  }
useEffect(()=>{
    loadBillings()
},[])

const UpdateBillingInfo = async(e) =>{
    e.preventDefault()
  let formField = new FormData()
  formField.append('bill_id', ID)
  formField.append('bill_code', code)
  formField.append('bill_total_amount', totalamount)
  formField.append('bill_amount_paid', amountpaid)
  formField.append('bill_payment_type', paymenttype)
  formField.append('bill_discount', discount)

  await axios({
    method: 'PUT',
    url: `http://127.0.0.1:8000/api_app/bill/${ID}`,
    data: {
        'bill_id': ID,
        'bill_code': code,
        'bill_total_amount': totalamount,
        'bill_amount_paid': amountpaid,
        'bill_payment_type' : paymenttype,
        'bill_discount' : discount
    },
  
    }).then((response) => {

      console.log(response.data)
      navigate("/showBill");
      
    })
}
const {values, errors,touched, handleBlur, handleChange, handleSubmit} = useFormik({ //handlesubmit gives us the data entered by user
   // initialValues:initialValues,
    //validationSchema:billSchema,
    onSubmit: (values) => {
    console.log("🚀 ~ file: Bill.js ~ line 10 ~ Bill ~ values", values)
  
    }
  });
  console.log(errors);
  return (
   <section>
     <div className="main">
        <div className="coll-1">
          <h2>Billing</h2>
          <span>Billing Details!</span>
          <form action="" id='form' className='flex flex-col' onSubmit={UpdateBillingInfo}>

          <label htmlFor="code" name="code" className="input-label"> Code </label>
          <input type="text" name="code" id="code" placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} /> {errors.code && touched.code ?( <p className='form-error'>{errors.code}</p>):null}

          <label htmlFor="amount" name="amount" className="input-label"> Total Amount </label>
          <input type="text" name="amount" id="amount" placeholder='Amount' value={totalamount} onChange={(e) => setTotalAmount(e.target.value)} /> {errors.amount && touched.amount ?( <p className='form-error'>{errors.amount}</p>):null}
          
          <label htmlFor="amountpaid" name="amountpaid" className="input-label"> Amount Paid </label>
          <input type="text" name="amountpaid" id="amountpaid" placeholder='Amount Paid' value={amountpaid} onChange={(e) => setAmountPaid(e.target.value)} /> {errors.amountpaid && touched.amountpaid ?( <p className='form-error'>{errors.amountpaid}</p>):null}


          <label htmlFor="paytype" name="paytytpe" className="input-label"> Payment Type </label>
          <input type="text" name="paytype" id="paytype" placeholder='Payment Type'  value={paymenttype} onChange={(e) => setPaymentType(e.target.value)} /> {errors.paytype && touched.paytype ?( <p className='form-error'>{errors.paytype}</p>):null}


          <label htmlFor="discount" name="discount" className="input-label"> Discount </label>
          <input type="text" name="discount" id="discount" placeholder='Discount' value={discount} onChange={(e) => setDiscount(e.target.value)} /> {errors.discount && touched.discount ?( <p className='form-error'>{errors.discount}</p>):null}
          <button className='btn' type='submit'>Update</button>
          </form>
        </div>
        </div>
   </section>
  )
}

export default UpdateBill

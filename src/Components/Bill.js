import React, {useState, useEffect} from 'react'
import './bill.css'
import axios from 'axios'
import bill from '../assets/bill.jpg';
import {useFormik} from "formik"
import {billSchema} from '../schemas/Bill'
import { useNavigate } from 'react-router-dom';

const initialValues={
    code: "",
    paytype: "",
    amount: "",
    amountpaid: "",
    discount: "",
   }
   
   const Bill = () => {
    const navigate = useNavigate();
    let id;
    const [code, setCode] = useState("")
    const [totalamount, setTotalAmount] = useState("")
    const [amountpaid, setAmountPaid] = useState("")
    const [paymenttype, setPaymentType] = useState("")
    const [discount, setDiscount] = useState("")
    const [Ccode, setCCode] = useState([])

    const [cID, setCID] = useState(null)
    const [Vcode, setVCode] = useState([])
    const [vID, setVID] = useState(null)

    useEffect(() => { // for customer id
      async function fetchData() {
        const response = await axios({
          method: "get",
          url: "http://127.0.0.1:8000/api_app/customer",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // setBCode(response.data);
        console.log(response.data);
        // setBCode(response.data.booking_id);
        const Ccode = response.data.map((item) => {
          return item.customer_id;
        });
        setCCode(Ccode);
      }
      fetchData();
    }, []);

    useEffect(() => { //for Vendor id
      async function fetchData() {
        const response = await axios({
          method: "get",
          url: "http://127.0.0.1:8000/api_app/vendor",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // setBCode(response.data);
        console.log(response.data);
        // setBCode(response.data.booking_id);
        const Vcode = response.data.map((item) => {
          return item.vendor_id;
        });
        setVCode(Vcode);
      }
      fetchData();
    }, []);


    const AddBillingInfo = async (e) => {
      e.preventDefault()
      let formField = new FormData()
    
      formField.append('bill_id', id)
      formField.append('bill_code', code)
      formField.append('bill_total_amount', totalamount)
      formField.append('bill_amount_paid', amountpaid)
      formField.append('bill_payment_type', paymenttype)
      formField.append('bill_discount', discount)
      formField.append('customer_id', cID)
      formField.append('vendor_id', vID)
    
      await axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api_app/bill',
        data: {
          'bill_id': id,
          'bill_code': code,
          'bill_total_amount': totalamount,
          'bill_amount_paid': amountpaid,
          'bill_payment_type' : paymenttype,
          'bill_discount' : discount,
          'customer_id': cID,
          'vendor_id': vID
          
      },
    
      }).then((response) => {
        console.log(response.data)
        navigate("/showBill");
        
      })
    
    }



    const {values, errors,touched, handleBlur, handleChange, handleSubmit} = useFormik({ //handlesubmit gives us the data entered by user
        initialValues:initialValues,
        validationSchema:billSchema,
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
          <form action="" id='form' className='flex flex-col' onSubmit={AddBillingInfo}>

          <label htmlFor="code" name="code" className="input-label"> Code </label>
          <input type="Text" name="code" id="code" placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} /> {errors.code && touched.code ?( <p className='form-error'>{errors.code}</p>):null}

          <label htmlFor="paytype" name="paytytpe" className="input-label"> Payment Type </label>
          <input type="text" name="paytype" id="paytype" placeholder='Payment Type'  value={paymenttype} onChange={(e) => setPaymentType(e.target.value)} /> {errors.paytype && touched.paytype ?( <p className='form-error'>{errors.paytype}</p>):null}

          <label htmlFor="amount" name="amount" className="input-label"> Total Amount </label>
          <input type="Text" name="amount" id="amount" placeholder='Amount' value={totalamount} onChange={(e) => setTotalAmount(e.target.value)} /> {errors.amount && touched.amount ?( <p className='form-error'>{errors.amount}</p>):null}

          <label htmlFor="amountpaid" name="amountpaid" className="input-label"> Amount Paid </label>
          <input type="Text" name="amountpaid" id="amountpaid" placeholder='Amount Paid' value={amountpaid} onChange={(e) => setAmountPaid(e.target.value)} /> {errors.amountpaid && touched.amountpaid ?( <p className='form-error'>{errors.amountpaid}</p>):null}

          <label htmlFor="discount" name="discount" className="input-label"> Discount </label>
          <input type="Text" name="discount" id="discount" placeholder='Discount' value={discount} onChange={(e) => setDiscount(e.target.value)} /> {errors.discount && touched.discount ?( <p className='form-error'>{errors.discount}</p>):null}

          <label htmlFor="Ccode" name="Ccode" className="input-label"> Select Your Customer ID </label>

            <select className='form-control'onChange={(e) => setCID(e.target.value)} >
              <option> Select</option>
              {Ccode.map((Ccode) => (
                <option key={Ccode} value={Ccode}>
                  {Ccode}
                </option>
              ))}

            </select>

            <label htmlFor="bcode" name="bcode" className="input-label"> Select Your Vendor ID </label>

            <select className='form-control'onChange={(e) => setVID(e.target.value)} >
              <option> Select</option>
              {Vcode.map((Vcode) => (
                <option key={Vcode} value={Vcode}>
                  {Vcode}
                </option>
              ))}

            </select>
          <button className='btn' type='submit' >Submit</button>
          </form>
        </div>
        <div className="coll-2">
          <img src={bill}alt="" />
        </div>
      </div>
    </section>
  )
}
export default Bill;
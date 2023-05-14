import React, { useState, useEffect } from 'react'
import './Bookingdeets.css'
import loading1 from '../assets/loading1.jpg';
import { useFormik } from "formik"
import axios from 'axios';
import { bdeetsSchema } from '../schemas/BookingDeets';
import { useNavigate } from "react-router-dom"

const initialValues = {
  code: "",
  numArticles: "",
  Quantity: "",
  colweight: "",
  status: "",
  amount: "",
  fare: "",
}
const BookingDeets = () => {

  let id;
  const [code, setCode] = useState("")
  const [status, setStatus] = useState("")
  const [colweight, setColweight] = useState("")
  const [fare, setFare] = useState("")
  const [quantity, setQuantity] = useState("")
  const [numArticles, setArticles] = useState("")
  const [amount, setAmount] = useState("")
  const [bcode, setBCode] = useState([])
  const [bID, setBID] = useState(null)



  useEffect(() => {
    async function fetchData() {
      const response = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/api_app/booking",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setBCode(response.data);
      console.log(response.data);
      // setBCode(response.data.booking_id);
      const bcode = response.data.map((item) => {
        return item.booking_id;
      });
      setBCode(bcode);
    }
    fetchData();
  }, []);


  const navigate = useNavigate();
  const AddBookingDetailInfo = async (e) => {
    e.preventDefault()
    let formField = new FormData()

    formField.append('bd_id', id)
    formField.append('bd_code', code)
    formField.append('bd_status', status)
    formField.append('bd_col_weight', colweight)
    formField.append('bd_fare', fare)
    formField.append('bd_quantity', quantity)
    formField.append('bd_no_of_article', numArticles)
    formField.append('bd_amount', amount)
    formField.append('booking_id', bID)

    // console.log("Bode", bID)
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api_app/booking_details',

      data: {
        'bd_id': id,
        'bd_code': code,
        'bd_status': status,
        'bd_col_weight': colweight,
        'bd_fare': fare,
        'bd_quantity': quantity,
        'bd_no_of_article': numArticles,
        'bd_amount': amount,
        'booking_id': bID


      },

    }).then((response) => {
      console.log(response.data)
      navigate("/editDeets");

    })


  }


  const { errors, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: bdeetsSchema,
    onSubmit: (values) => {
      console.log("🚀 ~ file: BookingDeets.js ~ line 11 ~ BookingDeets ~ values", values)

    }
  });
  console.log(errors);
  console.log(bcode);

  return (
    <section>
      <div className="main-reg">
        <div className="column-1">
          <h2>Booking Details</h2>
          <span>Fill in your details</span>
          <form action="" id='form' className='flex flex-col' onSubmit={AddBookingDetailInfo}>

            <label htmlFor="code" name="code" className="input-label"> Code </label>
            <input type="Text" name="code" id="code" placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} /> {errors.code && touched.code ? (<p className='form-error'>{errors.code}</p>) : null}

            <label htmlFor="id" name="status" className="input-label"> Status </label>
            <input type="text" name="status" id="status" placeholder='Status' value={status} onChange={(e) => setStatus(e.target.value)} /> {errors.status && touched.status ? (<p className='form-error'>{errors.status}</p>) : null}

            <label htmlFor="colweight" name="colweight" className="input-label"> Collective Weight </label>
            <input type="Text" name="colweight" id="colweight" placeholder='Collective Weight' value={colweight} onChange={(e) => setColweight(e.target.value)} /> {errors.colweight && touched.colweight ? (<p className='form-error'>{errors.colweight}</p>) : null}

            <label htmlFor="fare" name="fare" className="input-label"> Fare </label>
            <input type="Text" name="fare" id="fare" placeholder='Fare' value={fare} onChange={(e) => setFare(e.target.value)} /> {errors.fare && touched.fare ? (<p className='form-error'>{errors.fare}</p>) : null}


            <label htmlFor="Quantity" name="Quantity" className="input-label"> Quantity </label>
            <input type="Text" name="Quantity" id="Quantity" placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} /> {errors.Quantity && touched.Quantity ? (<p className='form-error'>{errors.Quantity}</p>) : null}

            <label htmlFor="numArticles" name="numArticles" className="input-label"> No. of Articles </label>
            <input type="Text" name="numArticles" id="numArticles" placeholder='No. of Articles ' value={numArticles} onChange={(e) => setArticles(e.target.value)} /> {errors.numArticles && touched.numArticles ? (<p className='form-error'>{errors.numArticles}</p>) : null}


            <label htmlFor="amount" name="amount" className="input-label"> Amount </label>
            <input type="Text" name="amount" id="amount" placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} /> {errors.amount && touched.amount ? (<p className='form-error'>{errors.amount}</p>) : null}

            <label htmlFor="bcode" name="bcode" className="input-label"> Select Your Booking ID </label>

            <select className='form-control'onChange={(e) => setBID(e.target.value)} >
              <option> Select</option>
              {bcode.map((bcode) => (
                <option key={bcode} value={bcode}>
                  {bcode}
                </option>
              ))}

            </select>


            <button className='button' type='submit'>Submit</button>
          </form>
        </div>
        <div className="column-2">
          <img src={loading1} alt="" />
        </div>
      </div>
    </section>
  )
}
export default BookingDeets;
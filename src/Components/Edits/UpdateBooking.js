import axios from 'axios'
import React, {useState, useEffect}  from 'react'
import { useNavigate } from "react-router-dom"
import {useFormik} from "formik"
import './UpdateBooking.css';

function UpdateBooking() {
  const ID = localStorage.getItem("booking_id")
  const [code, setCode] = useState("")
  const [status, setStatus] = useState("")
  const [delivery, setDeliveryDate] = useState("")
  const [date, setDate] = useState("")

  const navigate = useNavigate();
  
  const loadBookings = async() =>{
    const {data} = await axios.get(`http://127.0.0.1:8000/api_app/booking/${ID}`)
    console.log(data)
    setCode(data.booking_code)
    setStatus(data.booking_status)
    setDeliveryDate(data.booking_delivery_date)
    setDate(data.booking_date)
  }
useEffect(()=>{
    loadBookings()
},[])

const UpdateBookingInfo = async(e) =>{
    e.preventDefault()
  let formField = new FormData()
  formField.append('booking_id', ID)
  formField.append('booking_code', code)
  formField.append('booking_status', status)
  formField.append('booking_delivery_date', delivery)
  formField.append('booking_date', date)

  await axios({
    method: 'PUT',
    url: `http://127.0.0.1:8000/api_app/booking/${ID}`,
    data: {
        'booking_id': ID,
        'booking_code': code,
        'booking_status': status,
        'booking_delivery_date': delivery,
        'booking_date' : date
    },
  
    }).then((response) => {

      console.log(response.data)
      navigate("/showBooking");
      
    })
}
const {values, errors,touched, handleBlur, handleChange, handleSubmit} = useFormik({ //handlesubmit gives us the data entered by user
   // initialValues: initialValues,
    //validationSchema: bookingSchema,
    onSubmit: (values) => {
    console.log("🚀 ~ file: Booking.js ~ line 11 ~ Booking ~ values", values);

    },
  });
  console.log(errors);
  return (
    <section>
    <div className="register">
      <div className="col-1">
        <h2>Booking</h2>
        <span>Book your order right now!</span>
        <form action="" id='form' className='flex flex-col' onSubmit={UpdateBookingInfo}>

        <label htmlFor="code" name="code" className="input-label"> Code </label>
        <input type="Text" name="code" id="code" placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} /> {errors.code && touched.code ?( <p className='form-error'>{errors.code}</p>):null}

        <label htmlFor="status" name="status" className="input-label"> Status </label>
        <input type="text" name="status" id="status" placeholder='Status'  value={status} onChange={(e) => setStatus(e.target.value)} /> {errors.status && touched.status?( <p className='form-error'>{errors.status}</p>):null}

        <label htmlFor="delivery" name="delivery" className="input-label"> Delivery Date </label>
        <input type="date" name="delivery" id="delivery" placeholder='Delivery Date' value={delivery} onChange={(e) => setDeliveryDate(e.target.value)} /> {errors.delivery && touched.delivery ?( <p className='form-error'>{errors.delivery}</p>):null}

        <label htmlFor="date" name="date" className="input-label"> Date </label>
        <input type="date" name="date" id="date" placeholder='Date' value={date} onChange={(e) => setDate(e.target.value)} />
        {errors.date && touched.date ?( <p className='form-error'>{errors.date}</p>):null}
        <button className='btn' type='submit' >Update</button>
        </form>
      </div>
    </div>
  </section>
  )
}

export default UpdateBooking

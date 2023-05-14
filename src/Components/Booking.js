import React, {useState} from 'react'
import container from '../assets/container.jpg';
import './Booking.css'
import {useFormik} from "formik"
import { bookingSchema } from '../schemas/Booking';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const initialValues = { //enterd data in inputs would be acssessable here 
  code: "",
  status: "",
  delivery: "",
  date: "",
}
const Booking = () => {

  const [id] = useState(null)
  const [code, setCode] = useState("")
  const [status, setStatus] = useState("")
  const [delivery, setDeliveryDate] = useState("")
  const [date, setDate] = useState("")


const navigate = useNavigate();
const AddBookingInfo = async (e) => {
  e.preventDefault()
  let formField = new FormData()

  formField.append('booking_id', id)
  formField.append('booking_code', code)
  formField.append('booking_status', status)
  formField.append('booking_delivery_date', delivery)
  formField.append('booking_date', date)

  await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api_app/booking',
    data: {
      'booking_id': id,
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
    initialValues: initialValues,
    validationSchema: bookingSchema,
    onSubmit: (values) => {
    console.log("🚀 ~ file: Booking.js ~ line 11 ~ Booking ~ values", values);

    },
  });
  console.log(errors);
 //console.log("🚀 ~ file: Booking.js ~ line 23 ~ Booking ~ Formik", Formik)

  return (
    <section>
      <div className="register">
        <div className="colm-1">
          <h2>Booking</h2>
          <span>Book your order right now!</span>
          <form action="" id='form' className='flex flex-col' onSubmit={AddBookingInfo}>

          <label htmlFor="code" name="code" className="input-label"> Code </label>
          <input type="Text" name="code" id="code" placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} /> {errors.code && touched.code ?( <p className='form-error'>{errors.code}</p>):null}

          <label htmlFor="status" name="status" className="input-label"> Status </label>
          <input type="text" name="status" id="status" placeholder='Status'  value={status} onChange={(e) => setStatus(e.target.value)} /> {errors.status && touched.status?( <p className='form-error'>{errors.status}</p>):null}

          <label htmlFor="delivery" name="delivery" className="input-label"> Delivery Date </label>
          <input type="date" name="delivery" id="delivery" placeholder='Delivery Date' value={delivery} onChange={(e) => setDeliveryDate(e.target.value)} /> {errors.delivery && touched.delivery ?( <p className='form-error'>{errors.delivery}</p>):null}

          <label htmlFor="date" name="date" className="input-label"> Date </label>
          <input type="date" name="date" id="date" placeholder='Date' value={date} onChange={(e) => setDate(e.target.value)} />
          {errors.date && touched.date ?( <p className='form-error'>{errors.date}</p>):null}
          <button className='btn' type='submit' >Submit</button>
          </form>
        </div>
        <div className="colm-2">
          <img src={container}alt="" />
        </div>
      </div>
    </section>
  )
}
export default Booking;

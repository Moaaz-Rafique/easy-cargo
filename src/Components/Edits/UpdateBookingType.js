import axios from 'axios'
import React, {useState, useEffect}  from 'react'
import { useNavigate, useParams } from "react-router-dom"
import {useFormik} from "formik"
import './UpdateBooking.css';

const UpdateBookingType = () => {
  const ID = localStorage.getItem("bt_id")
  const [code, setCode] = useState("")
  const [booktype, setType] = useState("")

  const navigate = useNavigate();
  
  const loadBookingTypes = async() =>{
    const {data} = await axios.get(`http://127.0.0.1:8000/api_app/booking_type/${ID}`)
    console.log(data)
    setCode(data.bt_code)
    setType(data.bt_type)

  }
useEffect(()=>{
    loadBookingTypes()
},[])

const UpdateBookingTypeInfo = async(e) =>{
    e.preventDefault()
  let formField = new FormData()
  formField.append('bt_id', ID)
  formField.append('bt_code', code)
  formField.append('bt_type', booktype)

  await axios({
    method: 'PUT',
    url: `http://127.0.0.1:8000/api_app/booking_type/${ID}`,
    data: {
        'bt_id': ID,
        'bt_code': code,
        'bt_type': booktype
    },
  
    }).then((response) => {

      console.log(response.data)
      navigate("/showType");
      
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
      <div className="main-sec">
        <div className="coll-1">
          <h2>Booking Type</h2>
          <span>For your shipment convenience</span>
          <form action="" id='form' className='flex flex-col' onSubmit={UpdateBookingTypeInfo}>

          <label htmlFor="code" name="code" className="input-label"> Code </label>
          <input type="text" name="code" id="code" placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} /> {errors.code && touched.code ?( <p className='form-error'>{errors.code}</p>):null}

          <label htmlFor="booktype" name="booktytpe" className="input-label"> Booking Type </label>
          <input type="text" name="booktype" id="booktype" placeholder='Payment Type'  value={booktype} onChange={(e) => setType(e.target.value)} /> {errors.paytype && touched.paytype ?( <p className='form-error'>{errors.paytype}</p>):null}

          <button className='btn' type='submit'>Submit</button>
          </form>
        </div>
        </div>
        </section>
  )
}

export default UpdateBookingType

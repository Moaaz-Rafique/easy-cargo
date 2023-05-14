import React, {useState, useEffect } from 'react'
import './BookType.css'
import bill from '../assets/booknow.jpg';
import {useFormik} from "formik"
import { BTypeSchema } from '../schemas/BookType';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const initialValues={
    code: "",
    booktype: "",
   }

   const BookType = () => {
   let id;
    const [code, setCode] = useState("")
    const [booktype, setType] = useState("")
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
const AddBookingTypeInfo = async (e) => {
  e.preventDefault()
  let formField = new FormData()

  formField.append('bt_id', id)
  formField.append('bt_code', code)
  formField.append('bt_type', booktype)
  formField.append('booking_id', bID)

  await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api_app/booking_type',
    data: {
      'bt_id': id,
      'bt_code': code,
      'bt_type': booktype,
      'booking_id': bID
  },

  }).then((response) => {
    console.log(response.data)
    navigate("/showType");
    
  })

}

    const {values, errors,touched} = useFormik({ //handlesubmit gives us the data entered by user
        initialValues:initialValues,
        validationSchema:BTypeSchema,
        onSubmit: (values) => {
           console.log(values);
        },
      });
      console.log(errors);

  return (
    <section>
      <div className="main-sec">
        <div className="coll-1">
          <h2>Booking Type</h2>
          <span>For your shipment convenience</span>
          <form action="" id='form' className='flex flex-col' onSubmit={AddBookingTypeInfo}>

          <label htmlFor="code" name="code" className="input-label"> Code </label>
          <input type="text" name="code" id="code" placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} /> {errors.code && touched.code ?( <p className='form-error'>{errors.code}</p>):null}

          <label htmlFor="booktype" name="booktytpe" className="input-label"> Booking Type </label>
          <input type="text" name="booktype" id="booktype" placeholder='Booking Type'  value={booktype} onChange={(e) => setType(e.target.value)} /> {errors.paytype && touched.paytype ?( <p className='form-error'>{errors.paytype}</p>):null}
          
          <label htmlFor="bcode" name="bcode" className="input-label"> Select Your Booking ID </label>
          <select className='form-control'onChange={(e) => setBID(e.target.value)} >
              <option> Select</option>
              {bcode.map((bcode) => (
                <option key={bcode} value={bcode}>
                  {bcode}
                </option>
              ))}

            </select>


          <button className='btn' type='submit'>Submit</button>
          </form>
        </div>
        <div className="coll-2">
          <img src={bill}alt="" />
        </div>
      </div>
    </section>
  )
}
export default BookType;

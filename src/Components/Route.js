import React, {useState, useEffect} from 'react'
import './Route.css'
import route from '../assets/routes.jpg';
import {useFormik} from "formik"
import { RouteSchema } from '../schemas/Route';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const initialValues = { //enterd data in inputs would be acssessable here 
    code: "",
    id: "",
    sourceloc : "",
    destloc: "",
    status: "",
  }
const Route = () => {

  let id;
  const [code, setCode] = useState("")
  const [sourceLoc, setSourceLoc] = useState("")
  const [terminalLoc, setTerminalLoc] = useState("")
  const [status, setStatus] = useState("")
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
const AddRouteInfo = async (e) => {
  e.preventDefault()
  let formField = new FormData()

  formField.append('dest_id', id)
  formField.append('dest_code', code)
  formField.append('dest_source_loc', sourceLoc)
  formField.append('dest_terminal_loc', terminalLoc)
  formField.append('dest_status', status)
  formField.append('booking_id', bID)


  await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api_app/destination',
    data: {
      'dest_id': id,
      'dest_code': code,
      'dest_source_loc': sourceLoc,
      'dest_terminal_loc': terminalLoc,
      'dest_status': status,
      'booking_id': bID
  },

  }).then((response) => {
    console.log(response.data)
    navigate("/showRoute");
    
  })

}

  const {values, errors,touched} = useFormik({ //handlesubmit gives us the data entered by user
      initialValues: initialValues,
     validationSchema: RouteSchema,
      onSubmit: (values) => {
      console.log(values);
  
      },
    });
    console.log(errors);


  return (
    <section>
      <div className="register">
        <div className="colr-1">
          <h2>Routes</h2>
          <span>Find your way!</span>
          <form action="" id='form' className='flex flex-col' onSubmit={AddRouteInfo}>

          <label htmlFor="code" name="code" className="input-label"> Code </label>
          <input type="text" name="code" id="code" placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} /> {errors.code && touched.code ?( <p className='form-error'>{errors.code}</p>):null}


          
          <label htmlFor="sourceloc" name="sourceloc" className="input-label"> Source Location </label>
          <input type="text" name="sourceloc" id="sourceloc" placeholder='Source Location' value={sourceLoc} onChange={(e) => setSourceLoc(e.target.value)} /> {errors.sourceloc && touched.sourceloc ?( <p className='form-error'>{errors.sourceloc}</p>):null}
          
          <label htmlFor="destloc" name="destloc" className="input-label"> Destination Location </label>
          <input type="text" name="destloc" id="destloc" placeholder='Destination Location' value={terminalLoc} onChange={(e) => setTerminalLoc(e.target.value)}  /> {errors.destloc && touched.destloc ?( <p className='form-error'>{errors.destloc}</p>):null}

          <label htmlFor="status" name="status" className="input-label"> Status </label>
          <input type="text" name="status" id="status" placeholder='Status'  value={status} onChange={(e) => setStatus(e.target.value)} /> {errors.status && touched.status?( <p className='form-error'>{errors.status}</p>):null}

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
        <div className="colr-2">
        <img src={route}alt="" />
        </div>
      </div>
    </section>
  )
}

export default Route;

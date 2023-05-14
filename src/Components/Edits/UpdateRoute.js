import axios from 'axios'
import React, {useState, useEffect}  from 'react'
import { useNavigate } from "react-router-dom"
import {useFormik} from "formik"
import './UpdateBooking.css';

const UpdateRoute = () => {

    const ID = localStorage.getItem("dest_id")
    const [code, setCode] = useState("")
    const [sourceLoc, setSourceLoc] = useState("")
    const [terminalLoc, setTerminalLoc] = useState("")
    const [status, setStatus] = useState("")

    const navigate = useNavigate();
    const loadRoutes = async() =>{
      const {data} = await axios.get(`http://127.0.0.1:8000/api_app/destination/${ID}`)
      console.log(data)
      setCode(data.dest_code)
      setSourceLoc(data.dest_source_loc)
      setTerminalLoc(data.dest_terminal_loc)
      setStatus(data.dest_status)

    }
  useEffect(()=>{
      loadRoutes()
  },[])

  const UpdateRouteInfo = async (e) => {
    e.preventDefault()
    let formField = new FormData()
  
    formField.append('dest_id', ID)
    formField.append('dest_code', code)
    formField.append('dest_source_loc', sourceLoc)
    formField.append('dest_terminal_loc', terminalLoc)
    formField.append('dest_status', status)
  
  
    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api_app/destination`,
      data: {
        'dest_id': ID,
        'dest_code': code,
        'dest_source_loc': sourceLoc,
        'dest_terminal_loc': terminalLoc,
        'dest_status': status

    },
  
    }).then((response) => {

      console.log(response.data)
      navigate("/showRoute");
      
    })
  
  }

  const {values, errors,touched} = useFormik({ //handlesubmit gives us the data entered by user
  //  initialValues: initialValues,
  // validationSchema: RouteSchema,
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
          <span>Update your way!</span>
          <form action="" id='form' className='flex flex-col' onSubmit={UpdateRouteInfo}>

          <label htmlFor="code" name="code" className="input-label"> Code </label>
          <input type="text" name="code" id="code" placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} /> {errors.code && touched.code ?( <p className='form-error'>{errors.code}</p>):null}
          
          <label htmlFor="sourceloc" name="sourceloc" className="input-label"> Source Location </label>
          <input type="text" name="sourceloc" id="sourceloc" placeholder='Source Location' value={sourceLoc} onChange={(e) => setSourceLoc(e.target.value)} /> {errors.sourceloc && touched.sourceloc ?( <p className='form-error'>{errors.sourceloc}</p>):null}
          
          <label htmlFor="destloc" name="destloc" className="input-label"> Destination Location </label>
          <input type="text" name="destloc" id="destloc" placeholder='Destination Location' value={terminalLoc} onChange={(e) => setTerminalLoc(e.target.value)}  /> {errors.destloc && touched.destloc ?( <p className='form-error'>{errors.destloc}</p>):null}

          <label htmlFor="status" name="status" className="input-label"> Status </label>
          <input type="text" name="status" id="status" placeholder='Status'  value={status} onChange={(e) => setStatus(e.target.value)} /> {errors.status && touched.status?( <p className='form-error'>{errors.status}</p>):null}

          <button className='btn' type='submit'>Update</button>
          </form>
        </div> </div> </section>
  )
}

export default UpdateRoute

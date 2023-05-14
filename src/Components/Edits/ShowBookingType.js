import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import  Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import './ShowBooking.css';
import { useNavigate } from 'react-router-dom';

const ShowBookingType = () => {

    const navigate = useNavigate();
    const [bookingtypes, setBookingType] = useState([])
  
    const getBookingType = async () => {
        const response = await axios.get('http://localhost:8000/api_app/booking_type')
        setBookingType(response.data)
    }
  
    useEffect(() => {
        getBookingType();
    }, [bookingtypes])
    
    const navigateUpdate = (e,id) => {
      e.preventDefault()
      console.log(id)
      const bt_id = localStorage.setItem("bt_id",id)
      navigate('/updateType');
    };
  
    const navigateDelete = async(e,id) => {
      e.preventDefault() 
      await axios({
        method: 'DELETE',
        url: `http://127.0.0.1:8000/api_app/booking_type/${id}`
      
        }).then((response) => {
    
          console.log(response.data)
          
        })
        alert('Delete Data?')
    };
  
    const navigateAdd = async(e) =>{
      e.preventDefault()
      navigate('/BType');
    }

  return (
    <div className='Main-div'>
    <h3 style={{color: "white"}}>All Booking Types</h3>
    <Table striped bordered hover variant="light">
<thead>
  <tr class='col-md-1'>
    <th class='col-md-2'>Booking Type  ID</th>
    <th class='col-md-2'>Booking Code</th>
    <th class='col-md-2'>Booking Type</th>
    <th class='col-md-2'>Booking ID</th>
    <th colSpan={"2"}>Actions</th>
  </tr>
</thead>
<tbody>
  {bookingtypes.map(bookingtype =>{
    return <tr key={bookingtype.bt_id} class='col-md-1'>
    <td class='col-md-2'>{bookingtype.bt_id}</td>
    <td class='col-md-2'>{bookingtype.bt_code}</td>
    <td class='col-md-2'>{bookingtype.bt_type}</td>
    <td class='col-md-2'>{bookingtype.booking_id}</td>
    <td class='col-md-1'><Button variant="warning" onClick={(e) =>navigateUpdate(e, bookingtype.bt_id) }> Edit </Button>  </td>
    <td class='col-md-1'> <Button variant="danger" onClick={(e) =>navigateDelete(e, bookingtype.bt_id) }> Delete </Button></td>
  </tr>
  })}
    
</tbody>
</Table>
<Button type='submit' variant="outline-success" onClick={(e) =>navigateAdd(e)}>Add New Booking Type</Button>
  </div>
  )
}

export default ShowBookingType

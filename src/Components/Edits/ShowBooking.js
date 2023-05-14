import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import  Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import './ShowBooking.css';
import { useNavigate } from 'react-router-dom';
 
 const ShowBooking = () => {
  const navigate = useNavigate();
  const [bookings, setBooking] = useState([]) 

  const getBookings = async () => {
      const response = await axios.get('http://localhost:8000/api_app/booking')
      setBooking(response.data)
  }

  useEffect(() => {
      getBookings();
  }, [bookings])
  
  const navigateUpdate = (e,id) => {
    e.preventDefault()
    console.log(id)
    const booking_id = localStorage.setItem("booking_id",id)
    navigate('/updateBooking');
  };

  const navigateDelete = async(e,id) => {
    e.preventDefault() 
    await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api_app/booking/${id}`
    
      }).then((response) => {
  
        console.log(response.data)
        
      })
      alert('Delete Data?')
  };

  const navigateAdd = async(e) =>{
    e.preventDefault()
    navigate("/Booking");
  }

   return (
    <div className='Main-div'>
      <h3 style={{color: "white"}}>All Bookings</h3>
      <Table striped bordered hover variant="light">
  <thead>
    <tr class='col-md-1'>
      <th class='col-md-1'>Booking ID</th>
      <th class='col-md-2'>Booking Code</th>
      <th class='col-md-2'>Booking Status</th>
      <th class='col-md-2'>Booking Delivery Date</th>
      <th class='col-md-2'>Booking Date</th>
      <th colSpan={"2"}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {bookings.map(booking =>{
      return <tr key={booking.booking_id} class='col-md-1'>
      <td class='col-md-1'>{booking.booking_id}</td>
      <td class='col-md-2'>{booking.booking_code}</td>
      <td class='col-md-2'>{booking.booking_status}</td>
      <td class='col-md-2'>{booking.booking_delivery_date}</td>
      <td class='col-md-2'>{booking.booking_date}</td>
      <td class='col-md-1'><Button variant="warning" onClick={(e) =>navigateUpdate(e, booking.booking_id) }> Edit </Button>  </td>
      <td class='col-md-1'> <Button variant="danger" onClick={(e) =>navigateDelete(e, booking.booking_id) }> Delete </Button></td>
    </tr>
    })}
      
  </tbody>
</Table>
<Button type='submit' variant="outline-success" onClick={(e) =>navigateAdd(e)}>Add New Booking</Button>
    </div>
   )
 }
 
 export default ShowBooking
 
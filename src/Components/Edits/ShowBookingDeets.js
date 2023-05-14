import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import  Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import './ShowBooking.css';
import { useNavigate } from 'react-router-dom';
 
 const ShowBookingDeets = () => {
  const navigate = useNavigate();
  const [bookingDeets, setBookingDeets] = useState([]) 

  const getBookingDeets = async () => {
      const response = await axios.get('http://localhost:8000/api_app/booking_details')
      setBookingDeets(response.data)
  }

  useEffect(() => {
      getBookingDeets();
  }, [bookingDeets])
  
  const navigateUpdate = (e,id) => {
    e.preventDefault()
    console.log(id)
    const bd_id = localStorage.setItem("bd_id",id)
    navigate('/updateDetails');
  };

  const navigateDelete = async(e,id) => {
    e.preventDefault() 
    await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api_app/booking_details/${id}`
    
      }).then((response) => {
  
        console.log(response.data)
      //  navigate("/edit");
         alert('Data Deleted Successfully')
        
      })
  };

   return (
    <div className='Main-div'>
      <h3 style={{color: "white"}}>Booking Details</h3>
      <Table striped bordered hover variant="light">
  <thead>
    <tr class='col-md-1'>
      <th class='col-md-1'>Details ID</th>
      <th class='col-md-1'>Details Code</th>
      <th class='col-md-1'> Status</th>
      <th class='col-md-2'>Collective Weight</th>
      <th class='col-md-1'>Fare</th>
      <th class='col-md-1'>Quantity</th>
      <th class='col-md-2'>No. of Articles</th>
      <th class='col-md-1'>Amount</th>
      <th class='col-md-2'>Booking ID</th>
      <th colSpan={"2"}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {bookingDeets.map(bookingDeet =>{
      return <tr key={bookingDeet.bd_id} class='col-md-1'>
      <td class='col-md-1'>{bookingDeet.bd_id}</td>
      <td class='col-md-2'>{bookingDeet.bd_code}</td>
      <td class='col-md-2'>{bookingDeet.bd_status}</td>
      <td class='col-md-2'>{bookingDeet.bd_col_weight}</td>
      <td class='col-md-2'>{bookingDeet.bd_fare}</td>
      <td class='col-md-2'>{bookingDeet.bd_quantity}</td>
      <td class='col-md-2'>{bookingDeet.bd_no_of_article}</td>
      <td class='col-md-2'>{bookingDeet.bd_amount}</td>
      <td class='col-md-2'>{bookingDeet.booking_id}</td>
     
      <td class='col-md-1'><Button variant="success" onClick={(e) =>navigateUpdate(e, bookingDeet.bd_id) }> Edit </Button>  </td>
      <td class='col-md-1'> <Button variant="danger" onClick={(e) =>navigateDelete(e, bookingDeet.bd_id) }> Delete </Button></td>
    </tr>
    })}
      
  </tbody>
</Table>
<Button type='submit' variant="outline-success">Add New Booking Detail</Button>
    </div>
   )
 }
 
 export default ShowBookingDeets
 
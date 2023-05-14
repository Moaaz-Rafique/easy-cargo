import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import  Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import './ShowBooking.css';
import { useNavigate } from 'react-router-dom';

const ShowRoute = () => {
    const navigate = useNavigate();
    const [destinations, setDestination] = useState([]) 
  
    const getDestinations = async () => {
        const response = await axios.get('http://localhost:8000/api_app/destination')
        setDestination(response.data)
    }
  
    useEffect(() => {
        getDestinations();
    }, [destinations])

    const navigateUpdate = (e,id) => {
        e.preventDefault()
        console.log(id)
        const dest_id = localStorage.setItem("dest_id",id)
        navigate("/updateRoute");
      };
    
      const navigateDelete = async(e,id) => {
        e.preventDefault() 
        await axios({
          method: 'DELETE',
          url: `http://127.0.0.1:8000/api_app/destination/${id}`
        
          }).then((response) => {
      
            console.log(response.data)
            
          })
          alert('Delete Data?')
      };
    
      const navigateAdd = async(e) =>{
        e.preventDefault()
        navigate("/route");
      }
    

  return (
    <div className='Main-div'>
      <h3 style={{color: "white"}}>All Routes</h3>
      <Table striped bordered hover variant="light">
  <thead>
    <tr class='col-md-1'>
      <th class='col-md-1'>Route ID</th>
      <th class='col-md-2'>Route Code</th>
      <th class='col-md-2'>Source Location</th>
      <th class='col-md-2'>Terminal Location</th>
      <th class='col-md-2'>Route Status</th>
      <th class='col-md-2'>Booking ID</th>
      <th colSpan={"2"}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {destinations.map(destination =>{
      return <tr key={destination.dest_id} class='col-md-1'>
      <td class='col-md-1'>{destination.dest_id}</td>
      <td class='col-md-2'>{destination.dest_code}</td>
      <td class='col-md-2'>{destination.dest_source_loc}</td>
      <td class='col-md-2'>{destination.dest_terminal_loc}</td>
      <td class='col-md-2'>{destination.dest_status}</td>
      <td class='col-md-2'>{destination.booking_id}</td>

      <td class='col-md-1'><Button variant="warning" onClick={(e) =>navigateUpdate(e, destination.dest_id) }> Edit </Button>  </td>
      <td class='col-md-1'> <Button variant="danger" onClick={(e) =>navigateDelete(e, destination.dest_id) }> Delete </Button></td>
    </tr>
    })}
      
  </tbody>
</Table>
<Button type='submit' variant="outline-success" onClick={(e) =>navigateAdd(e)}>Add New Route</Button>
    </div>
  )
}

export default ShowRoute

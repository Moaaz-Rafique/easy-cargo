import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import  Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import './ShowBooking.css';
import { useNavigate } from 'react-router-dom';

const ShowCustomer = () => {
    const navigate = useNavigate();
    const [customers, setCustomer] = useState([]) 
  
    const getCustomer = async () => {
        const response = await axios.get('http://localhost:8000/api_app/customer')
        setCustomer(response.data)
    }
  
    useEffect(() => {
        getCustomer();
    }, [customers])

    const navigateUpdate = (e,id) => {
        e.preventDefault()
        console.log(id)
        const customer_id = localStorage.setItem("customer_id",id)
        navigate("/updateCust");
      };
    
      const navigateDelete = async(e,id) => {
        e.preventDefault() 
        await axios({
          method: 'DELETE',
          url: `http://127.0.0.1:8000/api_app/customer/${id}`
        
          }).then((response) => {
      
            console.log(response.data)
            
          })
          alert('Delete Data?')
      };
    
      const navigateAdd = async(e) =>{
        e.preventDefault()
        navigate("/cust");
      }
      


  return (
    <div className='Main-div'>
    <h3 style={{color: "white"}}>Customers List</h3>
    <Table striped bordered hover variant="light">
<thead>
  <tr class='col-md-1'>
    <th class='col-md-1'>Customer ID</th>
    <th class='col-md-2'>Customer Code</th>
    <th class='col-md-2'>First Name</th>
    <th class='col-md-2'>Middle Name</th>
    <th class='col-md-2'>Last Name</th>
    <th class='col-md-2'>CNIC</th>
    <th class='col-md-2'>Email</th>
    <th class='col-md-2'>Contact</th>
    <th class='col-md-2'>Address</th>
    <th class='col-md-2'>Booking ID</th>
    <th colSpan={"2"}>Actions</th>
  </tr>
</thead>
<tbody>
  {customers.map(customer =>{
    return <tr key={customer.customer_id} class='col-md-1'>
    <td class='col-md-1'>{customer.customer_id}</td>
    <td class='col-md-2'>{customer.customer_code}</td>
    <td class='col-md-2'>{customer.customer_Fname}</td>
    <td class='col-md-2'>{customer.customer_Mname}</td>
    <td class='col-md-2'>{customer.customer_Lname}</td>
    <td class='col-md-2'>{customer.customer_cnic}</td>
    <td class='col-md-2'>{customer.customer_email}</td>
    <td class='col-md-2'>{customer.customer_contact}</td>
    <td class='col-md-2'>{customer.customer_address}</td>
    <td class='col-md-2'>{customer.booking_id}</td>

    <td class='col-md-1'><Button variant="warning" onClick={(e) =>navigateUpdate(e, customer.customer_id) }> Edit </Button>  </td>
    <td class='col-md-1'> <Button variant="danger" onClick={(e) =>navigateDelete(e, customer.customer_id) }> Delete </Button></td>
  </tr>
  })}
    
</tbody>
</Table>
<Button type='submit' variant="outline-success" onClick={(e) =>navigateAdd(e)}>Add New Customer</Button>
  </div>
  )
}

export default ShowCustomer

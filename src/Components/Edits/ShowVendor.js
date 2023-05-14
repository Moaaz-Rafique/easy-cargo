import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import  Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import './ShowBooking.css';
import { useNavigate } from 'react-router-dom';

const ShowVendor = () => {

    const navigate = useNavigate();
    const [vendors, setVendor] = useState([]) 
  
    const getVendor = async () => {
        const response = await axios.get('http://localhost:8000/api_app/vendor')
        setVendor(response.data)
    }
  
    useEffect(() => {
        getVendor();
    }, [vendors])
    
    const navigateUpdate = (e,id) => {
      e.preventDefault()
      console.log(id)
      const vendor_id = localStorage.setItem("vendor_id",id)
      navigate('/updateVendor');
    };
  
    const navigateDelete = async(e,id) => {
      e.preventDefault() 
      await axios({
        method: 'DELETE',
        url: `http://127.0.0.1:8000/api_app/vendor/${id}`
      
        }).then((response) => {
    
          console.log(response.data)
          
        })
        alert('Delete Data?')
    };
  
    const navigateAdd = async(e) =>{
      e.preventDefault()
      navigate('/vendor');
    }
    
  return (
    <div className='Main-div'>
    <h3 style={{color: "white"}}>Vendors List</h3>
    <Table striped bordered hover variant="light">
<thead>
  <tr class='col-md-1'>
    <th class='col-md-1'>Vendor ID</th>
    <th class='col-md-2'>Vendor Code</th>
    <th class='col-md-2'>First Name</th>
    <th class='col-md-2'>Middle Name</th>
    <th class='col-md-2'>Last Name</th>
    <th class='col-md-2'>Company Name</th>
    <th class='col-md-2'>Email</th>
    <th class='col-md-2'>Contact</th>
    <th class='col-md-2'>Address</th>
    <th colSpan={"2"}>Actions</th>
  </tr>
</thead>
<tbody>
  {vendors.map(vendor =>{
    return <tr key={vendor.vendor_id} class='col-md-1'>
    <td class='col-md-1'>{vendor.vendor_id}</td>
    <td class='col-md-2'>{vendor.vendor_code}</td>
    <td class='col-md-2'>{vendor.vendor_Fname}</td>
    <td class='col-md-2'>{vendor.vendor_Mname}</td>
    <td class='col-md-2'>{vendor.vendor_Lname}</td>
    <td class='col-md-2'>{vendor.vendor_company_name}</td>
    <td class='col-md-2'>{vendor.vendor_email}</td>
    <td class='col-md-2'>{vendor.vendor_contact}</td>
    <td class='col-md-2'>{vendor.vendor_address}</td>
    <td class='col-md-1'><Button variant="warning" onClick={(e) =>navigateUpdate(e, vendor.vendor_id) }> Edit </Button>  </td>
    <td class='col-md-1'> <Button variant="danger" onClick={(e) =>navigateDelete(e, vendor.vendor_id) }> Delete </Button></td>
  </tr>
  })}
    
</tbody>
</Table>
<Button type='submit' variant="outline-success" onClick={(e) =>navigateAdd(e)}>Add New Vendor</Button>
  </div>
  )
}

export default ShowVendor

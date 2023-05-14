import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import  Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import './ShowBooking.css';
import { useNavigate } from 'react-router-dom';

const ShowBill = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]) 

  const getBills = async () => {
      const response = await axios.get('http://localhost:8000/api_app/bill')
      setBills(response.data)
  }

  useEffect(() => {
      getBills();
  }, [bills])
  const navigateUpdate = (e,id) => {
    e.preventDefault()
    console.log(id)
    const bill_id = localStorage.setItem("bill_id",id)
    navigate('/updateBill');
  };

  const navigateDelete = async(e,id) => {
    e.preventDefault() 
    await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api_app/bill/${id}`
    
      }).then((response) => {
  
        console.log(response.data)
      //  navigate("/edit");
         alert('Data Deleted Successfully')
        
      })
  };

  const navigateAdd = async(e) =>{
    e.preventDefault()
    navigate('/Bill');
  }

  return (
    <div className='Main-div'>
    <h3 style={{color: "white"}}>Billings</h3>
    <Table striped bordered hover variant="light">
<thead>
  <tr class='col-md-1'>
    <th class='col-md-1'>Bill ID</th>
    <th class='col-md-2'>Bill Code</th>
    <th class='col-md-2'>Total Amount</th>
    <th class='col-md-2'>Amount Paid</th>
    <th class='col-md-2'>Payment Type</th>
    <th class='col-md-2'>Discount</th>
    <th class='col-md-2'>Customer ID</th>
    <th class='col-md-2'>Vendor ID</th>
    <th colSpan={"2"}>Actions</th>
  </tr>
</thead>
<tbody>
  {bills.map(bill =>{
    return <tr key={bill.bill_id} class='col-md-1'>
    <td class='col-md-1'>{bill.bill_id}</td>
    <td class='col-md-2'>{bill.bill_code}</td>
    <td class='col-md-2'>{bill.bill_total_amount}</td>
    <td class='col-md-1'>{bill.bill_amount_paid}</td>
    <td class='col-md-2'>{bill.bill_payment_type}</td>
    <td class='col-md-1'>{bill.bill_discount}</td>
    <td class='col-md-2'>{bill.customer_id}</td>
    <td class='col-md-2'>{bill.vendor_id}</td>

    <td class='col-md-1'><Button variant="warning" onClick={(e) =>navigateUpdate(e, bill.bill_id) }> Edit </Button>  </td>
    <td class='col-md-1'> <Button variant="danger" onClick={(e) =>navigateDelete(e, bill.bill_id) }> Delete </Button></td>
  </tr>
  })}
    
</tbody>
</Table>
<Button type='submit' variant="outline-success" onClick={(e) =>navigateAdd(e)}>Add New Bill</Button>
  </div>
  )
}

export default ShowBill

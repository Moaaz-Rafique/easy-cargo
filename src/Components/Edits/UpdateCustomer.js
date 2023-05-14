import axios from 'axios'
import React, {useState, useEffect}  from 'react'
import { useNavigate } from "react-router-dom"
import {useFormik} from "formik"
import './UpdateBooking.css';

const UpdateCustomer = () => {
    const ID = localStorage.getItem("customer_id")
    const [code, setCode] = useState("")
    const [Fname, setFname] = useState("")
    const [Mname, setMname] = useState("")
    const [Lname, setLname] = useState("")
    const [cnic, setCNIC] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")

    const navigate = useNavigate();
    const loadCustomers = async() =>{
      const {data} = await axios.get(`http://127.0.0.1:8000/api_app/customer/${ID}`)
      console.log(data)
      setCode(data.customer_code)
      setFname(data.customer_Fname)
      setMname(data.customer_Mname)
      setLname(data.customer_Lname)
      setCNIC(data.customer_cnic)
      setEmail(data.customer_email)
      setContact(data.customer_contact)
      setAddress(data.customer_address)
    }
  useEffect(()=>{
      loadCustomers()
  },[])

  const UpdateCustomerInfo = async (e) => {
    e.preventDefault()
    let formField = new FormData()
  
    formField.append('customer_id', ID)
    formField.append('customer_code', code)
    formField.append('customer_Fname', Fname)
    formField.append('customer_Mname', Mname)
    formField.append('customer_Lname', Lname)
    formField.append('customer_cnic', cnic)
    formField.append('customer_email', email)
    formField.append('customer_contact', contact)
    formField.append('customer_address', address)
  
    await axios({
      method: 'PUT',
      url: `http://127.0.0.1:8000/api_app/customer/${ID}`,
      data: {
      'customer_id': ID,
      'customer_code': code,
      'customer_Fname': Fname,
      'customer_Mname': Mname,
      'customer_Lname': Lname,
      'customer_cnic': cnic,
      'customer_email': email,
      'customer_contact': contact,
      'customer_address': address
    },
  
    }).then((response) => {
      console.log(response.data)
      navigate("/showCust");
      
    })
  
  }

  const { values, errors,touched } =
  useFormik({
    //initialValues,
  //validationSchema: CustSchema,
  onSubmit: (values, action) => {
    console.log(values);
    action.resetForm();
  },
});
console.log(errors);
  
  return (
    <section className='section-cust'>
        <div className="register-m">
          
            <div className="colc-1">
            <span><h3>Customer Information</h3></span>
                <form onSubmit={UpdateCustomerInfo} id="cust-form">

                <div className="input-block">
                    <label htmlFor="code" className="input-label">
                      Customer Code
                    </label>
                    <input
                      type="Text"
                      autoComplete="off"
                      name="code"
                      id="code"
                      placeholder="Customer Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    {errors.code && touched.code ? (
                      <p className="form-error">{errors.code}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="Fname" className="input-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="Fname"
                      id="Fname"
                      placeholder="First Name"
                      value={Fname}
                      onChange={(e) => setFname(e.target.value)}
                      
                    />
                    {errors.Fname && touched.Fname ? (
                      <p className="form-error">{errors.Fname}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="Mname" className="input-label">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="Mname"
                      id="Mname"
                      placeholder="Middle Name"
                      value={Mname}
                      onChange={(e) => setMname(e.target.value)}
                      
                    />
                    {errors.Mname && touched.Mname ? (
                      <p className="form-error">{errors.Mname}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="Lname" className="input-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="Lname"
                      id="Lname"
                      placeholder="Last Name"
                      value={Lname}
                      onChange={(e) => setLname(e.target.value)}
                   
                    />
                    {errors.Lname && touched.Lname ? (
                      <p className="form-error">{errors.Lname}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="cnic" className="input-label">
                      CNIC
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="cnic"
                      id="cnic"
                      placeholder="Customer CNIC"
                      value={cnic}
                      onChange={(e) => setCNIC(e.target.value)}
                      
                    />
                    {errors.cnic && touched.cnic ? (
                      <p className="form-error">{errors.cnic}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Customer Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    
                    />
                    {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="contact" className="input-label">
                      Contact Number
                    </label>
                    <input
                      type="Number"
                      autoComplete="off"
                      name="contact"
                      id="contact"
                      placeholder="Contact Number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      
                    />
                    {errors.contact && touched.contact ? (
                      <p className="form-error">{errors.contact}</p>
                    ) : null}
                  </div>
                  <div className="input-block">
                    <label htmlFor="address" className="input-label">
                      Address
                    </label>
                    <input
                      type="text"
                      autoComplete="off"
                      name="address"
                      id="address"
                      placeholder="Customer Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && touched.address ? (
                      <p className="form-error">{errors.address}</p>
                    ) : null}
                  </div>
                  <div className="modal-buttons">
                    <button className="btn-cust" type="submit">
                        Update
                    </button>
                  </div>
                </form>

            </div> </div> </section>
  )
}

export default UpdateCustomer

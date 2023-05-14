import React, {useState, useEffect} from 'react';
import './Customer.css';
import BgImg from '../assets/container.jpg';
import { useFormik } from "formik";
import { CustSchema } from '../schemas/customer';
import axios from 'axios';
import { useNavigate } from "react-router-dom"


const initialValues={
  code:"",
  Fname:"",
  Mname:"",
  Lname:"",
  cnic:"",
  email:"",
  contact:"",
  address:"",
};

const Customer = () => {
  let id;
  const [code, setCode] = useState("")
  const [Fname, setFname] = useState("")
  const [Mname, setMname] = useState("")
  const [Lname, setLname] = useState("")
  const [cnic, setCNIC] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [address, setAddress] = useState("")
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
const AddCustomerInfo = async (e) => {
  e.preventDefault()
  let formField = new FormData()

  formField.append('customer_id', id)
  formField.append('customer_code', code)
  formField.append('customer_Fname', Fname)
  formField.append('customer_Mname', Mname)
  formField.append('customer_Lname', Lname)
  formField.append('customer_cnic', cnic)
  formField.append('customer_email', email)
  formField.append('customer_contact', contact)
  formField.append('customer_address', address)
  formField.append('booking_id', bID)

  await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api_app/customer',
    data: {
      'customer_id': id,
      'customer_code': code,
      'customer_Fname': Fname,
      'customer_Mname': Mname,
      'customer_Lname': Lname,
      'customer_cnic': cnic,
      'customer_email': email,
      'customer_contact': contact,
      'customer_address': address,
      'booking_id': bID
  },

  }).then((response) => {
    console.log(response.data)
    navigate("/showCust");
    
  })

}



    const { values, errors,touched} =
      useFormik({
        initialValues,
      validationSchema: CustSchema,
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
                <form onSubmit={AddCustomerInfo} id="cust-form">

                <div className="input-block">
                    <label htmlFor="code" className="input-label">
                      Customer Code
                    </label>
                    <input
                      type="text"
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

                  <div className="input-block">
                    <label htmlFor="bcode" className="input-label">
                     Booking ID
                    </label>
                    <select className='form-control'onChange={(e) => setBID(e.target.value)} >
              <option> Select</option>
              {bcode.map((bcode) => (
                <option key={bcode} value={bcode}>
                  {bcode}
                </option>
              ))}

            </select>

                  </div>



                  <div className="modal-buttons">
                    <button className="btn-cust" type="submit">
                        Submit
                    </button>
                  </div>
                </form>

            </div>
            <div className="colc-2">
            <img src={BgImg} alt=''/>
            </div>
        </div>
    </section>
  )
  };
export default Customer;
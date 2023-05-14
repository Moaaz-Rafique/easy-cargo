import React, {useState} from 'react'
import './Vendor.css'
import vendor from '../assets/vendorrs.jpg';
import {useFormik} from "formik"
import { VendorSchema } from '../schemas/Vendor';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const initialValues = { //enterd data in inputs would be acssessable here 
    code: "",
    id: "",
    fname: "",
    lname: "",
    cname: "",
  }
const Vendor = () => {
  const [id] = useState(null)
  const [code, setCode] = useState("")
  const [Fname, setFname] = useState("")
  const [Mname, setMname] = useState("")
  const [Lname, setLname] = useState("")
  const [companyname, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [contact, setContact] = useState("")
  const [address, setAddress] = useState("")

const navigate = useNavigate();
const AddVendorInfo = async (e) => {
  e.preventDefault()
  let formField = new FormData()

  formField.append('vendor_id', id)
  formField.append('vendor_code', code)
  formField.append('vendor_Fname', Fname)
  formField.append('vendor_Mname', Mname)
  formField.append('vendor_Lname', Lname)
  formField.append('vendor_company_name', companyname)
  formField.append('vendor_email', email)
  formField.append('vendor_contact', contact)
  formField.append('vendor_address', address)

  await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api_app/vendor',
    data: {
      'vendor_id': id,
      'vendor_code': code,
      'vendor_Fname': Fname,
      'vendor_Mname': Mname,
      'vendor_Lname': Lname,
      'vendor_company_name': companyname,
      'vendor_email': email,
      'vendor_contact': contact,
      'vendor_address': address
  },

  }).then((response) => {
    console.log(response.data)
    navigate("/showVendor");
    
  })

}


  const {values, errors,touched} = useFormik({ //handlesubmit gives us the data entered by user
      initialValues: initialValues,
     validationSchema: VendorSchema,
      onSubmit: (values) => {
      console.log(values);
  
      },
    });
    console.log(errors);


  return (
    <section>
      <div className="register-v">
        <div className="cole-1">
          <h2>Vendor</h2>
          <span>Vendor Information!</span>
          <form action="" id='form' className='flex flex-col' onSubmit={AddVendorInfo}>

          <label htmlFor="code" name="code" className="input-label"> Code </label>
          <input type="text" name="code" id="code" placeholder='Code' value={code} onChange={(e) => setCode(e.target.value)} /> {errors.code && touched.code ?( <p className='form-error'>{errors.code}</p>):null}


          
          <label htmlFor="fname" name="fname" className="input-label"> First Name </label>
          <input type="text" name="fname" id="fname" placeholder='First Name' value={Fname} onChange={(e) => setFname(e.target.value)} /> {errors.fname && touched.fname ?( <p className='form-error'>{errors.fname}</p>):null}

          <label htmlFor="Mname" name="Mname" className="input-label"> Middle Name </label>
          <input type="text" name="Mname" id="Mname" placeholder='Middle Name' value={Mname} onChange={(e) => setMname(e.target.value)} /> {errors.lname && touched.lname ?( <p className='form-error'>{errors.lname}</p>):null}
          
          <label htmlFor="lname" name="lname" className="input-label"> Last Name </label>
          <input type="text" name="lname" id="lname" placeholder='Last Name' value={Lname} onChange={(e) => setLname(e.target.value)} /> {errors.lname && touched.lname ?( <p className='form-error'>{errors.lname}</p>):null}

          <label htmlFor="cname" name="cname" className="input-label"> Company Name </label>
          <input type="text" name="cname" id="cname" placeholder='Company'  value={companyname} onChange={(e) => setCompanyName(e.target.value)} /> {errors.cname && touched.cname?( <p className='form-error'>{errors.cname}</p>):null}

          <label htmlFor="email" name="email" className="input-label"> Email Address </label>
          <input type="text" name="email" id="email" placeholder='Email'  value={email} onChange={(e) => setEmail(e.target.value)} /> {errors.cname && touched.cname?( <p className='form-error'>{errors.cname}</p>):null}

          <label htmlFor="contact" name="contact" className="input-label"> Contact </label>
          <input type="text" name="contact" id="contact" placeholder='Contact'  value={contact} onChange={(e) => setContact(e.target.value)} /> {errors.cname && touched.cname?( <p className='form-error'>{errors.cname}</p>):null}

          <label htmlFor="address" name="address" className="input-label"> Address </label>
          <input type="text" name="address" id="address" placeholder='Address'  value={address} onChange={(e) => setAddress(e.target.value)} /> {errors.cname && touched.cname?( <p className='form-error'>{errors.cname}</p>):null}


          <button className='btn' type='submit'>Submit</button>
          </form>
        </div>
        <div className="cole-2">
        <img src={vendor}alt="" />
        </div>
      </div>
    </section>
  )
}

export default Vendor;

import React from 'react';
import './reg.css';
import { useFormik } from "formik";
import { RegSchema } from '../schemas/login';


const initialValues={
  username:"",
  password:"",
};

const Reg = () => {
  const { values, errors,touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
    validationSchema: RegSchema,
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });
console.log(errors);



  return (
    
        
         
         <section className="sect1">
        <div className="reg">
          
          <div className="col-01">

            <h2>Sign In </h2>
            <span>Login and Enjoy the service</span>

             <form onSubmit={handleSubmit} id='form-login' className='flex1 flex1-col'>

              <input type ="text" placeholder ='Username' name="username" value={values.username} onChange={handleChange} onBlur={handleBlur} />
              {errors.username && touched.username ? (
                      <p className="form-error">{errors.username}</p>
                    ) : null}
              <input type ="text" placeholder ='Password' name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
              {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
              <button className='btn-b' type='submit'> Sign In</button>
              </form>
          </div>
          

        </div>
        </section> 
        
  )


};
export default Reg;
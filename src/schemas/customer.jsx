import * as Yup from "yup";

export const CustSchema = Yup.object({
    Fname: Yup.string().min(2).max(25).required("First Name Required"),
    Mname: Yup.string().max(25),
    Lname: Yup.string().min(2).max(25).required("Last Name Required"),
    cnic: Yup.string().min(13).max(15).required("CNIC is Required"),
    email: Yup.string().email().required("Email is required"),
    contact: Yup.string().min(11).required("Contact Number is required"),
    address: Yup.string().max(100).required("Address is required"),
    
});
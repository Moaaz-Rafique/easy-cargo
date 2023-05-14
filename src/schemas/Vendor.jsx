import * as Yup from "yup";

export const VendorSchema = Yup.object({
    code:Yup.number().min(3).max(25).required("Please enter the Code"),
    fname: Yup.string().min(2).max(25).required("First Name Required"),
    lname: Yup.string().min(2).max(25).required("Last Name Required"),
    cname: Yup.string().min(2).max(25).required("Company Name Required"),
});
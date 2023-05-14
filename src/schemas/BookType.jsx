import * as Yup from "yup";

export const BTypeSchema = Yup.object({
    code:Yup.number().min(3).max(25).required("Please enter the Code"),
    booktype:Yup.string().required("Please enter your Booking Type"),
});
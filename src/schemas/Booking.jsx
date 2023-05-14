import * as Yup from "yup";

export const bookingSchema = Yup.object({
    code:Yup.number().min(3).max(25).required("Please enter Code"),
    status:Yup.string().min(5).max(25).required("Please enter Status"),
    delivery:Yup.date().required("Please enter Delivery Date"),
    date:Yup.date().required("Please enter Date"),

});
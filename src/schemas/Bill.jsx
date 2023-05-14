import * as Yup from "yup";

export const billSchema = Yup.object({
    code:Yup.number().min(3).max(25).required("Please enter the Code"),
    paytype:Yup.string().required("Please enter your Payment Type"),
    amount:Yup.number().required("Please enter the Amount"),
    amountpaid:Yup.number().required("Please enter the Amount to be Paid"),
    discount:Yup.number().required("Please enter the availed Discount"),
});
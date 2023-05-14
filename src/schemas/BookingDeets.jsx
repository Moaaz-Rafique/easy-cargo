import * as Yup from "yup";

export const bdeetsSchema = Yup.object({
    code:Yup.number().min(3).max(25).required("Please enter Code"),
    numArticles:Yup.number().required("Please enter Number of Articles"),
    Quantity:Yup.number().required("Please enter Quantity"),
    colweight:Yup.number().required("Please enter Collective Weight"),
    status:Yup.string().required("Please enter Status"),
    amount:Yup.number().required("Please enter the Amount"),
    fare:Yup.number().required("Please enter the Fare"),
});
import * as Yup from "yup";

export const RegSchema = Yup.object({

    username: Yup.string().min(8).max(25).required("Username Required"),
    password: Yup.string().min(8).required("Password is Required"), 
});
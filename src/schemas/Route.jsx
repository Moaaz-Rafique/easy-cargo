import * as Yup from "yup";

export const RouteSchema = Yup.object({
    code:Yup.number().min(0).max(25).required("Please enter the Code"),
    sourceloc: Yup.string().min(0).max(25).required("Source Location Required"),
    destloc: Yup.string().min(0).max(25).required("Destination Location Required"),
    status:Yup.string().min(5).max(25).required("Please enter Status"),
});
import axios from "axios";
import baseUrl from "./baseUrl";

export const registerInDb =async (data:{
    name: string;
    phone: string;
    gender: string;
    dob: string;
    email: any;
    password: any;
}) => {
    const res = await axios.post(baseUrl+'patient',{...data})
    return res.data.createdAt ? true :false
}
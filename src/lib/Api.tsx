import axios from "axios";
import baseUrl from "./baseUrl";
import { DoctorExtended } from "./interfaces";

export const registerInDb = async (data: {
  name: string;
  phone: string;
  gender: string;
  dob: string;
  email: any;
  password: any;
}) => {
  const res = await axios.post(baseUrl + "patient", { ...data });
  console.log(res.data)
  return res.data.createdAt ? true : false;
};

function toRad(Value: number) {
  return (Value * Math.PI) / 180;
}
export function calcDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}
export const getDoctorsExtended = async () => {
  const res = await axios.get(baseUrl + "doctor/list/?extended=true");
  return res.data as DoctorExtended[];
};

import axios from "axios";
import baseUrl from "./baseUrl";
import { CData, ConsultData, DocData } from "./interfaces";

export const createDoctor = async (data: DocData) => {
  const res = await axios.post(baseUrl + "doctor", {
    email: data.email,
    password: data.password,
    name: data.firstName + " " + data.lastName,
    photo: data.photo,
    medical_certificate: data.medical_certificate,
  });
  return res.data.uuid as string | undefined;
};
export const createClinic = async (data: CData) => {
  const res = await axios.post(baseUrl + "clinic", { ...data });
  return res.data.uuid as string | undefined;
};
export const createConsult = async (
  data: ConsultData,
  doctor_uuid: string,
  clinic_uuid: string
) => {
  const res = await axios.post(baseUrl + "consultation", {
    ...data,
    doctor_uuid,
    clinic_uuid,
  });
  return res.data.uuid as string | undefined;
};

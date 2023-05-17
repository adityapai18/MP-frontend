export interface Doctor {
  uuid: string;
  email: string;
  password: string; // Will be 'hidden' on GET requests
  name: string;
  photo: string; // Image in base64 encoding
  medical_certificate: string; // Image in base64 encoding
}
export interface KycData {
  c_data: CData;
  consult_data: ConsultData;
  docData: DocData;
}

export interface CData {
  address: string;
  lat: number;
  long: number;
  name: string;
}

export interface ConsultData {
  end_time: string;
  start_time: string;
}

export interface DocData {
  email: string;
  firstName: string;
  lastName: string;
  medical_certificate: string;
  password: string;
  phoneNumber: string;
  photo: string;
}

export interface ConsultExtended {
  uuid: string
  doctor_uuid: string
  clinic_uuid: string
  start_time: string
  end_time: string
  createdAt: string
  updatedAt: string
  Appointments: Appointment[]
}

export interface Appointment {
  uuid: string
  consultation_uuid: string
  fcm_registration_token: string
  hypertrack_device_id: string
  eta: any
  etd: any
  rank: any
  patient_uuid: string
  createdAt: string
  updatedAt: string
  Patient: Patient
}

export interface Patient {
  password: string
  uuid: string
  email: string
  name: string
  phone: string
  gender: string
  dob: string
  createdAt: string
  updatedAt: string
}


export interface Clinic {
  uuid: string
  name: string
  address: string
  lat: number
  long: number
  createdAt: string
  updatedAt: string
}

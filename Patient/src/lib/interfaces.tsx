export interface User {
  createdAt: string;
  dob: string;
  email: string;
  gender: string;
  name: string;
  password: string;
  phone: string;
  updatedAt: string;
  uuid: string;
}
export interface DoctorExtended {
  password: string
  uuid: string
  email: string
  name: string
  photo: string
  medical_certificate: string
  createdAt: string
  updatedAt: string
  Clinics: Clinic[]
}

export interface Clinic {
  uuid: string
  name: string
  address: string
  lat: number
  long: number
  createdAt: string
  updatedAt: string
  Consultation: Consultation
}

export interface Consultation {
  uuid: string
  start_time: string
  end_time: string
}


export interface FCMMessage {
	status: 'scheduled' | 'cancelled'
	size?: string
	position?: string
	etd?: string // Time in format "hh:mm:ss"
	eta?: string // Time in format "hh:mm:ss"
  share_url?: string
}
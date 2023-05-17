import { HyperTrack } from "hypertrack-sdk-react-native";

const PUBLISHABLE_KEY = "8mBZ2XMPJONmOoYnzkRdQ_4340sJzSla8dvRp0Wu98CdlNV_mv5TlG8ZNoM6sUA7FCPODE7h-ThedcdBQ2r0IQ";

export const getHyperDeviceId = async () => {
  const hyperTrack = await HyperTrack.initialize(PUBLISHABLE_KEY);
  const device = await hyperTrack.getDeviceId();
  return device;
};

import { HyperTrack } from "hypertrack-sdk-react-native";

const PUBLISHABLE_KEY = "Paste_your_publishable_key_here";

export const getHyperDeviceId = async () => {
  const hyperTrack = await HyperTrack.initialize(PUBLISHABLE_KEY);
  const device = await hyperTrack.getDeviceId();
  return device;
};

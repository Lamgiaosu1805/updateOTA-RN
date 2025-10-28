import axios from "axios";
import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";

// Function to request the latest OTA bundle from the CMS
export async function requestUpdateBundle() {
   const endpoint = Platform.OS === 'ios' ? "ios-updates" : "androids";
   const version = DeviceInfo.getVersion(); // Get the current app version
   const response = await axios.get(
       `https://codePush.vnfite.com.vn/api/${endpoint}?populate=*&filters[targetVersion][$eq]=${version}&sort=id:desc`
   );
   return response.data;
}
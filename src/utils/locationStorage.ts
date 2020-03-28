import { TLocationData } from "../types";

export const getLocationData = () => {
  const maskStatusLocationData = localStorage.getItem(
    "maskStatusLocation"
  );
  if (maskStatusLocationData) {
    const data: TLocationData = JSON.parse(maskStatusLocationData);
    return data;
  }
}

export const postLocationData =
  (locationData: TLocationData) => {
    localStorage.setItem(
      "maskStatusLocation",
      JSON.stringify(locationData)
    );
  }

export const clearLocationData = () => {
  localStorage.removeItem("maskStatusLocation");
}
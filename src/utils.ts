import { color } from "./initialStyles";
import { GOOGLE_MAP_API } from "./dotenv";

export const convertRemainStatusText = (status: string | null) => {
  switch (status) {
    case "break":
      return "재고 소진";
    case "empty":
      return "1개 이하";
    case "few":
      return "2개 이상 30개 미만";
    case "some":
      return "30개 이상 100개 미만";
    case "plenty":
      return "100개 이상";
    default:
      return "집계 안됨";
  }
};

export const convertRemainStatusColor = (status: string | null) => {
  switch (status) {
    case "break":
      return color.black;
    case "empty":
      return color.black;
    case "few":
      return color.red;
    case "some":
      return color.yellow;
    case "plenty":
      return color.green;
    default:
      return color.black;
  }
};

export const geoCode = async (address: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAP_API}`;
  const result = await fetch(URL);
  const data = await result.json();
  const { results } = data;
  const firstPlace = results[0];
  return {
    address: firstPlace?.formatted_address,
    lat: firstPlace?.geometry?.location?.lat,
    lng: firstPlace?.geometry?.location?.lng
  };
};

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAP_API}`;
  const result = await fetch(URL);
  const data = await result.json();
  const { results } = data;
  const firstPlace = results[0];
  const address = firstPlace.formatted_address;
  return { address };
};

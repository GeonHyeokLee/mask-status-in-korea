import { GOOGLE_MAP_API } from "../dotenv";

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

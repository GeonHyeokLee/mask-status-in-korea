import { useState } from "react";
import { GOOGLE_MAP_API, isDev } from "../dotenv";

export const useReverseGeoCode = () => {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  let repeatChecker: number = 0;
  const asyncProcess = async (lat: number, lng: number) => {
    try {
      setLoading(true);
      const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        isDev ? "" : GOOGLE_MAP_API
      }`;
      const result = await fetch(URL);
      const data = await result.json();
      const { results } = data;
      const firstPlace = results[0];
      const formattedAddress = firstPlace.formatted_address;
      setAddress(formattedAddress);
      setLoading(false);
      repeatChecker = 0;
      return address;
    } catch (error) {
      setError(error);
      setLoading(false);
      if (repeatChecker < 3) {
        repeatChecker++;
        asyncProcess(lat, lng);
      } else {
        repeatChecker = 0;
        return null;
      }
    }
  };

  return {
    mutation: asyncProcess,
    loading,
    error,
  };
};

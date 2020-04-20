import { useState } from "react";
import { GOOGLE_MAP_API, isDev } from "../dotenv";

type TPlace = {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
} | null;

export const useGeoCode = () => {
  const [place, setPlace] = useState<TPlace>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  let repeatChecker: number = 0;
  const asyncProcess = async (address: string) => {
    try {
      setLoading(true);
      const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
        isDev ? "" : GOOGLE_MAP_API
      }`;
      const result = await fetch(URL);
      const data = await result.json();
      const { results } = data;
      if (results[0]) {
        setPlace(results[0]);
      } else {
        return null;
      }
      setLoading(false);
      repeatChecker = 0;
      return place;
    } catch (error) {
      setError(error);
      setLoading(false);
      if (repeatChecker < 3) {
        repeatChecker++;
        asyncProcess(address);
      } else {
        repeatChecker = 0;
        return null;
      }
    }
  };

  return {
    place,
    loading,
    error,
    mutation: asyncProcess,
  };
};

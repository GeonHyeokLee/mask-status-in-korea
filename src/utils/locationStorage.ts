type TLocation = {
  lat: number;
  lng: number;
};

export const getLocationData = () => {
  const maskStatusLocationData = localStorage.getItem(
    "maskStatusLocation"
  );
  if (maskStatusLocationData) {
    const data: TLocation[] = JSON.parse(maskStatusLocationData);
    return data;
  }
}

export const postLocationData =
  (locationData: TLocation[]) => {
    localStorage.setItem(
      "maskStatusLocation",
      JSON.stringify(locationData)
    );
  }

export const clearLocationData = () => {
  localStorage.removeItem("maskStatusLocation");
}
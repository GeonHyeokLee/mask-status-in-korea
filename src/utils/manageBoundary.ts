export const manageBoundary = (zoom: number) => {
  switch (zoom) {
    case 12:
      return 2000;
    case 13:
      return 2000;
    case 14:
      return 1500;
    case 15:
      return 1250;
    case 16:
      return 1000;
    case 17:
      return 750;
    default:
      return 500;
  }
};
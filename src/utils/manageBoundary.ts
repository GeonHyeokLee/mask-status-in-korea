export const manageBoundary = (zoom: number) => {
  switch (zoom) {
    case 15:
      return 1500;
    case 16:
      return 1000;
    case 17:
      return 750;
    case 18:
      return 500;
    case 19:
      return 500;
    default:
      return 2000;
  }
};
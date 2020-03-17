import { color } from "../styles/colors";

export const convertRemainStatusBoolean = (status: string | null) => {
  switch (status) {
    case "break":
      return false;
    case "empty":
      return false;
    case "few":
      return true;
    case "some":
      return true;
    case "plenty":
      return true;
    default:
      return false;
  }
};

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

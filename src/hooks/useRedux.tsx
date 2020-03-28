import { useContext } from "react";
import { stateContext, dispatchContext } from "../modules";

export const useSelector = () => {
  const state = useContext(stateContext);
  if (!state) throw new Error("ContextProvider not found");
  return state;
};

export const useDispatch = () => {
  const dispatch = useContext(dispatchContext);
  if (!dispatch) throw new Error("ContextProvider not found");
  return dispatch;
};

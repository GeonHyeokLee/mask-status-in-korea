import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { color } from "../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";
import { TAddress } from "../types";
import { useDispatch } from "../hooks/useRedux";
import { useGeoCode } from "../hooks/useGeoCode";

const AddressBar: React.FC = () => {
  const [address, setAddress] = useState<TAddress>("");
  const ref = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const { mutation: geoCode } = useGeoCode();

  const onSubmitAddressProcess = useCallback(() => {
    return async (address: string) => {
      const place = await geoCode(address);
      if (!place?.geometry) {
        setAddress("");
        return null;
      }
      dispatch({
        type: "UPDATE_CURRENT_LOCATION",
        payload: { lat: place?.geometry.location.lat, lng: place?.geometry.location.lng },
      });
      dispatch({ type: "UPDATE_CURRENT_ZOOM", payload: 16 });
      setAddress("");
    };
  }, [dispatch, geoCode]);
  const onSubmitAddress = onSubmitAddressProcess();

  const onChangeInputProcess = useCallback(() => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;
      setAddress(value);
    };
  }, []);
  const onChangeInput = onChangeInputProcess();

  const onSubmitFormProcess = useCallback(
    (address: TAddress, ref: any) => {
      return async (
        event:
          | React.FormEvent<HTMLFormElement>
          | React.MouseEvent<HTMLButtonElement, MouseEvent>
          | React.TouchEvent<HTMLButtonElement>
      ) => {
        event.preventDefault();
        await onSubmitAddress(address);
        ref.current.focus();
      };
    },
    [onSubmitAddress]
  );
  const onSubmitForm = onSubmitFormProcess(address, ref);

  return (
    <Container>
      <form onSubmit={onSubmitForm}>
        <input
          name="address"
          placeholder="주소 검색"
          onChange={onChangeInput}
          value={address}
        />
        <button onClick={onSubmitForm} onTouchEnd={onSubmitForm} ref={ref}>
          <FontAwesomeIcon icon={faSearchLocation} />
        </button>
      </form>
    </Container>
  );
};

export default React.memo(AddressBar);

const Container = styled.div`
  display: flex;
  width: 320px;
  height: 55px;
  @media (max-width: 1023px) {
    width: 210px;
    height: 40px;
  }
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      background-color: rgba(0, 0, 0, 0.6);
      border: none;
      flex-shrink: 1;
      width: 100%;
      height: 100%;
      padding: 20px 10px;
      border-radius: 3px 0px 0px 3px;
      -webkit-border-radius: 3px 0px 0px 3px;
      -moz-border-radius: 3px 0px 0px 3px;
      color: ${color.white};
      font-size: 14px;
      :focus {
        outline: none;
      }
      ::placeholder {
        font-size: 15px;
      }
      @media (max-width: 1023px) {
        padding: 10px;
        font-size: 11px;
        ::placeholder {
          font-size: 13px;
        }
      }
    }
    button {
      flex-shrink: 0;
      width: 55px;
      height: 100%;
      border: none;
      background-color: rgba(0, 0, 0, 0.75);
      border-radius: 0px 3px 3px 0px;
      -webkit-border-radius: 0px 3px 3px 0px;
      -moz-border-radius: 0px 3px 3px 0px;
      color: ${color.white};
      cursor: pointer;
      transition: all 0.2s;
      :focus {
        outline: none;
      }
      :hover {
        color: ${color.green};
      }
      @media (max-width: 1023px) {
        width: 40px;
      }
      svg {
        font-size: 20px;
        @media (max-width: 1023px) {
          font-size: 15px;
        }
      }
    }
  }
`;

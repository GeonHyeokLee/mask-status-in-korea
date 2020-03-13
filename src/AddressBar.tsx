import React, { useCallback } from "react";
import styled from "styled-components";
import { color } from "./initialStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchLocation } from "@fortawesome/free-solid-svg-icons";

type TAddressBarProps = {
  onSubmitAddress: (address: string) => Promise<void>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
};

const Container = styled.div`
  position: fixed;
  width: 300px;
  top: 0;
  left: 0;
  height: 40px;
  margin: 20px;
  z-index: 99;
  @media (max-width: 1023px) {
    width: 185px;
    margin: 10px;
  }
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      background-color: rgba(0, 0, 0, 0.7);
      border: none;
      width: 100%;
      height: 100%;
      padding: 20px 10px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      color: ${color.white};
      font-size: 14px;
      ::placeholder {
        font-size: 14px;
      }
      @media (max-width: 1023px) {
        padding: 10px;
        font-size: 11px;
        ::placeholder {
          font-size: 11px;
        }
      }
    }
    button {
      width: 50px;
      height: 100%;
      border: none;
      background-color: rgba(0, 0, 0, 0.8);
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      color: ${color.white};
      cursor: pointer;
    }
  }
`;

const AddressBar: React.FC<TAddressBarProps> = ({
  onSubmitAddress,
  address,
  setAddress
}) => {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value }
      } = event;
      setAddress(value);
    },
    [setAddress]
  );

  const onSubmit = useCallback(
    async (
      event:
        | React.FormEvent<HTMLFormElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      event.preventDefault();
      await onSubmitAddress(address);
    },
    [address, onSubmitAddress]
  );

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input
          name="address"
          placeholder="Google 지도 검색"
          onChange={onChange}
          value={address}
        />
        <button onClick={onSubmit}>
          <FontAwesomeIcon icon={faSearchLocation} />
        </button>
      </form>
    </Container>
  );
};

export default React.memo(AddressBar);

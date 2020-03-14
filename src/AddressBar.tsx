import React, { useCallback, useRef } from "react";
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
      width: 100%;
      height: 100%;
      padding: 20px 10px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
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
      width: 50px;
      height: 100%;
      border: none;
      background-color: rgba(0, 0, 0, 0.75);
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      color: ${color.white};
      cursor: pointer;
      transition: all 0.2s;
      :focus {
        outline: none;
      }
      :hover {
        color: ${color.green};
      }
    }
  }
`;

const AddressBar: React.FC<TAddressBarProps> = ({
  onSubmitAddress,
  address,
  setAddress
}) => {
  const ref = useRef<any>(null);

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
        | React.TouchEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
      await onSubmitAddress(address);
      ref.current.focus();
    },
    [address, onSubmitAddress]
  );

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input
          name="address"
          placeholder="주소 검색"
          onChange={onChange}
          value={address}
        />
        <button onClick={onSubmit} onTouchEnd={onSubmit} ref={ref}>
          <FontAwesomeIcon icon={faSearchLocation} />
        </button>
      </form>
    </Container>
  );
};

export default React.memo(AddressBar);

import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { color } from "./initialStyles";

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
  input {
    border: none;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 3px;
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
`;

const AddressBar: React.FC<any> = () => {
  const [address, setAddress] = useState<string>("");
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    setAddress(value);
  }, []);

  return (
    <Container>
      <input
        name="address"
        placeholder="Google 지도 검색"
        onChange={onChange}
        value={address}
      />
    </Container>
  );
};

export default React.memo(AddressBar);

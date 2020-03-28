import React, { useState, useCallback } from "react";
import GoogleMapReact, { ChangeEventValue } from "google-map-react";
import Store from "./Store";
import styled from "styled-components";
import Information from "./Information";
import Caution from "./Caution";
import MyLocationButton from "./MyLocationButton";
import AddressBar from "./AddressBar";
import { geoCode } from "../utils/geoCode";
import RefreshButton from "./RefreshButton";
import NoticeButton from "./NoticeButton";
import Notice from "./Notice";
import LocationStorage from "./LocationStorage";
import { GOOGLE_MAP_API, isDev } from "../dotenv";
import {
  TStoreData,
  TMapComponentProps,
  TSetCurrentClickStore,
  TSetCurrentHoverStore,
  TInitEvent,
  TSetCurrentLocation,
  TUpdateStoreData,
  TSetCurrentZoom,
  TGeoCode,
  TSetAddress,
  TCurrentLocation,
  TSetToggleNotice,
  TCurrentHoverStore,
  TCurrentClickStore,
  TAddress,
  TToggleNotice,
  TOnlyAvailableStore
} from "../types";
import { convertRemainStatusBoolean } from "../utils/convertRemainStatus";
import OnlyAvailableStoreButton from "./OnlyAvailableStoreButton";
import { color } from "../styles/colors";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  div.dummyContainer {
    width: 100%;
    height: 100%;
  }
`;

const UtilWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 20px;
  display: flex;
  flex-direction: column;
  z-index: 99;
  @media (max-width: 1023px) {
    margin: 10px;
  }
  > div.util-button-wrap {
    position: relative;
    display: flex;
    flex-direction: raw;
    > div.bubble-message {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 32px;
      right: -95px;
      height: 40px;
      font-size: 14px;
      font-weight: bold;
      padding: 10px;
      border-radius: 0 40px 40px 40px;
      background-color: rgba(0, 0, 0, 0.7);
      color: ${color.white};
      @media (max-width: 1023px) {
        top: 16px;
        right: -65px;
        height: 35px;
        font-size: 11px;
      }
      > span {
        color: ${color.yellow};
        margin-right: 10px;
      }
    }
    > div {
      margin-right: 20px;
      :last-of-type {
        margin-right: 0;
      }
      @media (max-width: 1023px) {
        margin-right: 10px;
        :last-of-type {
          margin-right: 0;
        }
      }
    }
  }
  > div {
    margin-bottom: 20px;
    :last-of-type {
      margin-bottom: 0;
    }
    @media (max-width: 1023px) {
      margin-bottom: 10px;
      :last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

const InformationWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 99;
  @media (max-width: 1023px) {
    margin: 10px;
  }
  > div:nth-child(1) {
    margin-bottom: 20px;
    @media (max-width: 1023px) {
      margin-bottom: 10px;
    }
  }
`;

const Map: React.FC<TMapComponentProps> = ({
  currentLocation,
  setCurrentLocation,
  myLocation,
  storeList,
  updateStoreData,
  refreshLoading,
  setRefreshLoading,
  currentZoom,
  setCurrentZoom
}) => {
  const [currentHoverStore, setCurrentHoverStore] = useState<
    TCurrentHoverStore
  >("");
  const [currentClickStore, setCurrentClickStore] = useState<
    TCurrentClickStore
  >("");
  const [address, setAddress] = useState<TAddress>("");
  const [toggleNotice, setToggleNotice] = useState<TToggleNotice>(false);
  const [onlyAvailableStore, setOnlyAvailableStore] = useState<
    TOnlyAvailableStore
  >(false);

  const initEventProcess = useCallback(
    (
      setCurrentHoverStore: TSetCurrentHoverStore,
      setCurrentClickStore: TSetCurrentClickStore
    ) => {
      return (
        initHoverTrigger: boolean = true,
        initClickTrigger: boolean = true
      ) => {
        const initialStoreCode: string = "-999999";
        if (initHoverTrigger) {
          setCurrentHoverStore(initialStoreCode);
        }
        if (initClickTrigger) {
          setCurrentClickStore(initialStoreCode);
        }
      };
    },
    []
  );

  const initEvent: TInitEvent = initEventProcess(
    setCurrentHoverStore,
    setCurrentClickStore
  );

  const onMouseOverStoreProcess = useCallback(
    (
      initEvent: TInitEvent,
      currentClickStore: string,
      setCurrentHoverStore: TSetCurrentHoverStore
    ) => {
      return (code: string) => {
        if (code !== currentClickStore) {
          initEvent(false);
        } else {
          initEvent(true, false);
        }
        setCurrentHoverStore(code);
      };
    },
    []
  );

  const onMouseOverStore = onMouseOverStoreProcess(
    initEvent,
    currentClickStore,
    setCurrentHoverStore
  );

  const onChangeMapProcess = useCallback(
    (
      setCurrentLocation: TSetCurrentLocation,
      updateStoreData: TUpdateStoreData
    ) => {
      return async (value: ChangeEventValue) => {
        setCurrentLocation(prev => ({
          ...prev,
          lat: value.center.lat,
          lng: value.center.lng
        }));
        (await updateStoreData)(value.center.lat, value.center.lng);
      };
    },
    []
  );
  const onChangeMap = onChangeMapProcess(setCurrentLocation, updateStoreData);

  const onZoomAnimationEndProcess = useCallback(
    (setCurrentZoom: TSetCurrentZoom) => {
      return (zoom: number) => {
        setCurrentZoom(zoom);
      };
    },
    []
  );
  const onZoomAnimationEnd = onZoomAnimationEndProcess(setCurrentZoom);

  const onClickStoreProcess = useCallback(
    (
      initEvent: TInitEvent,
      setCurrentLocation: TSetCurrentLocation,
      setCurrentClickStore: TSetCurrentClickStore,
      setCurrentZoom: TSetCurrentZoom,
      currentClickStore: string,
      currentZoom: number
    ) => {
      return (lat: number, lng: number, code: string) => {
        initEvent();
        setCurrentLocation(prev => ({
          ...prev,
          lat,
          lng
        }));
        if (currentClickStore === code) {
          setCurrentClickStore("-999999");
        } else {
          setCurrentClickStore(code);
        }
        if (currentZoom <= 16) {
          setCurrentZoom(16);
        }
      };
    },
    []
  );
  const onClickStore = onClickStoreProcess(
    initEvent,
    setCurrentLocation,
    setCurrentClickStore,
    setCurrentZoom,
    currentClickStore,
    currentZoom
  );

  const onMoveLocationProcess = useCallback(
    (
      initEvent: TInitEvent,
      setCurrentLocation: TSetCurrentLocation,
      setCurrentZoom: TSetCurrentZoom
    ) => {
      return (lat: number, lng: number) => {
        initEvent();
        setCurrentLocation(prev => ({
          ...prev,
          lat,
          lng
        }));
        setCurrentZoom(16);
      };
    },
    []
  );
  const onMoveLocation = onMoveLocationProcess(
    initEvent,
    setCurrentLocation,
    setCurrentZoom
  );

  const onSubmitAddressProcess = useCallback(
    (
      geoCode: TGeoCode,
      setCurrentLocation: TSetCurrentLocation,
      setCurrentZoom: TSetCurrentZoom,
      setAddress: TSetAddress
    ) => {
      return async (address: string) => {
        const result = await geoCode(address);
        setCurrentLocation(prev => ({
          ...prev,
          lat: result.lat,
          lng: result.lng
        }));
        setCurrentZoom(16);
        setAddress("");
      };
    },
    []
  );
  const onSubmitAddress = onSubmitAddressProcess(
    geoCode,
    setCurrentLocation,
    setCurrentZoom,
    setAddress
  );

  const onRefreshStoreDataProcess = useCallback(
    (currentLocation: TCurrentLocation, updateStoreData: TUpdateStoreData) => {
      return async () => {
        if (currentLocation) {
          (await updateStoreData)(currentLocation.lat, currentLocation.lng);
        }
      };
    },
    []
  );
  const onRefreshStoreData = onRefreshStoreDataProcess(
    currentLocation,
    updateStoreData
  );

  const onToggleNoticeProcess = useCallback(
    (setToggleNotice: TSetToggleNotice) => {
      return (trigger: boolean) => {
        setToggleNotice(trigger);
      };
    },
    []
  );
  const onToggleNotice = onToggleNoticeProcess(setToggleNotice);

  return (
    <>
      <Container>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${isDev ? "" : GOOGLE_MAP_API}` }}
          center={currentLocation}
          zoom={currentZoom}
          onChange={onChangeMap}
          onZoomAnimationEnd={onZoomAnimationEnd}
          onClick={() => initEvent()}
          onDrag={() => setRefreshLoading(true)}
          onDragEnd={() => initEvent()}
        >
          {storeList &&
            currentZoom >= 13 &&
            // eslint-disable-next-line array-callback-return
            storeList.map((store: TStoreData) => {
              const remainStatus = convertRemainStatusBoolean(
                store.remain_stat
              );
              if (onlyAvailableStore) {
                if (remainStatus) {
                  return (
                    <Store
                      key={store.code}
                      lat={store.lat}
                      lng={store.lng}
                      currentZoom={currentZoom}
                      storeData={store}
                      currentHoverChecker={
                        store.code !== currentHoverStore ? false : true
                      }
                      currentClickChecker={
                        store.code !== currentClickStore ? false : true
                      }
                      onMouseOverStore={onMouseOverStore}
                      initEvent={initEvent}
                      onClickStore={onClickStore}
                    />
                  );
                }
              } else {
                return (
                  <Store
                    key={store.code}
                    lat={store.lat}
                    lng={store.lng}
                    currentZoom={currentZoom}
                    storeData={store}
                    currentHoverChecker={
                      store.code !== currentHoverStore ? false : true
                    }
                    currentClickChecker={
                      store.code !== currentClickStore ? false : true
                    }
                    onMouseOverStore={onMouseOverStore}
                    initEvent={initEvent}
                    onClickStore={onClickStore}
                  />
                );
              }
            })}
        </GoogleMapReact>
        <UtilWrap>
          <AddressBar
            onSubmitAddress={onSubmitAddress}
            address={address}
            setAddress={setAddress}
          />
          <div className="util-button-wrap">
            {myLocation && (
              <MyLocationButton
                onMoveLocation={onMoveLocation}
                myLocation={myLocation}
              />
            )}
            {!myLocation && <MyLocationButton />}
            <RefreshButton
              onRefreshStoreData={onRefreshStoreData}
              spin={refreshLoading ? true : false}
            />
            <OnlyAvailableStoreButton
              onlyAvailableStore={onlyAvailableStore}
              setOnlyAvailableStore={setOnlyAvailableStore}
            />
            <div className="bubble-message">
              <span>NEW</span> 재고있는 약국만 보기
            </div>
          </div>
          <LocationStorage
            onMoveLocation={onMoveLocation}
            currentLocation={currentLocation}
          />
        </UtilWrap>
        <InformationWrap>
          <NoticeButton onToggleNotice={onToggleNotice} />
          <Information />
        </InformationWrap>
      </Container>
      {currentZoom < 13 && <Caution />}
      {toggleNotice && <Notice onToggleNotice={onToggleNotice} />}
    </>
  );
};

export default React.memo(Map);

import React, { useCallback, useState } from "react";
import GoogleMapReact, { ChangeEventValue } from "google-map-react";
import Store from "./Store";
import styled from "styled-components";
import Information from "./Information";
import Caution from "./Caution";
import MyLocationButton from "./MyLocationButton";
import AddressBar from "./AddressBar";
import RefreshButton from "./RefreshButton";
import NoticeButton from "./NoticeButton";
import Notice from "./Notice";
import LocationStorage from "./LocationStorage";
import { GOOGLE_MAP_API, isDev } from "../dotenv";
import { TStoreData, TInitEvent, TCurrentLocation } from "../types";
import { convertRemainStatusBoolean } from "../utils/convertRemainStatus";
import OnlyAvailableStoreButton from "./OnlyAvailableStoreButton";
import { color } from "../styles/colors";
import { useSelector, useDispatch } from "../hooks/useRedux";
import { useStoreData } from "../hooks/useStoreData";

const Map: React.FC = () => {
  const [currentHoverStore, setCurrentHoverStore] = useState<string>("");
  const [currentClickStore, setCurrentClickStore] = useState<string>("");
  const [bubbleMessageStatus, setBubbleMessageStatus] = useState<boolean>(true);
  const [noticeStatus, setNoticeStatus] = useState<boolean>(false);
  const [onlyAvailableStore, setOnlyAvailableStore] = useState<boolean>(false);
  const { currentLocation, currentZoom, myLocation } = useSelector();
  const dispatch = useDispatch();
  const {
    stores: storeList,
    updateStoreData,
    refreshLoading,
    setRefreshLoading,
  } = useStoreData();

  const initEventProcess = useCallback(() => {
    return (initHoverTrigger: boolean = true, initClickTrigger: boolean = true) => {
      const initialStoreCode: string = "-999999";
      if (initHoverTrigger) {
        setCurrentHoverStore(initialStoreCode);
      }
      if (initClickTrigger) {
        setCurrentClickStore(initialStoreCode);
      }
    };
  }, []);

  const initEvent: TInitEvent = initEventProcess();

  const onMouseOverStoreProcess = useCallback(
    (initEvent: TInitEvent, currentClickStore: string) => {
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

  const onMouseOverStore = onMouseOverStoreProcess(initEvent, currentClickStore);

  const onChangeMapProcess = useCallback(() => {
    return async (value: ChangeEventValue) => {
      dispatch({
        type: "UPDATE_CURRENT_LOCATION",
        payload: { lat: value.center.lat, lng: value.center.lng },
      });
      (await updateStoreData)(value.center.lat, value.center.lng);
    };
  }, [dispatch, updateStoreData]);
  const onChangeMap = onChangeMapProcess();

  const onZoomAnimationEndProcess = useCallback(() => {
    return (zoom: number) => {
      dispatch({ type: "UPDATE_CURRENT_ZOOM", payload: zoom });
    };
  }, [dispatch]);
  const onZoomAnimationEnd = onZoomAnimationEndProcess();

  const onClickStoreProcess = useCallback(
    (currentZoom: number, currentClickStore: string) => {
      return (lat: number, lng: number, code: string) => {
        initEvent();
        dispatch({ type: "UPDATE_CURRENT_LOCATION", payload: { lat, lng } });
        if (currentClickStore === code) {
          setCurrentClickStore("-999999");
        } else {
          setCurrentClickStore(code);
        }
        if (currentZoom <= 16) {
          dispatch({ type: "UPDATE_CURRENT_ZOOM", payload: 16 });
        }
      };
    },
    [dispatch, initEvent]
  );

  const onClickStore = onClickStoreProcess(currentZoom, currentClickStore);

  const onMoveLocationProcess = useCallback(() => {
    return (lat: number, lng: number) => {
      initEvent();
      dispatch({ type: "UPDATE_CURRENT_LOCATION", payload: { lat, lng } });
      dispatch({ type: "UPDATE_CURRENT_ZOOM", payload: 16 });
    };
  }, [dispatch, initEvent]);
  const onMoveLocation = onMoveLocationProcess();

  const onRefreshStoreDataProcess = useCallback(
    (currentLocation: TCurrentLocation) => {
      return async () => {
        if (currentLocation) {
          (await updateStoreData)(currentLocation.lat, currentLocation.lng);
        }
      };
    },
    [updateStoreData]
  );
  const onRefreshStoreData = onRefreshStoreDataProcess(currentLocation);

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
              const remainStatus = convertRemainStatusBoolean(store.remain_stat);
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
                    currentHoverChecker={store.code !== currentHoverStore ? false : true}
                    currentClickChecker={store.code !== currentClickStore ? false : true}
                    onMouseOverStore={onMouseOverStore}
                    initEvent={initEvent}
                    onClickStore={onClickStore}
                  />
                );
              }
            })}
        </GoogleMapReact>
        <UtilWrap>
          <AddressBar />
          <div className="util-button-wrap">
            {myLocation && (
              <MyLocationButton onMoveLocation={onMoveLocation} myLocation={myLocation} />
            )}
            {!myLocation && <MyLocationButton />}
            <RefreshButton
              onRefreshStoreData={onRefreshStoreData}
              spin={refreshLoading ? true : false}
            />
            <OnlyAvailableStoreButton
              onlyAvailableStore={onlyAvailableStore}
              setOnlyAvailableStore={setOnlyAvailableStore}
              setBubbleMessageStatus={setBubbleMessageStatus}
            />
            {bubbleMessageStatus && (
              <div
                className="bubble-message"
                onClick={() => setBubbleMessageStatus(false)}
              >
                <span>NEW</span> 재고있는 약국만 보기
              </div>
            )}
          </div>
          <LocationStorage
            onMoveLocation={onMoveLocation}
            currentLocation={currentLocation}
          />
        </UtilWrap>
        <InformationWrap>
          <NoticeButton onToggleNotice={setNoticeStatus} />
          <Information />
        </InformationWrap>
      </Container>
      {currentZoom < 13 && <Caution />}
      {noticeStatus && <Notice onToggleNotice={setNoticeStatus} />}
    </>
  );
};

export default React.memo(Map);

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
      cursor: pointer;
      @media (max-width: 1023px) {
        top: 16px;
        right: -55px;
        height: 25px;
        font-size: 10px;
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

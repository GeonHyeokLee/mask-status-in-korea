// reducer
export type TStoreData = {
  addr: string;
  code: string;
  stock_at: string;
  created_at: string;
  remain_stat: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
}
export type TStoreListData = TStoreData[] | undefined;
export type TRefreshLoading = boolean;
export type TCurrentLocation = {
  lat: number;
  lng: number;
} | undefined;
export type TMyLocation = {
  lat: number;
  lng: number;
} | undefined;
export type TCurrentZoom = number;

// utils
export type TGeoCode = (address: string) => Promise<{
  address: any;
  lat: any;
  lng: any;
}>
export type TReverseGeoCode = (lat: number, lng: number) => Promise<{
  address: any;
}>

export type TGetLocationData = () => TLocationData | undefined
export type TPostLocationData = (locationData: TLocationData) => void


// App.tsx
export type TSuccessGetCurrentPositionCallbackData = {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export type TUpdateStoreData = Promise<(lat: number, lng: number) => Promise<void>>;

// Map.tsx
export type TInitEvent = (initHoverTrigger?: boolean, initClickTrigger?: boolean) => void
export type TOnRefreshStoreData = () => Promise<void>
export type TOnMouseOverStore = (code: string) => void;
export type TOnClickStore = (lat: number, lng: number, code: string) => void;
export type TOnSubmitAddress = (address: string) => Promise<void>
export type TOnMoveLocation = (lat: number, lng: number) => void;

// Store.tsx
export type TStoreComponentProps = {
  lat: number;
  lng: number;
  currentZoom: number;
  storeData: TStoreData;
  currentHoverChecker: boolean;
  currentClickChecker: boolean;
  onMouseOverStore: TOnMouseOverStore;
  onClickStore: TOnClickStore;
  initEvent: TInitEvent;
};

// AddressBar.tsx
export type TAddress = string;
export type TSetAddress = React.Dispatch<React.SetStateAction<string>>;

// RefreshButton.tsx
export type TRefreshButtonComponentProps = {
  onRefreshStoreData: TOnRefreshStoreData
  spin: boolean
}

// LocationStorage.tsx
export type TLocationStorageComponentProps = {
  onMoveLocation: TOnMoveLocation;
  currentLocation: TCurrentLocation;
};
export type TLocationData = {
  lat: number;
  lng: number;
}[]
export type TSetLocationData = React.Dispatch<React.SetStateAction<TLocationData>>;

// MyLocationButton.tsx
export type TMyLocationButtonComponentProps = {
  onMoveLocation?: TOnMoveLocation;
  myLocation?: TMyLocation;
};

// Notice.tsx
export type TNoticeComponentProps = {
  onToggleNotice: React.Dispatch<React.SetStateAction<boolean>>;
};

// NoticeButton.tsx
export type TNoticeButtonComponentProps = {
  onToggleNotice: React.Dispatch<React.SetStateAction<boolean>>;
};

// Loading.tsx
export type TLoadingComponentProps = {
  noneBackground?: boolean
}



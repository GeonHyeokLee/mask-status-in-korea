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
export type TMapLoading = boolean;
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
export type TCurrentHoverStore = string;
export type TCurrentClickStore = string;
export type TAddress = string;
export type TToggleNotice = boolean;
export type TOnlyAvailableStore = boolean;

export type TSetCurrentHoverStore = React.Dispatch<
  React.SetStateAction<TCurrentHoverStore>
>;
export type TSetCurrentClickStore = React.Dispatch<
  React.SetStateAction<TCurrentClickStore>
>;
export type TSetAddress = React.Dispatch<React.SetStateAction<TAddress>>
export type TSetToggleNotice = React.Dispatch<React.SetStateAction<TToggleNotice>>
export type TSetOnlyAvailableStore = React.Dispatch<React.SetStateAction<TOnlyAvailableStore>>

export type TInitEvent = (initHoverTrigger?: boolean, initClickTrigger?: boolean) => void
export type TOnRefreshStoreData = () => Promise<void>
export type TOnMouseOverStore = (code: string) => void;
export type TOnClickStore = (lat: number, lng: number, code: string) => void;
export type TOnSubmitAddress = (address: string) => Promise<void>
export type TOnMoveLocation = (lat: number, lng: number) => void;
export type TOnToggleNotice = (trigger: boolean) => void

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

// RefreshButton.tsx
export type TRefreshButtonComponentProps = {
  onRefreshStoreData: TOnRefreshStoreData
  spin: boolean
}

// AddressBar.tsx
export type TAddressBarComponentProps = {
  onSubmitAddress: TOnSubmitAddress;
  setAddress: TSetAddress;
  address: TAddress;
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
  onToggleNotice: TOnToggleNotice;
};

// NoticeButton.tsx
export type TNoticeButtonComponentProps = {
  onToggleNotice: TOnToggleNotice;
};

// OnlyAvailableStoreButton.tsx
export type TOnlyAvailableStoreButtonComponentProps = {
  onlyAvailableStore: TOnlyAvailableStore;
  setOnlyAvailableStore: TSetOnlyAvailableStore;
};

// Loading.tsx
export type TLoadingComponentProps = {
  noneBackground?: boolean
}



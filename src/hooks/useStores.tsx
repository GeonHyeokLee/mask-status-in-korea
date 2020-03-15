import { useState, useCallback, useEffect } from "react";

type TStore = {
  addr: string;
  code: string;
  created_at: string;
  lat: number;
  lng: number;
  name: string;
  remain_stat: string;
  stock_at: string;
  type: string;
};

type TUseStores = [
  ({ variables: { lat, lng } }: TMutationArguments) => Promise<void>,
  {
    data?: TStore[];
    loading: boolean;
    error: any;
    refetch: ({ variables: { lat, lng } }: TMutationArguments) => Promise<void>;
  }
];

type TMutationArguments = {
  variables: {
    lat: number;
    lng: number;
  };
  onCompleted?: (data: TStore[]) => void;
};

export function useStores(): TUseStores {
  const [data, setData] = useState<TStore[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const RADIUS: number = 2000;

  const mutation = useCallback(
    async ({ variables: { lat, lng }, onCompleted }: TMutationArguments) => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetch(
          `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${lat}&lng=${lng}&m=${RADIUS}`
        );
        const resultToJson = await result.json();
        setData(resultToJson.stores);

        setTimeout(() => {
          setLoading(false);
        }, 1000);

        if (onCompleted && data) {
          onCompleted(data);
        }
      } catch (error) {
        setError(error);
      }
    },
    []
  );

  return [
    mutation,
    {
      data,
      loading,
      error,
      refetch: mutation
    }
  ];
}

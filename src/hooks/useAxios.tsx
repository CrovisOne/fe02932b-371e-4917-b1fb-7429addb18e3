import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

export interface UseAxiosProps {
  url: string;
  method: "get" | "put" | "post" | "delete";
  params?: AxiosRequestConfig;
}

/**
 * Simple Axios hook
 *
 * Source: https://danilorivera95.medium.com/creating-a-custom-hook-to-make-requests-using-react-axios-typescript-ca591c6c25fc
 *
 * @param url
 * @param params
 */
export function useAxios<T>({ url, method, params }: UseAxiosProps) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callAxios = async () => {
    try {
      setLoading(true);
      setError(null);

      const response: AxiosResponse<T> = await axios({ url, method, params });
      setData(response.data);
    } catch (error) {
      setError("Could not fetch data, sorry :(");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, callAxios };
}

import axiosInstance from "@/api/axiosInstance";
import { UseApiParams } from "@/types/ApiTypes";
import { useCallback, useEffect, useRef, useState } from "react";

export const useApi = ({ url, method, body, headers }: UseApiParams) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const isMounted = useRef(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        url,
        headers,
        ...(method === "POST" || method === "PUT" ? { data: body } : {}),
      };

      const response = await axiosInstance(config);
      if (isMounted.current) {
        setData(response.data);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [url, method, JSON.stringify(body), JSON.stringify(headers)]);

  useEffect(() => {
    isMounted.current = true;
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [fetchData]);

  const refetch = () => {
    if (isMounted.current) {
      fetchData();
    }
  };

  return { data, loading, error, refetch };
};

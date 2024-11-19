import { useState, useEffect } from "react";

const CACHE_KEY = "apiCache";
const CACHE_EXPIRY = 10000; // 10 seconds in milliseconds

export function useCachedApi(apiUrl) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if cached data exists
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data: cachedResponse, timestamp } = JSON.parse(cachedData);

          // Check if cache is still valid
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setData(cachedResponse);
            setLoading(false);
            return;
          }
        }

        // Fetch new data from the API
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const jsonResponse = await response.json();

        // Cache the new response
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: jsonResponse,
            timestamp: Date.now(),
          })
        );

        setData(jsonResponse);
      } catch (err) {
        setError(err.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { data, error, loading };
}
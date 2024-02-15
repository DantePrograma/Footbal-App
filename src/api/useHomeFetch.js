import { useState } from "react";
import { useEffect } from "react";

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL =
    "https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=";
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.result);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};

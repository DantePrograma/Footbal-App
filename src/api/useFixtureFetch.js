import { useEffect, useState } from "react";

export const useFixtureApi = (today, league) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL =
    "https://apiv2.allsportsapi.com/football/?met=Fixtures&leagueId=";
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}${league}&APIkey=${API_KEY}&from=${today}&to=${today}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.result);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => setLoading(false));
  }, [today, league]);

  return { data, loading };
};

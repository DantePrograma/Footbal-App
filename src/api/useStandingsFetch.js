import { useEffect, useState } from "react";

export const useStandingsFetch = (currentLeague) => {
  const [standings, setStandings] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL =
    "https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=";
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}${currentLeague}&APIkey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStandings(data.result.total);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => setLoading(false));
  }, [currentLeague]);

  return { standings, loading };
};

import { useEffect, useState } from "react";

export const UseStandingApi = (leagueId, key, onClick) => {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch(
      `https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=${leagueId}&APIkey=${key}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return data;
};

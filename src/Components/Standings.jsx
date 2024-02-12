import { useEffect, useState } from "react";
import "./Standings.css";

export const Standings = () => {
  const [standings, setStandings] = useState(null);

  useEffect(() => {
    const API_KEY =
      "5036c89ee9dfd665bf762adab0cb43df9edb8b296710535fc1c81cdcf66b29cc";
    fetch(
      `https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=208&APIkey=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStandings(data);
      })
      .catch((error) => console.log("error", error));
  }, []);
};

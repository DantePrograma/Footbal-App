import { useState } from "react";
import { useEffect } from "react";
import "./Home.css";
import { Loader } from "./Loader";

export const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://apiv2.allsportsapi.com/football/?met=Livescore&APIkey=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="partidos-ahora-mismo-h1">
        games that are being played right now
      </h1>
      <div className="container">
        <ul>
          {loading ? (
            <Loader />
          ) : data ? (
            data.map((match, index) => {
              // Renderiza el nombre de la liga solo cuando cambia
              if (
                index === 0 ||
                match.league_name !== data[index - 1].league_name
              ) {
                return (
                  <li key={match.away_team_key}>
                    <div className="liga-name-img">
                      <h1>{match.league_name}</h1>
                      <img src={match.league_logo} alt="liga imagen" />
                    </div>
                    {data
                      .filter((m) => m.league_name === match.league_name) // Filtra los partidos por liga
                      .map((filteredMatch) => (
                        <section
                          className="equipos"
                          key={filteredMatch.event_key}
                        >
                          <article className="teams">
                            <div className="team-img-name">
                              <img
                                src={filteredMatch.home_team_logo}
                                alt="team 2 imagen"
                              />
                              <p>{filteredMatch.event_home_team}</p>
                            </div>
                          </article>
                          <article className="score">
                            <div className="score-container">
                              <h1>{filteredMatch.event_final_result}</h1>
                            </div>
                            <p>{filteredMatch.event_status}'</p>
                          </article>
                          <article className="teams">
                            <div className="team-img-name">
                              <img
                                src={filteredMatch.away_team_logo}
                                alt="team 1 imagen"
                              />
                              <p>{filteredMatch.event_away_team}</p>
                            </div>
                          </article>
                        </section>
                      ))}
                  </li>
                );
              }
            })
          ) : null}
        </ul>
      </div>
    </>
  );
};

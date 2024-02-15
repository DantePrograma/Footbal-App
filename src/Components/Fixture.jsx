import { useState } from "react";
import { useFixtureApi } from "../api/useFixtureFetch";
import { Loader } from "./Loader";

export const Fixture = () => {
  const [currentLeague, setCurrentLeague] = useState("44");

  const fechaActual = new Date();

  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();

  const fechaFormateada = `${año}-${mes < 10 ? "0" + mes : mes}-${
    dia < 10 ? "0" + dia : dia
  }`;

  const { data, loading } = useFixtureApi(fechaFormateada, currentLeague);

  return (
    <section className="standings-section">
      <nav className="standigs-nav">
        <button
          onClick={() => {
            setCurrentLeague("207");
          }}
        >
          Serie a
        </button>
        <button
          onClick={() => {
            setCurrentLeague("152");
          }}
        >
          Premier League
        </button>
        <button
          onClick={() => {
            setCurrentLeague("302");
          }}
        >
          La Liga
        </button>
        <button
          onClick={() => {
            setCurrentLeague("99");
          }}
        >
          Brasileirao
        </button>
        <button
          onClick={() => {
            setCurrentLeague("175");
          }}
        >
          Bundesliga
        </button>
        <button
          onClick={() => {
            setCurrentLeague("168");
          }}
        >
          Ligue 1
        </button>
        <button
          onClick={() => {
            setCurrentLeague("266");
          }}
        >
          Primeira Liga
        </button>
        <button
          onClick={() => {
            setCurrentLeague("244");
          }}
        >
          Eredivisie
        </button>
        <button
          onClick={() => {
            setCurrentLeague("63");
          }}
        >
          Belgian Pro League
        </button>
        <button
          onClick={() => {
            setCurrentLeague("44");
          }}
        >
          Primera Division Arg
        </button>
        <button
          onClick={() => {
            setCurrentLeague("332");
          }}
        >
          MLS
        </button>
      </nav>

      <div className="fixture-container">
        <ul>
          {loading ? (
            <Loader />
          ) : data ? (
            data.map((fixture, index) => {
              // Renderiza el nombre de la liga solo cuando cambia
              if (
                index === 0 ||
                fixture.league_name !== data[index - 1].league_name
              ) {
                return (
                  <li key={fixture.event_key}>
                    <h1>{fixture.league_name}</h1>

                    {data.map((match) => {
                      return (
                        <section className="equipos" key={match.away_team_key}>
                          <article className="teams">
                            <div className="team-img-name">
                              <img
                                src={match.home_team_logo}
                                alt="team 2 imagen"
                                loading="lazy"
                              />
                              <p>{match.event_home_team}</p>
                            </div>
                          </article>
                          <article className="score">
                            <div className="score-container">
                              <h1>{match.event_final_result}</h1>
                            </div>
                            <p>{match.event_status}'</p>
                          </article>
                          <article className="teams">
                            <div className="team-img-name">
                              <img
                                src={match.away_team_logo}
                                alt="team 1 imagen"
                                loading="lazy"
                              />
                              <p>{match.event_away_team}</p>
                            </div>
                          </article>
                        </section>
                      );
                    })}
                  </li>
                );
              }
            })
          ) : (
            <h1>No hay partidos este dia</h1>
          )}
        </ul>
      </div>
    </section>
  );
};

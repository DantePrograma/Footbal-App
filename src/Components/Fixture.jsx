import { useState } from "react";
import { useFixtureApi } from "../api/useFixtureFetch";
import { Loader } from "./Loader";
import "./Fixture.css";

export const Fixture = () => {
  const [currentLeague, setCurrentLeague] = useState("44");

  const fechaActual = new Date();

  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth() + 1;
  const dia = fechaActual.getDate();

  const fechaFormateada = `${año}-${mes < 10 ? "0" + mes : mes}-${
    dia < 10 ? "0" + dia : dia
  }`;

  const tomorrow = `${año}-${mes < 10 ? "0" + mes : mes}-${
    dia < 10 ? "0" + dia : dia + 1
  }`;

  const yesterday = `${año}-${mes < 10 ? "0" + mes : mes}-${
    dia < 10 ? "0" + dia : dia - 1
  }`;

  const [day, setDay] = useState(fechaFormateada);

  const { data, loading } = useFixtureApi(day, currentLeague);

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
        <div className="set-day-container">
          {day == fechaFormateada ? (
            <div className="set-day">
              <button
                onClick={() => {
                  setDay(yesterday);
                }}
              >
                <p>←</p>
                <p>ayer</p>
              </button>
              <h1>PARTIDOS HOY</h1>
              <button
                onClick={() => {
                  setDay(tomorrow);
                }}
              >
                <p>→</p>
                <p>mañana</p>
              </button>
            </div>
          ) : (
            <div className="set-day">
              {day == yesterday ? (
                <>
                  <span></span>
                  <h1>PARTIDOS AYER</h1>
                  <button
                    onClick={() => {
                      setDay(fechaFormateada);
                    }}
                  >
                    <p>HOY</p>
                    <p>→</p>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setDay(fechaFormateada);
                    }}
                  >
                    <p>←</p>
                    <p>HOY</p>
                  </button>
                  <h1>PARTIDOS MAÑANA</h1>
                  <span></span>
                </>
              )}
            </div>
          )}
        </div>
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
                    <h1 className="fixture-league">{fixture.league_name}</h1>

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
                            <h1>{match.event_final_result}</h1>
                            {match.event_final_result == "-" ? (
                              <strong>
                                <p>TIME: {match.event_time}</p>
                              </strong>
                            ) : (
                              <p>{match.event_status}'</p>
                            )}
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
            <h1 className="no-games">
              {day == yesterday
                ? "There were not games yesterday."
                : "There are not games for this day."}
            </h1>
          )}
        </ul>
      </div>
    </section>
  );
};

import { useState } from "react";
import "./Standings.css";
import { Loader } from "./Loader";
import { useStandingsFetch } from "../api/useStandingsFetch";

export const Standings = () => {
  const [currentLeague, setCurrentLeague] = useState("44");
  const { standings, loading } = useStandingsFetch(currentLeague);

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

      <article className="stadings">
        <ul>
          {loading ? (
            <Loader />
          ) : standings ? (
            standings.map((standing, index) => {
              // Renderiza el nombre de la liga solo cuando cambia
              if (
                index === 0 ||
                standing.league_round !== standings[index - 1].league_round
              ) {
                return (
                  <li key={standing.league_round}>
                    <div className="round-name">
                      {standing.league_round == "" ? (
                        <h1>Tabla de posiciones</h1>
                      ) : (
                        <h1>{standing.league_round}</h1>
                      )}
                      <div className="statistics">
                        <p className="statistics-p">PJ</p>
                        <p className="statistics-p">G</p>
                        <p className="statistics-p">E</p>
                        <p className="statistics-p">P</p>
                        <p className="statistics-p">GF</p>
                        <p className="statistics-p">GC</p>
                        <p className="statistics-p">DG</p>
                        <p className="statistics-p">
                          <strong>Pts</strong>
                        </p>
                      </div>
                    </div>

                    {standings
                      .filter((m) => m.league_round === standing.league_round)
                      .map((filteredMatch) => {
                        return (
                          <div
                            key={filteredMatch.team_key}
                            className="standings-container"
                          >
                            <div className="name-logo-position-team">
                              <div className="name-team">
                                <strong>{filteredMatch.standing_place}</strong>
                              </div>
                              <div className="logo-standing">
                                <img
                                  src={filteredMatch.team_logo}
                                  alt="team logo"
                                  loading="lazy"
                                />
                              </div>
                              <div className="team-position">
                                <p>{filteredMatch.standing_team}</p>
                              </div>
                            </div>
                            <div className="team-statistics">
                              <p className="statistics-p">
                                {filteredMatch.standing_P}
                              </p>
                              <p className="statistics-p">
                                {filteredMatch.standing_W}
                              </p>
                              <p className="statistics-p">
                                {filteredMatch.standing_D}
                              </p>
                              <p className="statistics-p">
                                {filteredMatch.standing_L}
                              </p>
                              <p className="statistics-p">
                                {filteredMatch.standing_F}
                              </p>
                              <p className="statistics-p">
                                {filteredMatch.standing_A}
                              </p>
                              <p className="statistics-p">
                                {filteredMatch.standing_GD}
                              </p>
                              <p className="statistics-p">
                                <strong>{filteredMatch.standing_PTS}</strong>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </li>
                );
              }
            })
          ) : (
            <h1>no hay ligas</h1>
          )}
        </ul>
      </article>
    </section>
  );
};

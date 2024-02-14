import { useEffect, useState } from "react";
import "./Standings.css";
import { Loader } from "./Loader";

export const Standings = () => {
  const [currentLeague, setCurrentLeague] = useState("44");
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeCurrentLeague = (league) => {
    setCurrentLeague(league);
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=${currentLeague}&APIkey=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStandings(data.result.total);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, [currentLeague]);

  return (
    <section className="standings-section">
      <nav className="standigs-nav">
        <button
          onClick={() => {
            changeCurrentLeague("207");
          }}
        >
          Serie a
        </button>
        <button
          onClick={() => {
            changeCurrentLeague("152");
          }}
        >
          Premier League
        </button>
        <button
          onClick={() => {
            changeCurrentLeague("302");
          }}
        >
          La Liga
        </button>
        <button
          onClick={() => {
            changeCurrentLeague("99");
          }}
        >
          Brasileirao
        </button>
        <button
          onClick={() => {
            changeCurrentLeague("175");
          }}
        >
          Bundesliga
        </button>
        <button
          onClick={() => {
            changeCurrentLeague("168");
          }}
        >
          Ligue 1
        </button>
        <button
          onClick={() => {
            changeCurrentLeague("266");
          }}
        >
          Primeira Liga
        </button>
        <button
          onClick={() => {
            changeCurrentLeague("244");
          }}
        >
          Eredivisie
        </button>
        <button
          onClick={() => {
            changeCurrentLeague("63");
          }}
        >
          Belgian Pro League
        </button>
        <button
          onClick={() => {
            changeCurrentLeague("44");
          }}
        >
          Primera Division Arg
        </button>
        <button
          onClick={() => {
            changeCurrentLeague("332");
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

// (
//             standings.map((team) => {
//               return (
//                 <li key={team.team_key}>
//                   <div className="name-logo-position-team">
//                     <div className="name-team">
//                       <strong>{team.standing_place}</strong>
//                     </div>
//                     <div className="logo-standing">
//                       <img src={team.team_logo} alt="team logo" />
//                     </div>
//                     <div className="team-position">
//                       <p>{team.standing_team}</p>
//                     </div>
//                   </div>
//                   <div className="team-statistics">
//                     <p>{team.standing_P}</p>
//                     <p>{team.standing_W}</p>
//                     <p>{team.standing_D}</p>
//                     <p>{team.standing_L}</p>
//                     <p>{team.standing_PTS}</p>
//                     <p>{team.standing_F}</p>
//                     <p>{team.standing_A}</p>
//                     <p>{team.standing_GD}</p>
//                   </div>
//                 </li>
//               );
//             })
//           )
{
  /* <button
  onClick={() => {
    changeCurrentLeague("1189");
  }}
>
  Prim. B Arg
</button>; */
}

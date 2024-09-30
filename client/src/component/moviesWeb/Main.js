import { useState } from "react";

const Main = () => {
  const url = "http://localhost:3000";
  const [movies, setMovies] = useState([]);
  const [tv_series, setTv_series] = useState([]);
  const [tv_show, setTv_show] = useState([]);

  const fetchMovie = async () => {
    try {
      const response = await fetch(`${url}/movies?type=Movie`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  const fetchTvSeries = async () => {
    try {
      const response = await fetch(`${url}/movies?type=TV Series`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("TV Series Not Found");
      }

      const data = await response.json();
      setTv_series(data);
    } catch (error) {
      console.log("Error fetching TV Series:", error);
    }
  };

  const fetchTvShow = async () => {
    try {
      const response = await fetch(`${url}/movies?type=TV Show`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("TV Show Not Found");
      }

      const data = await response.json();
      setTv_show(data);
    } catch (error) {
      console.log("Error fetching TV Show:", error);
    }
  };

  return (
    <>
      <main className="main">
        <section>
          <button onClick={fetchMovie}>Movies</button>
          {movies?.map((Movie) => (
            <div key={Movie.id}>
              <h3>{Movie.title}</h3>
              <p>{Movie.genre}</p>
            </div>
          ))}
        </section>
        <section>
          <button onClick={fetchTvSeries}>Tv Series</button>
          {tv_series?.map((Tv_Series) => (
            <div key={Tv_Series.id}>
              <h3>{Tv_Series.title}</h3>
              <p>{Tv_Series.genre}</p>
            </div>
          ))}
        </section>
        <section>
          <button onClick={fetchTvShow}>Tv Show</button>
          {tv_show?.map((Tv_Show) => (
            <div key={Tv_Show.id}>
              <h3>{Tv_Show.title}</h3>
              <p>{Tv_Show.genre}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
};

export default Main;

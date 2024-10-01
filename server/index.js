const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// This get will search movies by title, release_date, genre and type
app.get("/search", async (req, res) => {
  try {
    const { title, release_date, genre, type } = req.query;
    const searchMovies = await pool.query(
      "SELECT * FROM entertainment WHERE title = $1 and release_date = $2 and genre = $3 and type = $4",
      [title, release_date, genre, type]
    );

    if (searchMovies.rows.length === 0) {
      return res.status(404).json({ message: "No Movies Found" });
    }
    res.status(200).json(searchMovies.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// This get will retrive movies by type
app.get("/movies", async (req, res) => {
  try {
    const { type } = req.query;
    const moviesResult = await pool.query(
      "SELECT * FROM entertainment WHERE type = $1",
      [type]
    );

    if (moviesResult.rows.length === 0) {
      return res.status(404).json({ message: "No Movies Found" });
    }

    res.status(200).json(moviesResult.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// This Post will insert new movies
app.post("/movies", async (req, res) => {
  try {
    const { title, release_date, genre, type } = req.body;
    const newMovie = await pool.query(
      "INSERT INTO entertainment (title, release_date, genre, type) VALUES($1, $2, $3, $4)",
      [title, release_date, genre, type]
    );

    if (newMovie.rows.length === 0) {
      return res.status(200).json({ message: "New movie added successfully" });
    }
    res.status(200).json({ newMovie });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// This put endpoint will update the existing movie
app.put("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, release_date, genre, type } = req.body;
    const updatedMovie = await pool.query(
      "UPDATE entertainment SET title = $1, release_date = $2, genre = $3, type = $4 WHERE id = $5",
      [title, release_date, genre, type, id]
    );

    if (updatedMovie.rowCount === 0) {
      return res.status(404).json({ message: "Movie not updated" });
    }
    res.status(200).json({ updatedMovie });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// This delete endpoint will delete movie from entertainment table by the id
app.delete("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMovie = await pool.query(
      "DELETE FROM entertainment WHERE id = $1",
      [id]
    );

    if (deleteMovie.rows.length === 0) {
      return res.status(404).json({ message: "Movie " });
    }
    res.status(200).json({ deleteMovie });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const client = path.join(__dirname, "..", "client");

app.use(express.static(path.join(client, "public")));

app.get("/", async (req, res) => {
  res.sendFile(path.join(client, "public", "index.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

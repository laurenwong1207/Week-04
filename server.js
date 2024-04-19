const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.static('public'));
app.use(express.json());

// Data storage file
const DATA_FILE = path.join(__dirname, 'db', 'movies.json');

// Helper function to read data from JSON file
// In your readData and writeData helper functions, add detailed logging:
function readData() {
    return new Promise((resolve, reject) => {
        fs.readFile(DATA_FILE, 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file from disk:", err);
                reject(err);
            } else {
                try {
                    resolve(JSON.parse(data));
                } catch (parseError) {
                    console.error("Error parsing JSON from data file:", parseError);
                    reject(parseError);
                }
            }
        });
    });
}

function writeData(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error("Error writing file to disk:", err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}
app.post('/api/movies/reorder', async (req, res) => {
    const newOrder = req.body;
    try {
        await writeData(newOrder); // Assuming writeData writes to the JSON file
        res.status(200).send('Movies reordered successfully');
    } catch (error) {
        res.status(500).send('Failed to reorder movies');
    }
});


// API Endpoints
// Read all movies
app.get('/api/movies', async (req, res) => {
    try {
        const movies = await readData();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Failed to read data' });
    }
});

// Create a movie
app.post('/api/movies', async (req, res) => {
    const newMovie = req.body;
    try {
        const movies = await readData();
        // Ensure we do not exceed 10 movies
        if (movies.length >= 10) {
            return res.status(400).send('You can only store up to 10 movies.');
        }
        movies.push(newMovie);
        await writeData(movies);
        res.status(201).send('Movie added');
    } catch (error) {
        res.status(500).send('Error adding movie');
    }
});

// Update a movie's rank or details
app.put('/api/movies/:id', async (req, res) => {
    const movieId = parseInt(req.params.id);
    const updatedMovie = req.body;
    try {
        const movies = await readData();
        const movieIndex = movies.findIndex(m => m.id === movieId);
        if (movieIndex === -1) {
            return res.status(404).send('Movie not found');
        }
        movies[movieIndex] = updatedMovie;
        await writeData(movies);
        res.status(200).send('Movie updated');
    } catch (error) {
        res.status(500).send('Error updating movie');
    }
});

// Delete a movie
app.delete('/api/movies/:id', async (req, res) => {
    const movieId = parseInt(req.params.id);
    try {
        const movies = await readData();
        const filteredMovies = movies.filter(m => m.id !== movieId);
        await writeData(filteredMovies);
        res.status(200).send('Movie deleted');
    } catch (error) {
        res.status(500).send('Error deleting movie');
    }
});

// Server start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
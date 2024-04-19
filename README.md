# Week 4 

## Overview
My Movies List is a web application that allows users to manage their list of top 10 favorite movies. Users can add, delete, and reorder movies as they see fit. The application is built using Node.js and Express for the backend, and plain HTML, CSS, and JavaScript for the frontend.

## Features
- **Add Movies**: Users can add movies up to a limit of 10.
- **Delete Movies**: Users can remove movies from their list.
- **Reorder Movies**: Users can reorder the list by moving movies up or down.
- **Persistent Storage**: Movies are stored persistently on the server, allowing the list to be maintained over time.

## Process
- **Backend**: Node.js, Express
- **Database**: Movies are stored in a JSON file (`movies.json`).
- **Frontend**: HTML, CSS, JavaScript (No frameworks used, just vanilla JavaScript)

## API Reference
Endpoints
1. **GET /api/movies**: Fetches all movies.
2. **POST /api/movies**: Adds a new movie.
3. **PUT /api/movies/:id**: Updates a movie's details.
4. **DELETE /api/movies/:id**: Deletes a movie.
5. **POST /api/movies/reorder**: Reorders the list of movies.

## Deployment
https://fortunate-oceanic-chasmosaurus.glitch.me

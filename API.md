# API Documentation for MyTop10Movies

# Endpoints

# 1 List All Movies
   Route:  /api/movies
   HTTP Method:  GET
   Query Parameters:  None
   Request Body:  None
   Response Format: 
  json
  [
    {
      "name": "Inception",
      "id": 1
    },
    {
      "name": "Interstellar",
      "id": 2
    }
  ]
  Description: Retrieves all movies from the server.
# 2 Add a Movie
    Route: /api/movies
    HTTP Method: POST
    Query Parameters: None
    Request Body Format:
    json
    {
        "name": "The Matrix",
        "id": 3
    }
    Response Format:
    json
    {
        "message": "Movie added"
    }
    Description: Adds a new movie to the list. Returns an error if attempting to store more than 10 movies.
# 3 Update a Movie
    Route: /api/movies/:id
    HTTP Method: PUT
    URL Parameters:
    id: The unique identifier of the movie to update.
    Request Body Format:
    json
    {
        "name": "The Matrix Reloaded",
        " id": 3
    }
    Response Format:
    json
    {
        "message": "Movie updated"
    }
    Description: Updates the details of a specific movie by ID. Allows changing the movie name and  id.
# 4 delete a Movie
    Route: /api/movies/:id
    HTTP Method: DELETE
    URL Parameters:
    id: The unique identifier of the movie to delete.
    Request Body: None
    Response Format:
    json
    {
        "message": "Movie deleted"
    }
    Description: Removes a movie from the list by ID.
# 5 Reorder Movies
    Route: /api/movies/reorder
    HTTP Method: POST
    Query Parameters: None
    Request Body Format:
    json
    [
    {
        "name": "Interstellar",
        " id": 1
    },
    {
        "name": "Inception",
        " id": 2
    }
    ]
    Response Format:
    json
    {
        "message": "Movies reordered successfully"
    }
    Description: Accepts a complete list of movies with updated orders and rewrites the order on the server.

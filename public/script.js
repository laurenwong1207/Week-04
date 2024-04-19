document.addEventListener('DOMContentLoaded', function() {
    fetchMovies();

    async function fetchMovies() {
        try {
            const response = await fetch('/api/movies');
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const movies = await response.json();
            displayMovies(movies);
        } catch (error) {
            console.error("Fetch error:", error.message);
        }
    }
    
    function displayMovies(movies) {
        const movieList = document.getElementById('movieList');
        movieList.innerHTML = ''; // Clear previous entries
    
        movies.forEach((movie, index) => {
            const card = document.createElement('div');
            card.className = 'movie-card';
            card.textContent = `${index + 1}: ${movie.name}`;
    
            const moveUpButton = createMoveButton('Up', movie.id);
            const moveDownButton = createMoveButton('Down', movie.id);
    
            // Disable move up for the first item and move down for the last item
            if (index === 0) moveUpButton.disabled = true;
            if (index === movies.length - 1) moveDownButton.disabled = true;
    
            card.appendChild(moveUpButton);
            card.appendChild(moveDownButton);
            card.appendChild(createDeleteButton(movie.id));
    
            movieList.appendChild(card);
        });
    }
    
    function createMoveButton(direction, id) {
        const button = document.createElement('button');
        button.textContent = `Move ${direction}`;
        button.onclick = function() {
            moveMovie(id, direction);
        };
        return button;
    }
    
    
    async function moveMovie(id, direction) {
        const response = await fetch('/api/movies');
        let movies = await response.json();
        const index = movies.findIndex(m => m.id === id);
    
        if (direction === 'Up' && index > 0) {
            // Swap only the names or ranks, not the whole object
            [movies[index].name, movies[index - 1].name] = [movies[index - 1].name, movies[index].name];
            // Optionally swap ranks if needed
            [movies[index].rank, movies[index - 1].rank] = [movies[index - 1].rank, movies[index].rank];
        } else if (direction === 'Down' && index < movies.length - 1) {
            [movies[index].name, movies[index + 1].name] = [movies[index + 1].name, movies[index].name];
            // Optionally swap ranks if needed
            [movies[index].rank, movies[index + 1].rank] = [movies[index + 1].rank, movies[index].rank];
        }
    
        // Update the server with the new order
        await fetch('/api/movies/reorder', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(movies)
        });
    
        fetchMovies(); // Refresh the list
    }
    
    
    
    window.addMovie = async () => {
        
        
        const movieName = document.getElementById('movieName').value;
        const response = await fetch('/api/movies');
        let movies = await response.json();
        const movie = { name: movieName, id: movies.length+1 }; // Ensuring unique ID
        try {
            const response = await fetch('/api/movies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movie)
            });
            if (!response.ok) {
                throw new Error('Failed to add movie');
            }
            await fetchMovies();
        } catch (error) {
            console.error("Post error:", error.message);
        }
    };

    function createDeleteButton(id) {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.style.marginTop = '10px';
        button.onclick = async () => {
            await fetch(`/api/movies/${id}`, {
                method: 'DELETE'
            });
            fetchMovies(); // Refresh the list after deletion
        };
        return button;
    }
});

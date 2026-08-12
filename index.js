document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('movieSearch');
    const moviesGrid = document.getElementById('moviesGrid');

    // 1. Local data array (Bypasses network completely)
    const localMoviesData = [
        { Title: "Batman Begins", Year: "2005", Poster: "https://media-amazon.com" },
        { Title: "The Dark Knight", Year: "2008", Poster: "https://media-amazon.com" },
        { Title: "The Dark Knight Rises", Year: "2012", Poster: "https://media-amazon.com" },
        { Title: "Inception", Year: "2010", Poster: "https://media-amazon.com" },
        { Title: "Interstellar", Year: "2014", Poster: "https://media-amazon.com" },
        { Title: "Avatar", Year: "2009", Poster: "https://media-amazon.com" },
        { Title: "The Avengers", Year: "2012", Poster: "https://media-amazon.com" },
        { Title: "Iron Man", Year: "2008", Poster: "https://media-amazon.com" }
    ];

    if (!searchInput || !moviesGrid) {
        console.error("Missing critical HTML elements!");
        return;
    }

    // 2. Event Listener for Typing
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim().toLowerCase();

        if (!query) {
            moviesGrid.innerHTML = '';
            return;
        }

        const filteredMovies = localMoviesData.filter(movie => 
            movie.Title.toLowerCase().includes(query)
        );

        renderMovieCards(filteredMovies);
    });

    // 3. Render HTML Cards
    function renderMovieCards(movies) {
        if (movies.length === 0) {
            moviesGrid.innerHTML = '<p style="color: #aaa; padding: 20px;">No matching movies found.</p>';
            return;
        }

        moviesGrid.innerHTML = movies.map(movie => {
            // Using a guaranteed fallback image if the primary link fails to load
            const fallback = "https://placehold.co";
            
            return `
                <div class="movie-card">
                    <img src="${movie.Poster}" alt="${movie.Title}" onerror="this.onerror=null; this.src='${fallback}';">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                </div>
            `;
        }).join('');
    }
});



function displayMovies(movies) {
    const moviesGrid = document.querySelector('.moviesGrid');
    moviesGrid.innerHTML = ''; // Clear previous results


    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title}">
        `;
        moviesGrid.appendChild(movieCard);
    });
}

async function fetchMovies() {
    const query = document.getElementById('movieSearch').value.trim();
    const apiUrl = `https://www.omdbapi.com/?apikey=dd2c9531&s=${query}`;

    const loadingSpinner = document.querySelector('.loading-state--spinner');
    loadingSpinner.style.display = 'block'; // Show spinner


    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Search) {
            displayMovies(data.Search); // Call the function with the movie data
        } else {
            console.error('No movies found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    loadingSpinner.style.display = 'none'; // Hide spinner
}

document.getElementById('movieSearch').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchMovies(); // Call the fetchMovies function when Enter is pressed
    }
});

// Also, don't forget to add the click event for the search button
document.querySelector('.search-wrapper').addEventListener('click', fetchMovies);




function displayMovies(movies) {
    const moviesGrid = document.querySelector('.moviesGrid');
    moviesGrid.innerHTML = ''; // Clear previous results

    // Check if there are movies to display
    if (movies.length === 0) {
        moviesGrid.innerHTML = '<p>No movies found.</p>'; // Optional: Display a message if no results
        return;
    }

    // Loop through the movies and create cards
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <h3>${movie.Title}</h3>
            <p><b>Year:</b> ${movie.Year}</p>
            <p><b>Poster:</b> <img src="${movie.Poster}" target="_blank">${movie.Poster}</a></p>
        `;
        moviesGrid.appendChild(movieCard);
    });
}


function searchMovies() {
    const query = movieSearchInput.value.trim();
    const moviesGrid = document.querySelector('.moviesGrid');
    const searchTermSpan = document.getElementById('search-term'); // Get the span for the search term

    // Clear previous results if the input is empty
    if (!query) {
        moviesGrid.innerHTML = ''; // Remove any existing movie cards if no input
        searchTermSpan.textContent = ''; // Clear the search term display
        return; // Exit the function early
    }

    // Update the search term display
    searchTermSpan.textContent = query; // Set the search term in the span

    // Assuming you have a function to fetch movies based on the query
    fetchMovies(query).then(movies => {
        displayMovies(movies);
    });
}



function searchMovies(searchTerm) {
    // Perform your search logic here

    // Update the search term display
    const searchTermSpan = document.getElementById('search-term');
    searchTermSpan.textContent = searchTerm; // Set the search term dynamically
}


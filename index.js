
function displayMovies(movies) {
    const moviesGrid = document.querySelector('.moviesGrid');
    moviesGrid.innerHTML = ''; 


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
    const movieSearchInput = document.getElementById('movieSearch');

    const urlParams = new URLSearchParams(window.location.search);
    const urlQuery = urlParams.get('search');

    const query = movieSearchInput.value.trim() || urlQuery;

    if (!query) return;

    // If the search came from the Home page, show it in the input
    if (!movieSearchInput.value && urlQuery) {
        movieSearchInput.value = urlQuery;
    }

    const searchTermSpan = document.getElementById('search-term');
    if (searchTermSpan) {
        searchTermSpan.textContent = query;
    }

    const loadingSpinner = document.querySelector('.loading-state--spinner');

    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
    }

    try {
        const apiUrl = `https://www.omdbapi.com/?apikey=dd2c9531&s=${query}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search.slice(0, 6));
        } else {
            alert('No results found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    }
}




document.getElementById('movieSearch').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchMovies(); 
    }
});


document.querySelector('.search-wrapper').addEventListener('click', fetchMovies);




function displayMovies(movies) {
    const moviesGrid = document.querySelector('.moviesGrid');
    moviesGrid.innerHTML = ''; 

    
    if (movies.length === 0) {
        moviesGrid.innerHTML = '<p>No movies found.</p>'; 
        return;
    }

    
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
    const movieSearchInput = document.getElementById('movieSearch');
const searchButton = document.querySelector('.search-wrapper');
const moviesGrid = document.querySelector('.moviesGrid');

movieSearchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        if (moviesGrid) {
            fetchMovies();
        } else {
            redirectToResults();
        }
    }
});

if (searchButton) {
    searchButton.addEventListener('click', fetchMovies);
}

if (moviesGrid) {
    fetchMovies();
}
}



function searchMovies(searchTerm) {
    
    const searchTermSpan = document.getElementById('search-term');
    searchTermSpan.textContent = searchTerm; 
}
























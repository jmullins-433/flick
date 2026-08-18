 
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

    const loadingSpinner = document.querySelector('.loading-state');

    if (!query) {
        if (loadingSpinner) {
            loadingSpinner.style.display = "none";
    }
        return;
    }
        
        

    if (!movieSearchInput.value && urlQuery) {
        movieSearchInput.value = urlQuery;
    }

    const searchTermSpan = document.getElementById('search-term');
    if (searchTermSpan) {
        searchTermSpan.textContent = query;
    }

    

    if (loadingSpinner) {
        loadingSpinner.style.display = 'flex';
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

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



















function redirectToResults() {
    
    const query = document.getElementById('movieSearch').value.trim();

    if (query) {
        window.location.href =
            `./film.html?search=${encodeURIComponent(query)}`;
    } else {
        alert('Please enter a search term.');
        }


}

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
















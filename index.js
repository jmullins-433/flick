
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
    const query = document.getElementById('movieSearch').value.trim();
    const apiUrl = `https://www.omdbapi.com/?apikey=dd2c9531&s=${query}`;

    const loadingSpinner = document.querySelector('.loading-state--spinner');
    loadingSpinner.style.display = 'block'; 

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Search) {
            
            const firstSixMovies = data.Search.slice(0, 6);
            displayMovies(firstSixMovies); // Call the function with the first 6 movie data
        } else {
            console.error('No movies found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    loadingSpinner.style.display = 'none'; 
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
    const query = movieSearchInput.value.trim();
    const moviesGrid = document.querySelector('.moviesGrid');
    const searchTermSpan = document.getElementById('search-term'); // Get the span for the search term

    
    if (!query) {
        moviesGrid.innerHTML = ''; 
        searchTermSpan.textContent = ''; 
        return; 
    }

  
    searchTermSpan.textContent = query; // Set the search term in the span

   
    fetchMovies(query).then(movies => {
        displayMovies(movies);
    });
}



function searchMovies(searchTerm) {
    
    const searchTermSpan = document.getElementById('search-term');
    searchTermSpan.textContent = searchTerm; // Set the search term dynamically
}






// API Configuration
const apiKey = 'YOUR_API_KEY'; // Replace 'YOUR_API_KEY' with your actual OMDb API key
const apiBaseUrl = 'https://www.omdbapi.com/';

// DOM Elements
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const movieContainer = document.getElementById('movieContainer');
const featuredContainer = document.getElementById('featuredContainer');

// Load a featured movie on page load
window.onload = () => {
    loadFeaturedMovie();
};

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        searchMovies(query);
    }
});

// Function to load a featured movie (e.g., "Guardians of the Galaxy Vol. 2")
function loadFeaturedMovie() {
    const movieTitle = 'Guardians of the Galaxy Vol. 2';
    fetchMovieDetails(movieTitle, featuredContainer);
}

// Function to search movies using the API
function searchMovies(query) {
    fetchMovieDetails(query, movieContainer);
}

// Function to fetch movie details from the OMDb API
function fetchMovieDetails(title, container) {
    fetch(`${apiBaseUrl}?apikey=${apiKey}&t=${encodeURIComponent(title)}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovie(data, container);
            } else {
                container.innerHTML = '<p>No movies found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            container.innerHTML = '<p>There was an error fetching data. Please try again later.</p>';
        });
}

// Function to display a movie in the container
function displayMovie(movie, container) {
    container.innerHTML = ''; // Clear previous results

    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Rated:</strong> ${movie.Rated}</p>
        <p><strong>Released:</strong> ${movie.Released}</p>
        <p><strong>Runtime:</strong> ${movie.Runtime}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Writer:</strong> ${movie.Writer}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Language:</strong> ${movie.Language}</p>
        <p><strong>Country:</strong> ${movie.Country}</p>
        <p><strong>Awards:</strong> ${movie.Awards}</p>
        <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
        <p><strong>Box Office:</strong> ${movie.BoxOffice}</p>
        <p><strong>Ratings:</strong> ${movie.Ratings.map(rating => `<br>${rating.Source}: ${rating.Value}`).join('')}</p>
    `;
    container.appendChild(movieCard);
}

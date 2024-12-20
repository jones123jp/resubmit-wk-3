document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const movieList = document.getElementById("movie-list");
    const moviePoster = document.getElementById("movie-poster");
    const movieTitle = document.getElementById("movie-title");
    const movieDescription = document.getElementById("movie-description");
    const movieShowtime = document.getElementById("movie-showtime");
    const movieRuntime = document.getElementById("movie-runtime");
    const ticketsAvailable = document.getElementById("tickets-available");
    const purchaseButton = document.getElementById("purchase-ticket");
    const movieDetails = document.getElementById("movie-details");
  
    let currentMovie = null;
  
    // Fetch movie data from db.json
    function fetchMovies() {
      fetch("db.json") 
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          renderMovieList(data.films);
        })
        .catch((error) => {
          console.error("unable to fetch:", error);
          alert("Failed to load movie data.");
        });
    }
  
    // Render the list of movies
    function renderMovieList(movies) {
      movieList.innerHTML = ""; // Clear existing list
      movies.forEach((movie) => {
        const listItem = document.createElement("li");
        listItem.textContent = movie.title;
        listItem.style.cursor = "pointer";
        listItem.addEventListener("click", () => showMovieDetails(movie));
        movieList.appendChild(listItem);
      });
    }
  
    // Display movie details when a movie is clicked
    function showMovieDetails(movie) {
      currentMovie = movie;
  
      moviePoster.src = movie.poster;
      moviePoster.alt = movie.title;
      movieTitle.textContent = movie.title;
      movieDescription.textContent = movie.description;
      movieShowtime.textContent = movie.showtime;
      movieRuntime.textContent = `${movie.runtime} mins`;
  
      updateTicketsAvailable(movie);
      movieDetails.style.display = "block"; // Show details section
    }
  
    // Update tickets available dynamically
    function updateTicketsAvailable(movie) {
      const availableTickets = movie.capacity - movie.tickets_sold;
      ticketsAvailable.textContent = availableTickets > 0 ? availableTickets : "Sold Out";
      purchaseButton.disabled = availableTickets <= 0; // Disable button if sold out
    }
  
    // Handle ticket purchase button click
    purchaseButton.addEventListener("click", () => {
      if (!currentMovie) return;
  
      const availableTickets = currentMovie.capacity - currentMovie.tickets_sold;
  
      if (availableTickets > 0) {
        currentMovie.tickets_sold++;
        updateTicketsAvailable(currentMovie);
        alert("Ticket purchased successfully!");
      } else {
        alert("Tickets are sold out!");
      }
    });
  
    fetchMovies();
  });
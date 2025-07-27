const objOption = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTM3NTM1YTkwNzk5YWQzNGUzYzI1MWRkZDAyODVkNSIsIm5iZiI6MTc0MTM1NjEwNS4wMDgsInN1YiI6IjY3Y2FmYzQ5NTQ3ODNjYWFhM2FmZjI4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TRKDbK0_ae0jY-ZYpujQnuIvG90lefKw8fFul9qWdJM",
  },
};

const listGenre = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// Global variables untuk menyimpan data movies dan filter
let allMovies = [];
let currentSearchTerm = '';
let currentGenreFilter = '';

/**
 * Creates a movie card element
 * @param {Object} movie - Movie data
 * @returns {HTMLElement} The movie card DOM element
 */
const createMovieCard = (movie) => {
  const { genre_ids, original_title, poster_path } = movie;

  // Create movie card container
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  // Create poster container
  const poster = document.createElement("div");
  poster.classList.add("poster");

  // Create and set up movie poster image
  const image = document.createElement("img");
  image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  image.alt = `${original_title} movie poster`;
  image.onerror = () => {
    image.src = '/asset/images/placeholder-movie.jpg'; // Fallback image
  };

  // Create action buttons container
  const actions = document.createElement("div");
  actions.classList.add("actions");

  // Create details button
  const detailsBtn = document.createElement("a");
  detailsBtn.href = "/index/detail.html";
  detailsBtn.classList.add("button", "button-outline");
  detailsBtn.textContent = "Details";

  // Create buy ticket button
  const buyBtn = document.createElement("a");
  buyBtn.href = "/pages/order/order-page.html";
  buyBtn.classList.add("button", "button-primary");
  buyBtn.textContent = "Buy Ticket";

  // Create movie title
  const title = document.createElement("h3");
  title.textContent = original_title;

  // Create tags container
  const tags = document.createElement("div");
  tags.classList.add("tags");

  // Assemble the movie card
  actions.appendChild(detailsBtn);
  actions.appendChild(buyBtn);

  poster.appendChild(image);
  poster.appendChild(actions);

  movieCard.appendChild(poster);
  movieCard.appendChild(title);
  movieCard.appendChild(tags);

  // Add genre tags (limit to 3)
  const matchingGenres = genre_ids
    .filter((id) => id in listGenre)
    .map((id) => listGenre[id]);

  matchingGenres.slice(0, 3).forEach((genreName) => {
    const genre = document.createElement("span");
    genre.classList.add("tag");
    genre.textContent = genreName;
    tags.appendChild(genre);
  });

  return movieCard;
};

/**
 * Filter movies based on search term and genre
 * @param {Array} movies - Array of movie objects
 * @param {string} searchTerm - Search term for movie title
 * @param {string} genreFilter - Selected genre filter
 * @returns {Array} Filtered movies
 */
const filterMovies = (movies, searchTerm = '', genreFilter = '') => {
  return movies.filter(movie => {
    // Check if movie title matches search term
    const titleMatch = movie.original_title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    // Check if movie has the selected genre
    let genreMatch = true;
    if (genreFilter && genreFilter !== 'All') {
      // Find genre ID by name
      const genreId = Object.keys(listGenre).find(
        id => listGenre[id].toLowerCase() === genreFilter.toLowerCase()
      );
      genreMatch = genreId ? movie.genre_ids.includes(parseInt(genreId)) : true;
    }
    
    return titleMatch && genreMatch;
  });
};

/**
 * Render movies to the grid
 * @param {Array} movies - Array of movie objects to display
 */
const renderMovies = (movies) => {
  const movieGridElement = document.querySelector(".movie-grid");
  
  // Clear existing content
  movieGridElement.innerHTML = "";
  
  if (movies.length === 0) {
    // Show no results message
    const noResults = document.createElement("div");
    noResults.style.cssText = `
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px 20px;
      color: var(--text-gray);
      font-size: 18px;
    `;
    noResults.textContent = "No movies found. Try adjusting your search or filter.";
    movieGridElement.appendChild(noResults);
    return;
  }
  
  // Add movie cards to the grid
  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    movieGridElement.appendChild(movieCard);
  });
};

/**
 * Apply current filters and update display
 */
const applyFilters = () => {
  const filteredMovies = filterMovies(allMovies, currentSearchTerm, currentGenreFilter);
  renderMovies(filteredMovies);
};

/**
 * Initialize search functionality
 */
const initializeSearch = () => {
  const searchInput = document.querySelector('.search-input');
  
  if (searchInput) {
    // Add debounce to prevent too many API calls
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentSearchTerm = e.target.value.trim();
        applyFilters();
      }, 300); // 300ms delay
    });
    
    // Handle Enter key
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        currentSearchTerm = e.target.value.trim();
        applyFilters();
      }
    });
  }
};

/**
 * Initialize genre filter functionality
 */
const initializeGenreFilter = () => {
  const filterTags = document.querySelectorAll('.filter-tag');
  
  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Remove active class from all tags
      filterTags.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tag
      tag.classList.add('active');
      
      // Update current genre filter
      currentGenreFilter = tag.textContent.trim();
      
      // If "Thriller" is selected, reset to show all since it's the default active
      if (currentGenreFilter === 'Thriller' && tag === filterTags[0]) {
        currentGenreFilter = '';
      }
      
      // Apply filters
      applyFilters();
    });
  });
};

/**
 * Fetch movie data from multiple pages for better variety
 */
const fetchMovieData = async () => {
  try {
    const pages = [1, 2, 3]; // Fetch from multiple pages
    const allMoviePromises = pages.map(page => 
      fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, objOption)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
    );
    
    const allResponses = await Promise.all(allMoviePromises);
    
    // Combine all movie results
    allMovies = allResponses.reduce((acc, response) => {
      return acc.concat(response.results);
    }, []);
    
    // Remove duplicates based on movie ID
    allMovies = allMovies.filter((movie, index, self) => 
      index === self.findIndex(m => m.id === movie.id)
    );
    
    console.log(`Loaded ${allMovies.length} movies`);
    
    // Initial render
    renderMovies(allMovies);
    
  } catch (err) {
    console.error("Error fetching movie data:", err);
    
    // Show error message
    const movieGridElement = document.querySelector(".movie-grid");
    movieGridElement.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-gray);">
        <p>Sorry, there was an error loading movies.</p>
        <p style="font-size: 14px; margin-top: 10px;">Please check your internet connection and try again.</p>
      </div>
    `;
  }
};

/**
 * Initialize mobile menu functionality
 */
const initializeMobileMenu = () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');
  
  if (hamburgerMenu && mobileMenu) {
    hamburgerMenu.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });
  }
  
  if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && 
        mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !hamburgerMenu.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });
};

/**
 * Show loading state
 */
const showLoading = () => {
  const movieGridElement = document.querySelector(".movie-grid");
  movieGridElement.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px;">
      <div style="display: inline-block; width: 40px; height: 40px; border: 3px solid var(--blue-primary); border-radius: 50%; border-top-color: transparent; animation: spin 1s ease-in-out infinite;"></div>
      <p style="margin-top: 15px; color: var(--text-gray);">Loading movies...</p>
    </div>
  `;
};

/**
 * Initialize the page
 */
const initializePage = async () => {
  // Show loading state
  showLoading();
  
  // Initialize all functionality
  await fetchMovieData();
  initializeSearch();
  initializeGenreFilter();
  initializeMobileMenu();
  
  console.log('Page initialized successfully');
};

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage);
} else {
  initializePage();
}

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
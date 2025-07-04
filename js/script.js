$(document).ready(function () {
  // Sample movie data
  const movies = [
    {
      title: "Pathaan",
      image: "https://via.placeholder.com/300x450?text=Pathaan",
      year: 2023,
      category: "bollywood",
      quality: "1080p",
      size: "2.5GB",
      downloadLink: "#"
    },
    {
      title: "Avatar: The Way of Water",
      image: "https://via.placeholder.com/300x450?text=Avatar+2",
      year: 2022,
      category: "hollywood",
      quality: "720p",
      size: "1.8GB",
      downloadLink: "#"
    },
    {
      title: "KGF Chapter 2",
      image: "https://via.placeholder.com/300x450?text=KGF+2",
      year: 2022,
      category: "south",
      quality: "1080p",
      size: "3.2GB",
      downloadLink: "#"
    },
    {
      title: "Carry on Jatta 3",
      image: "https://via.placeholder.com/300x450?text=Carry+on+Jatta+3",
      year: 2023,
      category: "punjabi",
      quality: "720p",
      size: "1.5GB",
      downloadLink: "#"
    },
    {
      title: "Drishyam 2",
      image: "https://via.placeholder.com/300x450?text=Drishyam+2",
      year: 2022,
      category: "bollywood",
      quality: "1080p",
      size: "2.7GB",
      downloadLink: "#"
    },
    {
      title: "John Wick 4",
      image: "https://via.placeholder.com/300x450?text=John+Wick+4",
      year: 2023,
      category: "hollywood",
      quality: "720p",
      size: "2.1GB",
      downloadLink: "#"
    },
    {
      title: "Pushpa: The Rise",
      image: "https://via.placeholder.com/300x450?text=Pushpa",
      year: 2021,
      category: "south",
      quality: "1080p",
      size: "3.0GB",
      downloadLink: "#"
    },
    {
      title: "Shadaa",
      image: "https://via.placeholder.com/300x450?text=Shadaa",
      year: 2019,
      category: "punjabi",
      quality: "720p",
      size: "1.2GB",
      downloadLink: "#"
    }
  ];

  // Display all movies initially
  displayMovies(movies);

  // Filter by category
  $(".filter-category").click(function (e) {
    e.preventDefault();
    const category = $(this).data("category");
    $("#categoryFilter").text("Filter by: " + $(this).text());

    let filteredMovies = movies;
    if (category !== "all") {
      filteredMovies = movies.filter(movie => movie.category === category);
    }

    // Apply year filter if already selected
    const yearFilter = $(".filter-year.active").data("year");
    if (yearFilter && yearFilter !== "all") {
      filteredMovies = filteredMovies.filter(movie => movie.year == yearFilter);
    }

    // Apply search if already entered
    const searchTerm = $("#searchInput").val().toLowerCase();
    if (searchTerm) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
      );
    }

    displayMovies(filteredMovies);
    $(this).addClass("active").siblings().removeClass("active");
  });

  // Filter by year
  $(".filter-year").click(function (e) {
    e.preventDefault();
    const year = $(this).data("year");
    $("#yearFilter").text("Sort by: " + $(this).text());

    let filteredMovies = movies;
    if (year !== "all") {
      filteredMovies = movies.filter(movie => movie.year == year);
    }

    // Apply category filter if already selected
    const categoryFilter = $(".filter-category.active").data("category");
    if (categoryFilter && categoryFilter !== "all") {
      filteredMovies = filteredMovies.filter(movie => movie.category === categoryFilter);
    }

    // Apply search if already entered
    const searchTerm = $("#searchInput").val().toLowerCase();
    if (searchTerm) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
      );
    }

    displayMovies(filteredMovies);
    $(this).addClass("active").siblings().removeClass("active");
  });

  // Search functionality
  $("#searchBtn").click(function () {
    const searchTerm = $("#searchInput").val().toLowerCase();

    let filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm)
    );

    // Apply category filter if selected
    const categoryFilter = $(".filter-category.active").data("category");
    if (categoryFilter && categoryFilter !== "all") {
      filteredMovies = filteredMovies.filter(movie => movie.category === categoryFilter);
    }

    // Apply year filter if selected
    const yearFilter = $(".filter-year.active").data("year");
    if (yearFilter && yearFilter !== "all") {
      filteredMovies = filteredMovies.filter(movie => movie.year == yearFilter);
    }

    displayMovies(filteredMovies);
  });

  // Function to display movies
  function displayMovies(moviesToDisplay) {
    const moviesContainer = $("#moviesContainer");
    moviesContainer.empty();

    if (moviesToDisplay.length === 0) {
      moviesContainer.html('<div class="col-12 text-center py-5"><h4>No movies found</h4></div>');
      return;
    }

    moviesToDisplay.forEach(movie => {
      const movieCard = `
                <div class="col-md-3 col-sm-6 mb-4">
                    <div class="card movie-card h-100">
                        <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <div class="mb-2">
                                <span class="badge bg-primary">${movie.year}</span>
                                <span class="badge bg-info text-dark">${movie.category.charAt(0).toUpperCase() + movie.category.slice(1)}</span>
                                <span class="badge bg-success">${movie.quality}</span>
                                <span class="badge bg-secondary">${movie.size}</span>
                            </div>
                            <a href="${movie.downloadLink}" class="btn btn-danger download-btn">
                                <i class="fas fa-download me-1"></i> Download
                            </a>
                        </div>
                    </div>
                </div>
            `;
      moviesContainer.append(movieCard);
    });
  }
});
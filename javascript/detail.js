// Detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all interactive elements
    initializeCinemaSelection();
    initializePagination();
    initializeBookingForm();
    initializeFilterButton();
    
    console.log('Detail page initialized');
});

/**
 * Initialize cinema card selection functionality
 */
function initializeCinemaSelection() {
    const cinemaCards = document.querySelectorAll('.cinema-card');
    
    cinemaCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            cinemaCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Visual feedback
            console.log('Cinema selected:', this.querySelector('img').alt);
        });
    });
}

/**
 * Initialize pagination functionality
 */
function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            pageButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you could load different cinema pages
            const pageNumber = this.textContent;
            console.log(`Loading page ${pageNumber}`);
            
            // Simulate loading new cinema data
            loadCinemaPage(pageNumber);
        });
    });
}

/**
 * Initialize booking form functionality
 */
function initializeBookingForm() {
    const dateInput = document.querySelector('input[type="date"]');
    const timeSelect = document.querySelector('.form-select');
    const locationSelect = document.querySelectorAll('.form-select')[1];
    
    // Date change handler
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            console.log('Date selected:', this.value);
            updateAvailableTimes(this.value);
        });
    }
    
    // Time change handler
    if (timeSelect) {
        timeSelect.addEventListener('change', function() {
            console.log('Time selected:', this.value);
            updateCinemaAvailability(this.value);
        });
    }
    
    // Location change handler
    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            console.log('Location selected:', this.value);
            updateCinemasByLocation(this.value);
        });
    }
}

/**
 * Initialize filter button functionality
 */
function initializeFilterButton() {
    const filterBtn = document.querySelector('.filter-btn');
    
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            const date = document.querySelector('input[type="date"]').value;
            const time = document.querySelector('.form-select').value;
            const location = document.querySelectorAll('.form-select')[1].value;
            
            console.log('Applying filters:', { date, time, location });
            
            // Show loading state
            this.textContent = 'Filtering...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                this.textContent = 'Filter';
                this.disabled = false;
                
                // Update cinema results
                updateCinemaResults({ date, time, location });
            }, 1000);
        });
    }
}

/**
 * Update available times based on selected date
 */
function updateAvailableTimes(selectedDate) {
    const timeSelect = document.querySelector('.form-select');
    
    // Clear current options
    timeSelect.innerHTML = '';
    
    // Sample time slots (you can make this dynamic based on date)
    const timeSlots = [
        '08:30 AM',
        '11:00 AM',
        '02:30 PM',
        '05:00 PM',
        '08:30 PM'
    ];
    
    // Add options
    timeSlots.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
    
    console.log(`Updated time slots for ${selectedDate}`);
}

/**
 * Update cinema availability based on selected time
 */
function updateCinemaAvailability(selectedTime) {
    const cinemaCards = document.querySelectorAll('.cinema-card');
    
    // Simulate some cinemas being unavailable for certain times
    cinemaCards.forEach((card, index) => {
        // Random availability simulation
        const isAvailable = Math.random() > 0.2; // 80% chance of being available
        
        if (isAvailable) {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
        } else {
            card.style.opacity = '0.5';
            card.style.pointerEvents = 'none';
        }
    });
    
    console.log(`Updated cinema availability for ${selectedTime}`);
}

/**
 * Update cinemas based on selected location
 */
function updateCinemasByLocation(selectedLocation) {
    const cinemaCount = document.querySelector('.cinema-count');
    
    // Simulate different cinema counts for different locations
    const locationCinemas = {
        'Purwokerto': 39,
        'Jakarta': 156,
        'Bandung': 87,
        'Surabaya': 94
    };
    
    const count = locationCinemas[selectedLocation] || 39;
    cinemaCount.textContent = `${count} Result`;
    
    console.log(`Updated cinemas for ${selectedLocation}: ${count} results`);
}

/**
 * Load different cinema page
 */
function loadCinemaPage(pageNumber) {
    const cinemaGrid = document.querySelector('.cinema-grid');
    
    // Show loading state
    cinemaGrid.style.opacity = '0.5';
    
    setTimeout(() => {
        // Simulate loading new cinema data
        console.log(`Loaded cinema page ${pageNumber}`);
        cinemaGrid.style.opacity = '1';
        
        // You could update the cinema grid here with new data
        updateCinemaGrid(pageNumber);
    }, 500);
}

/**
 * Update cinema grid for different pages
 */
function updateCinemaGrid(pageNumber) {
    const cinemaGrid = document.querySelector('.cinema-grid');
    const cinemaCards = cinemaGrid.querySelectorAll('.cinema-card');
    
    // Sample: just shuffle the existing cards for demonstration
    const cardArray = Array.from(cinemaCards);
    
    // Clear grid
    cinemaGrid.innerHTML = '';
    
    // Add cards back in different order
    cardArray.reverse().forEach(card => {
        cinemaGrid.appendChild(card);
    });
    
    // Reinitialize cinema selection for new cards
    initializeCinemaSelection();
}

/**
 * Update cinema results based on filters
 */
function updateCinemaResults(filters) {
    const cinemaCount = document.querySelector('.cinema-count');
    
    // Simulate filtering results
    const baseCount = 39;
    const filteredCount = Math.floor(baseCount * (Math.random() * 0.5 + 0.5)); // 50-100% of original
    
    cinemaCount.textContent = `${filteredCount} Result`;
    
    // Show success message
    showNotification(`Found ${filteredCount} cinemas for your selection`);
    
    console.log('Filter results updated:', filters);
}

/**
 * Show notification message
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4c6ef5;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

/**
 * Initialize mobile menu (if hamburger exists)
 */
function initializeMobileMenu() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            // Add mobile menu functionality here
            console.log('Mobile menu clicked');
        });
    }
}

// Initialize mobile menu
initializeMobileMenu();

/**
 * Book now button functionality
 */
const bookNowBtn = document.querySelector('.book-now-btn');
if (bookNowBtn) {
    bookNowBtn.addEventListener('click', function(e) {
        // Check if cinema is selected
        const selectedCinema = document.querySelector('.cinema-card.active');
        
        if (!selectedCinema) {
            e.preventDefault();
            alert('Please select a cinema first!');
            return;
        }
        
        // Get form values
        const date = document.querySelector('input[type="date"]').value;
        const time = document.querySelector('.form-select').value;
        const location = document.querySelectorAll('.form-select')[1].value;
        
        if (!date || !time || !location) {
            e.preventDefault();
            alert('Please fill in all booking details!');
            return;
        }
        
        // Show confirmation
        const cinemaName = selectedCinema.querySelector('img').alt;
        const confirmation = confirm(`Confirm booking for:\nMovie: Spider-Man: Homecoming\nCinema: ${cinemaName}\nDate: ${date}\nTime: ${time}\nLocation: ${location}`);
        
        if (!confirmation) {
            e.preventDefault();
        }
    });
}
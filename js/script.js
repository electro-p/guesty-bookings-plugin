import { options } from "./config.js";

let currentPage = 1;
const itemsPerPage = 20;
let totalPages = 0;
let nextCursor = null;
let isLoading = false;
let listingsCount = 0;

async function fetchListings(page = 1) {
  if (isLoading) return;
  isLoading = true;
  renderPagination();
  document.getElementById('spinner').classList.remove('hidden');
  try {
    let endpoint = `listings?limit=${itemsPerPage}`;
    if (page > 1 && nextCursor) {
      endpoint += `&cursor=${nextCursor}`;
    }

    const url = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=${encodeURIComponent(endpoint)}`;
    const response = await fetch(url, options);
    const data = await response.json();

    listingsCount = data.pagination.total;
    nextCursor = data.pagination.cursor.next;
    totalPages = Math.ceil(listingsCount / itemsPerPage);

    const currentListings = data.results;
    renderListings(currentListings);
    renderPagination();
  } catch (err) {
    console.error('Error fetching listings:', err);
  } finally {
    isLoading = false;
    renderPagination();
    document.getElementById('spinner').classList.add('hidden');
  }
}

// Add loading spinner HTML function
function getLoadingSpinner() {
  return `
    <svg id="spinner" class="ml-2 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  `;
}

function renderPagination() {
  const startCount = (currentPage - 1) * itemsPerPage + 1;
  const endCount = Math.min(currentPage * itemsPerPage, listingsCount);

  const paginationContainer = document.getElementById('pagination-container');
  let paginationHTML = `
    <div class="flex flex-col items-center">
      <!-- Help text -->
      <span class="text-sm text-gray-700 dark:text-gray-400">
        Showing <span class="font-semibold text-gray-900 dark:text-white">${startCount}</span> to 
        <span class="font-semibold text-gray-900 dark:text-white">${endCount}</span> of 
        <span class="font-semibold text-gray-900 dark:text-white">${listingsCount}</span> Entries
      </span>
      
      <!-- Buttons -->
      <div class="inline-flex mt-2 xs:mt-0">
        <button 
          onclick="changePage(${currentPage - 1})"
          class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          ${currentPage === 1 ? 'disabled' : ''}>
          Prev
        </button>
        <button 
          onclick="changePage(${currentPage + 1})"
          class="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          ${!nextCursor ? 'disabled' : ''}>
          Next
        </button>
      </div>
    </div>`;

  paginationContainer.innerHTML = paginationHTML;
}

// Update changePage function
window.changePage = async function (page) {
  if (page < 1 || page > totalPages || page === currentPage || isLoading) return;
  currentPage = page;
  renderPagination();
  // Show loading state immediately
  await fetchListings(currentPage);
  window.scrollTo(0, 0);
};

// Initialize the first fetch
fetchListings();

// Create an IntersectionObserver instance
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
}, {
  rootMargin: '0px 0px 50px 0px', // Adjust as needed
  threshold: 0.1 // Adjust as needed
});

function initializeSwiper(pictures, carouselId) {
  const images = pictures.slice(0, 5).map((picture) => picture.original);

  // Get the specific carousel container by its unique ID
  const swiperContainer = document.getElementById(carouselId);
  swiperContainer.innerHTML = images
    .map(
      (image) =>
        `<div class="swiper-slide">
        <div class="relative w-full h-full">
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
          <img
            data-src="${image}"
            alt="Property Image"
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
        </div>
      </div>`
    )
    .join("");

  // Initialize the Swiper for the specific container
  const swiper = new Swiper(`#swi${carouselId}`, {
    direction: "horizontal",
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: `#${carouselId} + .swiper-pagination`,
      clickable: true,
    },
    navigation: {
      nextEl: `#${carouselId} ~ .swiper-button-next`,
      prevEl: `#${carouselId} ~ .swiper-button-prev`,
    },
    scrollbar: {
      el: `#${carouselId} ~ .swiper-scrollbar`,
    },
  });

  // Observe images for lazy loading
  const imgElements = swiperContainer.querySelectorAll('img[data-src]');
  imgElements.forEach(img => observer.observe(img));
}

function renderListings(listings, count) {
  const container = document.getElementById("properties-container");
  container.innerHTML = ""; // Clear existing content

  listings.slice(0, count).forEach((listing, index) => {
    // Create a unique ID for each property's carousel
    const carouselId = `property-carousel-${index}`;

    const propertyElement = document.createElement("div");
    propertyElement.className = "property";
    propertyElement.innerHTML = `
      <div class="property__card rounded-xl overflow-hidden bg-white">
        <div class="relative">
          <!-- Image Carousel -->
          <div class="w-full h-64 property__card--carousel overflow-hidden">
            <div id="swi${carouselId}" class="swiper h-full">
              <div id="${carouselId}" class="swiper-wrapper h-full"></div>
              <div class="swiper-pagination !bottom-3"></div>
              <div class="swiper-button-prev !text-white !w-8 !h-8 !bg-black/30 rounded-full transition-all hover:!bg-black/50">
                <span class="!text-lg">‹</span>
              </div>
              <div class="swiper-button-next !text-white !w-8 !h-8 !bg-black/30 rounded-full transition-all hover:!bg-black/50">
                <span class="!text-lg">›</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <a href="${window.location.origin}/guestyweb/property?id=${listing._id}" 
             class="block p-4 hover:bg-gray-50 transition-colors">
            <div class="flex flex-col gap-3">
              <!-- Location -->
              <div class="flex items-center gap-2 text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-sm font-medium tracking-wide text-ellipsis whitespace-nowrap overflow-hidden">
                  ${listing.address.city}, ${listing.address.state}
                </span>
              </div>

              <!-- Title and Price Section -->
<div class="flex flex-col gap-4">
  <!-- Title -->
  <h2 class="text-xl font-semibold text-gray-900 line-clamp-2 w-full" title="${listing.title}">
    ${listing.title}
  </h2>
                <!-- Price -->
  <div class="flex items-center justify-end w-full">
    <div class="flex flex-col items-end">
      <span class="text-sm text-gray-500">Starting at</span>
      <div class="flex items-baseline gap-1">
        <span class="text-sm text-gray-600">${listing.prices.currency}</span>
        <span class="text-2xl font-bold text-gray-900">${listing.prices.basePrice}</span>
      </div>
    </div>
  </div>
</div>

              <div class="h-px bg-gray-200"></div>

              <!-- Amenities -->
<div class="flex items-center justify-between w-full">
  <div class="flex items-center space-x-3"> <!-- Reduced gap from gap-4 to space-x-3 -->
    <div class="flex items-center space-x-1"> <!-- Reduced gap from gap-2 to space-x-1 -->
      <div class="p-1 bg-gray-100 rounded-full"> <!-- Reduced padding from p-1.5 to p-1 -->
        <img src="${guestyData.pluginUrl}images/bed.svg" alt="Bedrooms" class="w-3.5 h-3.5" /> <!-- Reduced size -->
      </div>
      <span class="text-xs text-gray-600 whitespace-nowrap">${listing.bedrooms} Beds</span>
    </div>
    <div class="flex items-center space-x-1"> <!-- Reduced gap -->
      <div class="p-1 bg-gray-100 rounded-full">
        <img src="${guestyData.pluginUrl}images/shower.svg" alt="Bathrooms" class="w-3.5 h-3.5" />
      </div>
      <span class="text-xs text-gray-600 whitespace-nowrap">${listing.bathrooms} Baths</span>
    </div>
  </div>
</div>
            </div>
          </a>
        </div>
      </div>
    `;

    
      container.appendChild(propertyElement);

    // Initialize Swiper with the unique carousel ID and listing pictures
    initializeSwiper(listing.pictures, carouselId);
  });
}

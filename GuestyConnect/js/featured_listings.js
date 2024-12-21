import { options } from "./config.js";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

fetch(
  `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=listings?limit=100`,
  options
)
  .then((res) => res.json())
  .then((res) => {
    //console.log(res);
    // Get 4 random listings
    const randomListings = shuffleArray([...res.results]).slice(0, 4);
    renderListings(randomListings);
  })
  .catch((err) => console.error(err));

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
  const images = pictures.slice(0, 10).map((picture) => picture.original);

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

function renderListings(listings) {
  const container = document.getElementById("featured-properties-container");
  container.innerHTML = ""; // Clear existing content

  listings.forEach((listing, index) => {
    // Create a unique ID for each property's carousel
    const carouselId = `property-carousel-${index}`;

    const propertyElement = document.createElement("div");
    propertyElement.className = "property transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl";

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

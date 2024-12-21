import { options } from "./config.js";

const Air_Condition = "./air_condition.svg";
const Babysitter = "./babysitter.svg";
const Bathroom = "./bathrooms.svg";
const BBQ_Grill = "./bbq_grill.svg";
const Bedroom = "./bedrooms.svg";
const BedLinens = "./bed_linens.svg";
const Chair = "./chair.svg";
const Clothings = "./clothings.svg";
const CoffeeMaker = "./coffee_maker.svg";
const Dishes = "./dishes_silverware.svg";
const Dogs = "./dogs.svg";
const Essentials = "./essentials.svg";
const FireExtinguisher = "./fire_extinguisher.svg";
const Free_Parking = "./free_parking.svg";
const Gym = "./gym.svg";
const HairDryer = "./hair_dryer.svg";
const Kitchen = "./kitchen.svg";
const Laptop = "./laptop.svg";
const Oven = "./oven.svg";
const PrivateEntrance = "./private_entrance.svg";
const Refrigerator = "./refrigerator.svg";
const Shampoo = "./shampoo.svg";
const Stove = "./stove.svg";
const Swimming_Pool = "./swimming_pool.svg";
const Toilet = "./toilet.svg";
const TV = "./tv.svg";
const Washer = "./washer.svg";
const Wifi = "./wifi.svg";
const Water = "./water.svg"

const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get('id');

const listingId = propertyId;

async function fetchReviews(listingId) {
  const reviewsUrl = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=reviews?listingId=${listingId}&limit=100`;
  try {
    const response = await fetch(reviewsUrl, options);
    const data = await response.json();
    // console.log(data);
    renderReviews(data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}


const url = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=listings/${listingId}`;
preloader.show();
fetch(url, options)
  .then(res => res.json())
  .then(data => {
    console.log(data);

    const property = data;

    const amenities = property?.amenities || ["No amenities available"];
    const summary = property?.publicDescription?.summary || "No summary available";
    const space = property?.publicDescription?.space || "No space description available";
    const access = property?.publicDescription?.access || "No access information available";
    const interactionWithGuests = property?.publicDescription?.interactionWithGuests || "No interaction information available";

    renderPropertyDetails(property, amenities, summary, space, access, interactionWithGuests);

    fetchReviews(listingId);
  })
  .catch(err => console.error(err));

// const highlights = space.split("\n\n");

const getDates = () => {
  const from = new Date();
  const to = new Date(from);
  to.setDate(from.getDate() + 1);
  return { from, to };
};

function getDaysBetweenDates(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds
  const differenceInTime = date2.getTime() - date1.getTime();
  return Math.round(differenceInTime / oneDay);
}

const DAYS_OF_THE_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDate(date, to) {
  if (!date) return to ? "End date" : "Start date";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateRange(checkInDateLocalized, checkOutDateLocalized) {
  const checkInDate = new Date(checkInDateLocalized);
  const checkOutDate = new Date(checkOutDateLocalized);

  // Formatter: "Day, Mon DD"
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short", // "Tue"
    month: "short", // "Sep"
    day: "numeric", // "03"
  });

  // Format the dates
  const checkInFormatted = formatter.format(checkInDate);
  const checkOutFormatted = formatter.format(checkOutDate);

  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const numberOfNights = Math.round(timeDifference / (1000 * 60 * 60 * 24));

  return `${checkInFormatted} - ${checkOutFormatted} (${numberOfNights} nights)`;
}

function getDayAndDate(date) {
  if (!date) return "";

  let date_value = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${DAYS_OF_THE_WEEK[date.getDay()]}, ${date_value}`;
}

function getISODate(date) {
  return date.toISOString().split("T")[0];
}

function normalizeDate(date) {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate;
}

function getDatesInRange(startDate, endDate) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}


function get_svg(amenity) {
  switch (amenity) {
    case 'Suitable for children (2-12 years)':
      return Babysitter;
    case 'Swimming pool':
      return Swimming_Pool;
    case 'Cookware':
      return BBQ_Grill;
    case 'Oven':
      return Oven;
    case 'Dishes and silverware':
      return Dishes;
    case 'Body Soap':
      return Shampoo;
    case 'Stove':
      return Stove;
    case 'Air conditioning':
      return Air_Condition;
    case 'BBQ grill':
      return BBQ_Grill;
    case 'Bed linens':
      return BedLinens;
    case 'Dishwasher':
      return Dishes;
    case 'Dryer':
      return HairDryer;
    case 'Kitchen':
      return Kitchen;
    case 'Microwave':
      return Oven;
    case 'TV':
      return TV;
    case 'Accessible-height bed':
      return BedLinens;
    case 'Accessible-height toilet':
      return Toilet;
    case 'Internet':
      return Wifi;
    case 'Babysitter recommendations':
    case 'Baby monitor':
      return Babysitter;
    case 'Water':
      return Water;
    default:
      return Essentials;
  }
}

function initializeSwiper(pictures) {
  const images = pictures.slice(1, 11).map((picture) => picture.original);

  const swiperContainer = document.getElementById("property-carousel");
  swiperContainer.innerHTML = images
    .map(
      (image) =>
        `<div class="swiper-slide"><img src="${image}" alt="Property Image" class="w-full h-full"></div>`
    )
    .join("");

  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    // },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });
}

async function renderPropertyDetails(property, amenities, summary, space, access, interactionWithGuests) {
  document.getElementById("nickname").textContent = property.title;

  const images = property.pictures.map(picture => picture.original);

  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  const isMounted = true; // Assuming the component is always mounted
  let viewAll = false;
  let selectedImage = null;

  window.setViewAll = function (value) {
    viewAll = value;
    if (viewAll) {
      document.getElementById("all-photos-container").style.display = "block";
      viewAllPhotos(property.pictures);
    } else {
      viewAll = false;
      //document.getElementById("view-all-photos").innerHTML = "";
      document.getElementById("all-photos-container").style.display = "none";
    }
  }

  setViewAll(false);

  function setSelectedImage(index) {
    selectedImage = index;
    renderViewAllPhotosComponent();
  }

  if (isMounted) {
    if (isDesktop) {
      const propertyImagesComponent = `
        <section class="grid lg:grid-cols-2 gap-2 rounded-[12px] overflow-hidden relative">
          <aside id="main-img" class="relative w-full h-full pt-[100%]"></aside>
          <aside id="sub-imgs" class="hidden lg:grid grid-cols-2 grid-rows-2 gap-2"></aside>
          <aside class="absolute bottom-6 right-6 w-fit flex justify-center bg-white py-2 px-4 border border-[#222] cursor-pointer rounded-[8px] gap-2 items-center">
            <img src="${guestyData.pluginUrl}images/grid.svg" alt="grid-icon" class="w-5 h-5" />
            <p class="text-sm font-medium" onclick="setViewAll(true)" >Show all photos</p>
          </aside>
        </section>
      `;
      document.getElementById("property-images").innerHTML = propertyImagesComponent;
      document.getElementById("main-img").innerHTML = images
        .slice(0, 1)
        .map(
          image =>
            `<img src="${image}" alt="main" class="object-cover w-full h-full absolute top-0 left-0" />`
        )
        .join("");
      document.getElementById("sub-imgs").innerHTML = images
        .slice(1, 5)
        .map(
          image =>
            `<div class="relative w-full h-full pt-[100%]">
              <img src="${image}" alt="main" class="object-cover w-full h-full absolute top-0 left-0" />
            </div>`
        )
        .join("");
    } else {
      initializeSwiper(property.pictures);
      document.getElementById("property-carousel").innerHTML = images
        .map(
          image =>
            `<div class="swiper-slide"><img src="${image}" alt="Property Image" class="w-full" loading="lazy"></div>`
        )
        .join("");
    }
  }

  function viewAllPhotos(images) {
    let selectedImage = null;

    const viewAllPhotosComponent = `
    <div class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm mt-[30px]">
      <div class="fixed inset-y-0 right-0 z-50 h-full w-full">
        <div class="flex h-full flex-col bg-background shadow-lg">
          <div class="flex items-center justify-between px-4 py-3 border-b">
            <h2 class="text-lg font-semibold">All Photos</h2>
            <button
              class="hover:bg-accent hover:text-accent-foreground h-10 w-10"
              onclick="setViewAll(false)"
            >
              <span class="h-4 w-4">X</span>
              <span class="sr-only">Close</span>
            </button>
          </div>
          <div class="flex-1 h-full w-full overflow-auto p-4">
           <div class="min-h-[600px] min-w-[400px] bg-gradient-to-b from-gray-200 to-gray-300">
            <div class="p-4 max-w-[740px] mx-auto" id="parent">
              <div class="grid grid-cols-3 auto-rows-[200px] gap-4">
                ${images.map((image, index) => `
                  <div
                    key="${index}"
                    class="relative overflow-hidden rounded-lg ${getScreen(index)}"
                    onclick="handleImageClick(${index})"
                  >
                    <img
                      src="${image.original}"
                      alt="Property image ${index + 1}"
                      class="object-cover w-full h-full transition-all hover:scale-105"
                    />
                  </div>
                `).join('')}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="lightbox"
      class="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-90 hidden"
      onclick="closeLightbox()"
    >
      <button
        class="absolute inset-y-0 left-4 text-white bg-opacity-50 hover:bg-opacity-100 p-2 rounded"
        onclick="navigateLightbox(-1, event)"
      >←</button>
      <img id="lightbox-image" class="rounded-lg max-h-[90%] max-w-[90%]" />
      <button
        class="absolute inset-y-0 right-4 text-white bg-opacity-50 hover:bg-opacity-100 p-2 rounded"
        onclick="navigateLightbox(1, event)"
      >→</button>
      <button
        class="absolute top-2 right-2 text-white bg-opacity-50 hover:bg-opacity-100 p-2 rounded"
        onclick="closeLightbox(event)"
      >X</button>
    </div>
  `;

    document.getElementById("view-all-photos").innerHTML = viewAllPhotosComponent;

    window.handleImageClick = function (index) {
      selectedImage = index;
      const lightbox = document.getElementById("lightbox");
      const lightboxImage = document.getElementById("lightbox-image");
      lightboxImage.src = images[index].original;
      lightbox.classList.remove("hidden");
    };

    window.closeLightbox = function (event) {
      if (event) event.stopPropagation();
      document.getElementById("lightbox").classList.add("hidden");
    };

    window.navigateLightbox = function (direction, event) {
      if (event) event.stopPropagation();
      selectedImage = (selectedImage + direction + images.length) % images.length;
      const lightboxImage = document.getElementById("lightbox-image");
      lightboxImage.src = images[selectedImage].original;
    };
  }

  function getScreen(idx) {
    let index = idx.toString().split("").reverse()[0];
    switch (parseInt(index)) {
      case 1:
      case 3:
      case 7:
      case 9:
        return "col-span-1 row-span-1";
      case 2:
      case 4:
        return "col-span-2 row-span-2";
      case 5:
      case 6:
      case 8:
        return "col-span-1 row-span-2";
      case 0:
      default:
        return "col-span-3 row-span-2";
    }
  }

  function handleImageClick(index) {
    setSelectedImage(index);
  }

  function handleClosePopup() {
    setSelectedImage(null);
  }

  function renderViewAllPhotosComponent() {
    if (viewAll) {
      viewAllPhotos(property.pictures);
    }
  }

  const info = `
      <aside class="mb-2 w-full">
      <h3 class="details-text-head text-lg mt-6 mb-3 font-playfair font-bold">Description</h3>
      <p class="mb-4 text-justify">${summary}</p>
      <h3 class="details-text-head text-lg mt-6 mb-3 font-playfair font-bold">The Space</h3>
      <div class="flex gap-2 flex-col mb-4">
        ${space.split('\n').map((line, index) => `
          <div key=${index} class="text-base">
            <p class="">${line}</p>
          </div>
        `).join('')}
      </div>
      <h3 class="details-text-head text-lg mb-2 font-playfair font-bold">Guest Access</h3>
      <p class="mb-4 text-justify">${access}</p>
      <h3 class="details-text-head text-lg mb-2 font-playfair font-bold">Services</h3>
      <p class="text-justify">${interactionWithGuests}</p>
    </aside>
      `;

  const features = `
      <div class="w-full flex flex-col gap-4">
      <h3 class="details-text-head font-medium">Features</h3>
      <div class="flex w-full max-w-[400px]">
        <div class="flex flex-col gap-1 items-center w-1/2">
          <img src="${guestyData.pluginUrl}images/shower.svg" alt="bathrooms" width="40" height="40" class="min-w-10 min-h-10" />
          <span>${property.bathrooms} bathrooms</span>
        </div>
        <div class="flex flex-col gap-1 items-center w-1/2">
          <img src="${guestyData.pluginUrl}images/bedroom.svg" alt="bedroom" width="40" height="40" class="min-w-10 min-h-10" />
          <span>${property.bedrooms} bedrooms</span>
        </div>
      </div>
    </div>
      `;

  const amenitiesComponent = `
      <div class="w-full flex flex-col gap-4 pb-6 @container/amenities">
      <h3 class="font-medium details-text-head">Amenities</h3>
      <ul class="list-disc list-inside grid grid-cols-2 @[520px]:grid-cols-3 gap-4 w-full">
        ${amenities.map((amenity, key) => `
          <li key=${key} >
            ${amenity}
          </li>
        `).join('')}
      </ul>
    </div>
      `;

  const propertyInfo = `
      <aside class="grid w-full">
        ${info}
    <div class="shrink-0 bg-border h-[1px] w-full my-6 separator"></div>
      ${features}
    <div class="shrink-0 bg-border h-[1px] w-full my-6 separator"></div>
      ${amenitiesComponent}
    </aside>
      `;

  document.getElementById("property-info").innerHTML = propertyInfo;

  const country_url = "/properties/?country=" + property.address.country;
  const state_url = country_url + "&state=" + property.address.state;

  const urlsContainer = document.getElementById("urls");
  urlsContainer.innerHTML = `
    <a href="/" class="text-[rgba(98,89,86,.5)]">Home</a> <span>/</span>
    <a href="${country_url}" class="text-[rgba(98,89,86,.5)]" onclick="setDestination('')">${capitalize(property.address.country)}</a> <span>/</span>
    <a href="${state_url}" class="text-[rgba(98,89,86,.5)]">${capitalize(property.address.state)}</a> <span>/</span>
    <a href="#" class="text-[#000] font-medium">${property.title}</a>
  `;

  preloader.hide();
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function setDestination(destination) {
  console.log("Destination set to:", destination);
}


// Add reviews carousel component
function renderReviews(reviews) {
  const reviewsSection = document.getElementById("reviews-section");

  // Filter out reviews with empty body values and ratings < 4
  const validReviews = reviews.filter(review =>
    review.rawReview.body.value &&
    review.rawReview.body.value.trim() !== '' &&
    parseInt(review.rawReview.starRatingOverall) >= 4
  );

  if (!validReviews || validReviews.length === 0) {
    return `
      <div class="w-full flex flex-col gap-4 pb-6">
        <h3 class="font-medium details-text-head">Reviews</h3>
        <p>No reviews yet</p>
      </div>
    `;
  }

  function renderStars(rating) {
    return `
      <div class="flex gap-1">
        ${Array(5).fill().map((_, i) => `
          <svg class="w-4 h-4 ${i < rating ? 'text-yellow-300' : 'text-gray-300'}" 
               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.181-.752-2.315-4.692a1.524 1.524 0 0 0-2.741 0L7.133 5.83l-5.181.752a1.523 1.523 0 0 0-.848 2.592l3.742 3.648-.884 5.152a1.524 1.524 0 0 0 2.205 1.615L11 17.185l4.833 2.404a1.524 1.524 0 0 0 2.205-1.615l-.884-5.152 3.742-3.648a1.523 1.523 0 0 0 .39-1.549z"/>
          </svg>
        `).join('')}
      </div>
    `;
  }

  const reviewPairs = [];
  for (let i = 0; i < validReviews.length; i += 2) {
    reviewPairs.push(validReviews.slice(i, i + 2));
  }

  const reviewsHtml = `
    <div class="w-full flex flex-col gap-4 pb-6">
     <div class="flex items-center justify-between mb-4">
      <h3 class="font-medium details-text-head">Guest Reviews</h3>
      <div class="flex gap-2">
          <button id="review-prev" class="swiper-button-prev !static !w-8 !h-8 !bg-black/30 !m-0 rounded-full transition-all hover:!bg-black/50">
            <span class="!text-lg text-white">‹</span>
          </button>
          <button id="review-next" class="swiper-button-next !static !w-8 !h-8 !bg-black/30 !m-0 rounded-full transition-all hover:!bg-black/50">
            <span class="!text-lg text-white">›</span>
          </button>
        </div>
      </div>
      <div class="relative w-full">
        <div class="swiper reviews-swiper">
          <div class="swiper-wrapper">
            ${reviewPairs.map(pair => `
              <div class="swiper-slide">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  ${pair.map(review => `
                    <div class="bg-white p-6 rounded-lg shadow-md">
                      <div class="flex items-center justify-between mb-4">
                        <div>
                          <h4 class="font-semibold">
                            ${review.rawReview.reservation.primaryGuest.firstName} ${review.rawReview.reservation.primaryGuest.lastName.charAt(0)}.
                          </h4>
                          <p class="text-sm text-gray-500">
                            ${new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}
                          </p>
                        </div>
                        ${renderStars(parseInt(review.rawReview.starRatingOverall))}
                      </div>
                      ${review.rawReview.title.value ?
      `<h5 class="font-medium mb-2">${review.rawReview.title.value}</h5>` :
      ''}
                      <p class="text-gray-600">${review.rawReview.body.value}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  reviewsSection.innerHTML = reviewsHtml;
  setTimeout(initReviewsSwiper, 0);
}

// Initialize Swiper after HTML is rendered
function initReviewsSwiper() {
  // Add scoped styles
  const style = document.createElement('style');
  style.textContent = `
    .reviews-container {
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .reviews-swiper {
      width: 100%;
      height: auto;
      overflow: hidden;
    }
    .reviews-swiper .swiper-slide {
      width: 100% !important;
    }
    .reviews-swiper .swiper-button-next,
    .reviews-swiper .swiper-button-prev {
      color: #000;
      opacity: 0.7;
    }
    .reviews-swiper .swiper-button-next:hover,
    .reviews-swiper .swiper-button-prev:hover {
      opacity: 1;
    }
    .reviews-swiper .swiper-button-next:after,
    .reviews-swiper .swiper-button-prev:after {
      font-size: 24px;
    }
  `;
  document.head.appendChild(style);

  // Initialize Swiper with contained styles
  const swiper = new Swiper('.reviews-swiper', {
    wrapperClass: 'swiper-wrapper',
    slideClass: 'swiper-slide',
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    }
  });
}
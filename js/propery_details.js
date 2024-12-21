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

const urlParams = new URLSearchParams(window.location.search);
const propertyId = urlParams.get('id');

const listingId = propertyId;


const url = `http://127.0.0.1/guesty-server/proxy.php?endpoint=listings/${listingId}`;

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
    default:
      return Essentials;
  }
}

function initializeSwiper(pictures) {
  const images = pictures.map((picture) => picture.original);

  const swiperContainer = document.getElementById("property-carousel");
  swiperContainer.innerHTML = images
    .map(
      (image) =>
        `<div class="swiper-slide"><img src="${image}" alt="Property Image" class="w-full"></div>`
    )
    .join("");

  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

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

function renderPropertyDetails(property, amenities, summary, space, access, interactionWithGuests) {
  document.getElementById("nickname").textContent = property.nickname;

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
            <img src="../images/grid.svg" alt="grid-icon" class="w-5 h-5" />
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
            `<div class="swiper-slide"><img src="${image}" alt="Property Image" class="w-full"></div>`
        )
        .join("");
    }
  }

  function viewAllPhotos(images) {
    const viewAllPhotosComponent = `
    <div class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm mt-[0px]">
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

    <!-- Horizontal Scrollbar -->
    <div class="absolute bottom-0 left-0 w-full h-2 bg-transparent">
      <div
        class="bg-gray-400 rounded-full cursor-pointer transition hover:bg-gray-500"
        id="horizontal-thumb"
        style="width: 20%; transform: translateX(0);"
      ></div>
    </div>
             ${selectedImage !== null ? `
            <div
              class="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-90"
              onclick="handleClosePopup()"
            >
              <div
                class="relative"
                style="width: ${document.getElementById('parent') ? document.getElementById('parent').offsetWidth : '100%'}"
                onclick="event.stopPropagation()"
              >
                <img
                  src="${images[selectedImage]}"
                  alt="Full size property image ${selectedImage + 1}"
                  class="rounded-lg"
                />
                <button
                  onclick="handleClosePopup()"
                  class="absolute top-2 right-2 bg-white bg-opacity-50 hover:bg-opacity-100 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                >
                  <span class="h-4 w-4">X</span>
                  <span class="sr-only">Close</span>
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
    document.getElementById("view-all-photos").innerHTML = viewAllPhotosComponent;
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
      <h3 class="text-lg mt-6 mb-3 font-playfair font-bold">Description</h3>
      <p class="mb-4">${summary}</p>
      <h3 class="text-lg mt-6 mb-3 font-playfair font-bold">The Space</h3>
      <div class="flex gap-2 flex-col mb-4">
        ${space.split('\n').map((line, index) => `
          <div key=${index} class="text-base">
            <p class="font-medium">${line}</p>
          </div>
        `).join('')}
      </div>
      <h4 class="text-lg mb-2 font-playfair font-bold">Guest Access</h4>
      <p class="mb-4">${access}</p>
      <h4 class="text-lg mb-2 font-playfair font-bold">Services</h4>
      <p class="">${interactionWithGuests}</p>
    </aside>
      `;

  const features = `
      <div class="w-full flex flex-col gap-4">
      <h3 class="font-medium">Features</h3>
      <div class="flex w-full max-w-[400px]">
        <div class="flex flex-col gap-1 items-center w-1/2">
          <img src="./images/shower.svg" alt="bathrooms" width="40" height="40" class="min-w-10 min-h-10" />
          <span>${property.bathrooms} bathrooms</span>
        </div>
        <div class="flex flex-col gap-1 items-center w-1/2">
          <img src="./images/bedroom.svg" alt="bedroom" width="40" height="40" class="min-w-10 min-h-10" />
          <span>${property.bedrooms} bedrooms</span>
        </div>
      </div>
    </div>
      `;

  const amenitiesComponent = `
      <div class="w-full flex flex-col gap-4 pb-6 @container/amenities">
      <h3 class="font-medium">Amenities</h3>
      <div class="grid grid-cols-2 @[520px]:grid-cols-3 gap-4 w-full">
        ${amenities.map((amenity, key) => `
          <div key=${key} class="flex flex-col gap-1 items-center justify-center">
            <img src="../images/${get_svg(amenity)}" alt="${amenity}" width="40" height="40" class="min-w-10 min-h-10" />
            <span class="text-sm font-normal text-center">${amenity}</span>
          </div>
        `).join('')}
      </div>
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

  //     document.getElementById("other-listings").innerHTML = `
  //     <div>
  //       <h2>Other Listings</h2>
  //       <p>City: ${property.address.state}</p>
  //     </div>
  //   `;

  const country_url = "/properties?country=" + property.address.country;
  const state_url = country_url + "&state=" + property.address.state;

  const urlsContainer = document.getElementById("urls");
  urlsContainer.innerHTML = `
    <a href="/" class="text-[rgba(98,89,86,.5)]">Home</a> <span>/</span>
    <a href="${country_url}" class="text-[rgba(98,89,86,.5)]" onclick="setDestination('')">${capitalize(property.address.country)}</a> <span>/</span>
    <a href="${state_url}" class="text-[rgba(98,89,86,.5)]">${capitalize(property.address.state)}</a> <span>/</span>
    <a href="#" class="text-[#000] font-medium">${property.nickname}</a>
  `;
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function setDestination(destination) {
  console.log("Destination set to:", destination);
}

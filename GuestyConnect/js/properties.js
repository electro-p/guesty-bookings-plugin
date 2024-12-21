import { options, accessToken } from "./config.js";

document.addEventListener("DOMContentLoaded", function () {

  //get state name from url path

  // check if on search page and the url is having state, country, checkIn and checkOut
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get('city');
  const state = urlParams.get('state');
  const country = urlParams.get('country') || "United States";


  console.log('All required parameters have values on the search page.');
  const resultsContainer = document.getElementById("properties-results-container");

  let apiSearchParams = {};

  if (country.trim() !== '') {
    apiSearchParams.country = country;
  }

  if (state && state.trim() !== '') {
    apiSearchParams.state = state;
    apiSearchParams.country = "United States";
  }

  if (city && city.trim() !== '') {
    apiSearchParams.city = city;
    apiSearchParams.country = "United States";
  }


  const endpoint = `listings?${new URLSearchParams(apiSearchParams).toString()}&limit=100`;
  const url = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=${encodeURIComponent(endpoint)}`;
  fetchResults(url);


  async function fetchResults(url) {
    const resultsContainer = document.getElementById("results-container");
    try {
      const response = await fetch(`${url}`, options);
      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const text = await response.text();
      const data = JSON.parse(text);
      console.log(data);
      const results = data.results || [];
      console.log(results);
      // Render results in the container
      renderResults(results);
    } catch (error) {
      console.log(error);
      const errMsg = `Error: ${error.message}`;
      resultsContainer.innerHTML = `<div id="toast-danger" class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
        <span class="sr-only">Error icon</span>
    </div>
    <div class="ms-3 text-sm font-normal">${errMsg}</div>
    <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
        </div>`;
    }

  }

  // Function to render search results
  function renderResults(results) {
    const resultsContainer = document.getElementById("properties-results-container");
    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>We're sorry, but the property you're looking for is not available in your selection range. Please try changing your selections.</p>";
      return;
    }

    const filteredResults = results;

    if (filteredResults.length === 0) {
      resultsContainer.innerHTML = "<p>We're sorry, but the property you're looking for is not available in your selection range. Please try changing your guests selections.</p>";
      return;
    }

    resultsContainer.innerHTML = filteredResults
      .map(
        (result) => `
                <div class="property shadow-2xl">
                    <div class="property__card">
            <div class="relative">
              
              <div class="flex">
                <div class="w-full h-52">
                  <img src="${result?.pictures[0]?.original}" alt="${result.nickname}" class="w-full h-52 object-cover" loading="lazy" />
                </div>
              </div>
              <!-- Description -->
              <a href="${window.location.origin}/guestyweb/property?id=${result._id}" 
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
                  ${result.address.city}, ${result.address.state}
                </span>
              </div>

              <!-- Title and Price Section -->
<div class="flex flex-col gap-4">
  <!-- Title -->
  <h2 class="text-xl font-semibold text-gray-900 line-clamp-2 w-full" title="${result.title}">
    ${result.title}
  </h2>
                <!-- Price -->
  <div class="flex items-center justify-end w-full">
    <div class="flex flex-col items-end">
      <span class="text-sm text-gray-500">Starting at</span>
      <div class="flex items-baseline gap-1">
        <span class="text-sm text-gray-600">${result.prices.currency}</span>
        <span class="text-2xl font-bold text-gray-900">${result.prices.basePrice}</span>
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
      <span class="text-xs text-gray-600 whitespace-nowrap">${result.bedrooms} Beds</span>
    </div>
    <div class="flex items-center space-x-1"> <!-- Reduced gap -->
      <div class="p-1 bg-gray-100 rounded-full">
        <img src="${guestyData.pluginUrl}images/shower.svg" alt="Bathrooms" class="w-3.5 h-3.5" />
      </div>
      <span class="text-xs text-gray-600 whitespace-nowrap">${result.bathrooms} Baths</span>
    </div>
  </div>
</div>
            </div>
          </a>
            </div>
          </div>
                </div>
            `
      )
      .join("");
  }

});
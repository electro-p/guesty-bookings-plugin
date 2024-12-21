import { options, accessToken } from "./config.js";


// Add this helper function to convert dates
function convertDateFormat(dateString) {
    if (!dateString) return '';

    // Handle YYYY-MM-DD format (already correct)
    if (dateString.includes('-')) {
        return dateString;
    }

    // Convert from MM/DD/YYYY to YYYY-MM-DD
    const [month, day, year] = dateString.split('/');
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay}`;
}


document.addEventListener("DOMContentLoaded", function () {

    if (!(window.location.pathname === "search")) {
        const searchButton = document.getElementById("search-button");
        const dateRange = {
            from: new Date(),
            to: new Date(new Date().setDate(new Date().getDate() + 1)),
        };
        let guests = 1;
        let destination = "Banner Elk";

        flatpickr("input[name='date']", {
            mode: "range",
            minDate: "today",
            dateFormat: "Y-m-d",
            locale: {
                timezone: "America/New_York"
            },
            onChange: function (selectedDates) {
                if (selectedDates.length === 1) {
                    dateRange.from = selectedDates[0];
                    document.getElementById("start-date").value = dateRange.from
                        .toLocaleDateString('en-CA', {
                            timeZone: "America/New_York"
                        });
                    document.getElementById("start-date").style.fontWeight = "500";
                } else if (selectedDates.length === 2) {
                    dateRange.from = selectedDates[0];
                    dateRange.to = selectedDates[1];

                    document.getElementById("start-date").value = dateRange.from
                        .toLocaleDateString('en-CA', {
                            timeZone: "America/New_York"
                        });
                    document.getElementById("end-date").value = dateRange.to
                        .toLocaleDateString('en-CA', {
                            timeZone: "America/New_York"
                        });
                    document.getElementById("start-date").style.fontWeight = "500";
                    document.getElementById("end-date").style.fontWeight = "500";
                }
            }
        });

        window.setGuests = function (value) {
            guests = value;
            document.getElementById("guests").style.fontWeight = "500";
            document.getElementById("guests").value = guests;
        };

        window.setDestination = function (value) {
            destination = value;
            document.getElementById("destination").style.fontWeight = "500";
            document.getElementById("destination").value = destination;
        };

        if (searchButton) {
            // Search button click event
            searchButton.addEventListener("click", async function () {

                document.getElementById("filter-btn-wrap").innerHTML = `
    <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
            </div>`;

                const checkIn = document.getElementById("start-date").value;
                const checkOut = document.getElementById("end-date").value;


                const fromDate = dateRange.from.toLocaleDateString('en-CA', {
                    timeZone: 'America/New_York'
                });
                const toDate = dateRange.to.toLocaleDateString('en-CA', {
                    timeZone: 'America/New_York'
                });

                const searchUrl = `${window.location.origin}/guestyweb/search?city=${destination}&guests=${guests}&checkIn=${checkIn}&checkOut=${checkOut}`;

                // redirect to search page
                window.location.href = searchUrl;
            });
        }
    }

    // check if on search page and the url is having city, country, checkIn and checkOut
    const urlParams = new URLSearchParams(window.location.search);
    if (
        urlParams.has('city') &&
        urlParams.has('guests') &&
        urlParams.get('city').trim() !== '' && urlParams.get('guests').trim() !== ''
    ) {
        console.log('All required parameters have values on the search page.');
        const resultsContainer = document.getElementById("results-container");

        const searchParams = new URLSearchParams(window.location.search);
        const city = searchParams.get("city");
        const checkIn = convertDateFormat(searchParams.get("checkIn"));
        const checkOut = convertDateFormat(searchParams.get("checkOut"));
        const guests = searchParams.get("guests");
        // console.log('Guests value:', guests); // Debug log

        // Populate filter bar with current search parameters
        if (city) document.getElementById("filter-city").value = city;
        if (checkIn) document.getElementById("filter-checkin").value = checkIn;
        if (checkOut) document.getElementById("filter-checkout").value = checkOut;
        if (guests) document.getElementById("filter-guests").value = guests;

        const dateRange = {
            from: new Date(),
            to: new Date(new Date().setDate(new Date().getDate() + 1)),
        };

        flatpickr("input[name='checkdate']", {
            mode: "range",
            minDate: "today",
            dateFormat: "Y-m-d",
            locale: {
                timezone: "America/New_York"
            },
            onChange: function (selectedDates) {
                if (selectedDates.length === 1) {
                    dateRange.from = selectedDates[0];
                    document.getElementById("filter-checkin").value = dateRange.from
                        .toLocaleDateString('en-CA', {
                            timeZone: "America/New_York"
                        });
                    document.getElementById("filter-checkin").style.fontWeight = "500";
                } else if (selectedDates.length === 2) {
                    dateRange.from = selectedDates[0];
                    dateRange.to = selectedDates[1];

                    // Set check-in date
                    document.getElementById("filter-checkin").value = dateRange.from
                        .toLocaleDateString('en-CA', {
                            timeZone: "America/New_York"
                        });

                    // Set check-out date    
                    document.getElementById("filter-checkout").value = dateRange.to
                        .toLocaleDateString('en-CA', {
                            timeZone: "America/New_York"
                        });

                    document.getElementById("filter-checkin").style.fontWeight = "500";
                    document.getElementById("filter-checkout").style.fontWeight = "500";
                }
            }
        });

        // Initialize empty search params object
        const apiSearchParams = {
            country: "United States" // Set default country
        };

        // Only add parameters if they exist and are not empty
        if (city && city.trim() !== '') {
            apiSearchParams.city = city;
        }

        if (checkIn && checkIn.trim() !== '') {
            apiSearchParams.checkIn = checkIn;
        }

        if (checkOut && checkOut.trim() !== '') {
            apiSearchParams.checkOut = checkOut;
        }

        const endpoint = `listings?${new URLSearchParams(apiSearchParams).toString()}&limit=100`;
        const url = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=${encodeURIComponent(endpoint)}`;
        fetchResults(url, guests);
    } else {
        // window.location.href = `${window.location.origin}/guestyweb/home`;
        console.log('Some parameters are missing or empty.');
    }

    async function fetchResults(url, guests) {
        const resultsContainer = document.getElementById("results-container");
        try {
            const response = await fetch(`${url}`, options);
            if (!response.ok) {
                throw new Error("Failed to fetch results;   Refresh the page and try again!");
            }

            const text = await response.text();
            const data = JSON.parse(text);
            // console.log(data);
            const results = data.results || [];
            // console.log(results);
            // Render results in the container
            renderResults(results, guests);
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
    function renderResults(results, guests) {
        const resultsContainer = document.getElementById("results-container");
        if (results.length === 0) {
            resultsContainer.innerHTML = "<p>We're sorry, but the property you're looking for is not available in your selection range. Please try changing your selections.</p>";
            return;
        }

        // console.log("unfiltered results", results);

        const filteredResults = results.filter(result => result.accommodates >= guests);

        // console.log("filtered results", filteredResults);

        if (filteredResults.length === 0) {
            resultsContainer.innerHTML = "<p>We're sorry, but the property you're looking for is not available in your selection range. Please try changing your guests selections.</p>";
            return;
        }

        // console.log("filtered:", filteredResults);

        resultsContainer.innerHTML = filteredResults
            .map(
                (result) => {
                    // console.log(result.pictures);
                    // console.log("first:", result.pictures[0]);
                    return `
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
            `}
            )
            .join("");
    }


    // Handle filter form submission
    const filterForm = document.getElementById("filter-form");
    filterForm.addEventListener("submit", function (event) {
        event.preventDefault();
        document.getElementById("filter-btn-wrap").innerHTML = `
    <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
            </div>`;

        const country = "United States";
        const city = document.getElementById("filter-city").value;
        const checkIn = document.getElementById("filter-checkin").value;
        const checkOut = document.getElementById("filter-checkout").value;
        const guests = document.getElementById("filter-guests").value;

        const searchUrl = `${window.location.origin}/guestyweb/search?city=${city}&country=${country}&guests=${guests}&checkIn=${checkIn}&checkOut=${checkOut}`;

        // Redirect to search page with new filters
        window.location.href = searchUrl;

    });
});
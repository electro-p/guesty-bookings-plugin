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
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get("id"); // Get the property ID from the URL parameter
  // console.log(propertyId);

  let propertyName = "";
  let max_guests; let timeZone;

  const url = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=listings/${propertyId}`;

  fetch(url, options)
    .then(res => res.json())
    .then(data => {
      propertyName = data.title;
      max_guests = data.accommodates;
      timeZone = data.timezone;
      // Update guests options after getting max_guests
      updateGuestsOptions();
    })
    .catch(err => console.error(err));

  let dateRange = {
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 1)),
  };
  let selectedBookingDates = dateRange
  let guests = 1;
  let quote = null;
  let amount = 0;
  let loading = false;
  let errMsg = "";
  let successMsg = "";
  let disable = true;
  let hasCoupon = false;
  let coupon = "";

  // Add this function to generate guest options
  function generateGuestOptions(maxGuests) {
    let options = '';
    for (let i = 1; i <= maxGuests; i++) {
      options += `<option value="${i}">${i} Guest${i > 1 ? 's' : ''}</option>`;
    }
    return options;
  }

  // Add this function to update select options
  function updateGuestsOptions() {
    const guestSelect = document.getElementById('guests');
    if (guestSelect) {
      guestSelect.innerHTML = generateGuestOptions(max_guests);
      guestSelect.value = guests; // Maintain current selection
    }
  }
  let dateLocale = dateLocale;
  let dateLocaleTimeZone = "America/New_York";
  let dateLocaleSetting= {
      timeZone: dateLocaleTimeZone,
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  function getDate(date) {
    if (!date) return "N/A";

    // Convert to EST timezone
    return new Date(date.toLocaleString(dateLocale, {
      timeZone: dateLocaleSetting
    })).toLocaleDateString();
  }

  function getDaysBetweenDates(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds
    const differenceInTime = date2.getTime() - date1.getTime();
    return Math.round(differenceInTime / oneDay);
  }

  function formatPrice(amount) {
    return `$${amount.toLocaleString(dateLocale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function calculateDaysDifference(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate - startDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return dayDiff;
  }

  function calculateTotalAmount(response) {
    // Extract data from the API response
    const ratePlan = response.rates.ratePlans[0].ratePlan;
    const fareAccommodation = ratePlan.money.fareAccommodation;
    const fareCleaning = ratePlan.money.fareCleaning;
    const totalTaxes = ratePlan.money.totalTaxes;

    // Calculate total amount
    const subtotalPrice = fareAccommodation + fareCleaning;
    const totalAmount = subtotalPrice + totalTaxes;

    return totalAmount;
  }

  window.setQuote = function (newQuote) {
    quote = newQuote;
    render();
  };

  window.checkAvailability = function () {
    errMsg = "";
    successMsg = "";
    loading = true;
    render();

    const listingId = propertyId; // Replace with actual listing ID

    // Fix: Use the dateRange object's values and format them correctly
    const fromDate = dateRange.from.toLocaleDateString();
    const toDate = dateRange.to.toLocaleDateString();

    document.getElementById("start-date").value = fromDate;
    document.getElementById("end-date").value = toDate;
    document.getElementById("guests").value = guests;

    const endpoint = `listings/${listingId}/calendar?from=${fromDate}&to=${toDate}`;
    const url = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=${encodeURIComponent(endpoint)}`;


    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);

        const nights = getDaysBetweenDates(dateRange.from, dateRange.to);
        const minNights = res[0].minNights; // Assuming minNights is the same for all days

        if (nights < minNights) {
          errMsg = `Minimum stay is ${minNights} nights.`;
        } else {
          const allAvailable = res.every((day) => day.status !== "unavailable" && (day.ctd == false && day.cta == false));
          if (allAvailable) {
            errMsg = "";
            successMsg = "Available";
            createReservationQuote(
              guests,
              fromDate,
              toDate,
              propertyId
            );
          } else {
            successMsg = "";
            errMsg =
              "Some of the selected days are not available. Please change your selections";
            loading = false;
            render();
            document.getElementById("start-date").value = fromDate;
            document.getElementById("end-date").value = toDate;
            document.getElementById("guests").value = guests;
          }
        }
      })
      .catch((err) => {
        console.error(err);
        // Handle the error as needed
        successMsg = "";
        errMsg = "An Error Occured, Try Again!";
        loading = false;
        render();
        document.getElementById("start-date").value = fromDate;
        document.getElementById("start-date").style.fontWeight = "700";
        document.getElementById("end-date").value = toDate;
        document.getElementById("end-date").style.fontWeight = "700";
      })
      .finally(() => {
        document.getElementById("start-date").value = fromDate;
        document.getElementById("start-date").style.fontWeight = "700";
        document.getElementById("end-date").value = toDate;
        document.getElementById("end-date").style.fontWeight = "700";
      });
  };

  window.createReservationQuote = function (
    guestsCount,
    checkInDate,
    checkOutDate,
    listingId
  ) {
    // console.log(
    //   "Request Data:",
    //   guestsCount,
    //   checkInDate,
    //   checkOutDate,
    //   listingId
    // );

    const postOptions = {
      method: "POST",
      headers: {
        accept: "application/json; charset=utf-8",
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        guestsCount: parseInt(guestsCount, 10),
        checkInDateLocalized: checkInDate,
        checkOutDateLocalized: checkOutDate,
        listingId: listingId,
      }),
    };

    fetch(
      `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=reservations/quotes`,
      postOptions
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(`Error: ${error.error.message}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        // console.log("API Response:", data);
        if (data.status == "valid") {
          const totalAmount = calculateTotalAmount(data);
          // Prepare reservation data
          const reservationData = {
            id: data._id,
            listingId: listingId,
            title: propertyName,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guests: guestsCount,
            night: calculateDaysDifference(checkInDate, checkOutDate),
            subTotalPrice: data.rates.ratePlans[0].ratePlan.money.subTotalPrice,
            totalAmount: totalAmount,
          };

          console.log("Reservation created successfully!");
          setQuote(reservationData);
          loading = false;
          render();
          console.log(reservationData);
        } else {
          successMsg = "";
          errMsg = "Failed to get Reservation Quote for this Listing";
          loading = false;
          render();
          document.getElementById("start-date").value = dateRange.from
            .toLocaleDateString();
          document.getElementById("end-date").value = dateRange.to
            .toLocaleDateString();
        }

        return data;
      })
      .catch((err) => {
        console.error("Error:", err);
        successMsg = "";
        errMsg = err.code;
        loading = false;
        render();
        document.getElementById("start-date").value = dateRange.from
          .toLocaleDateString();
        document.getElementById("end-date").value = dateRange.to
          .toLocaleDateString();
      });
  };

  const availabilityComponent = `<div class="flex flex-col gap-4 max-w-md mx-auto bg-white p-4 shadow-md rounded-lg">
    <!-- Date Picker -->
    <aside class="border border-[#EBE3D7] justify-between flex items-center gap-4 lg:min-h-16 w-full rounded">
      <span class="p-3 border-r border-[#EBE3D7]">
        <svg width="24px" height="24px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 0V5M11.5 0V5M1.5 2.5H13.5C14.0523 2.5 14.5 2.94772 14.5 3.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H1.5C0.947716 14.5 0.5 14.0523 0.5 13.5V3.5C0.5 2.94772 0.947715 2.5 1.5 2.5Z" stroke="#000000"></path>
        </svg>
      </span>
      <div class="flex w-full px-2 justify-between items-center gap-1 overflow-hidden">
        <input type="text" name="date" id="start-date" class="text-xs py-2 px-4 text-[#242428] font-light  p-2 w-full rounded" placeholder="Start date" />
        <span>-</span>
        <input type="text" name="date" id="end-date" class="text-xs py-2 px-4 text-[#242428] font-light p-2 w-full rounded" placeholder="End date" />
      </div>
    </aside>

    <!-- Guest Selection -->
    <div class="border border-[#EBE3D7] flex w-full rounded">
      <span class="p-3 border-r border-[#EBE3D7]">
        <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="#000000"></path>
        </svg>
      </span>
      <div class="px-2 flex items-center justify-center w-full">
        <button type="button" class="flex h-10 items-center justify-between w-full bg-white  text-sm py-2 px-4 rounded">
          <select class="w-full" name="guests" id="guests" onchange="setGuests(this.value)">
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5 Guests</option>
            <option value="6">6 Guests</option>
          </select>
        </button>
      </div>
    </div>
    ${errMsg
      ? `<span style="color: red;" class="text-sm text-red-600">${errMsg}</span>`
      : ""
    } 
    <!-- Check Availability Button -->
    <button style="background-color: #0B2846;"
        class="p-3 bg-[#0B2846] text-white text-xs" onclick="checkAvailability()" ${loading ? "disabled" : ""
    }>
      ${loading ? "Checking..." : "Check availability"}
    </button>
  </div>`;

  function render() {
    const nights = getDaysBetweenDates(dateRange.from, dateRange.to);
    const bookingModal = document.getElementById("booking-modal");

    if (quote) {
      bookingModal.innerHTML = `
            <div class="flex flex-col gap-4">
              <h3 class="text-lg font-playfair font-medium">${quote.title}</h3>
              <aside class="flex gap-2 justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-xs font-normal">Check In</span>
                  <p class="text-xs font-medium text-[#242428] font-opensans">${getDate(
        dateRange.from
      )}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-xs font-normal">Check Out</span>
                  <p class="text-xs font-medium text-[#242428] font-opensans">${getDate(
        dateRange.to
      )}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-xs font-normal">Nights</span>
                  <p class="text-xs font-medium text-[#242428] font-opensans">${nights}</p>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-xs font-normal">Guests</span>
                  <p class="text-xs font-medium text-[#242428] font-opensans">${guests}</p>
                </div>
              </aside>
              <div class="separator"></div>
              <aside class="flex flex-col gap-4">
                <div class="flex items-center gap-2">
                  <input type="checkbox" id="coupon" class="p-0" ${hasCoupon ? "checked" : ""
        } onchange="toggleCoupon(this.checked)" />
                  <label for="coupon" class="text-sm font-medium leading-none">I have a Coupon</label>
                </div>
                ${hasCoupon
          ? `<input type="text" value="${coupon}" placeholder="Enter Coupon Code" class="w-full" oninput="setCoupon(this.value)" />`
          : ""
        }
                <div class="flex justify-between text-sm font-medium">
                  <p class="font-medium">Subtotal</p>
                  <p>${formatPrice(quote.subTotalPrice)}</p>
                </div>
              </aside>
              <div class="separator"></div>
              <aside class="flex flex-col gap-8">
                <div class="flex justify-between text-lg font-medium">
                  <p>Total</p>
                  <p>${formatPrice(quote.totalAmount)}</p>
                </div>
                <div class="flex gap-2 mt-2 w-full">
                  <button class="border border-[#0B2846] rounded-[2px] p-3 flex items-center justify-center max-w-11 cursor-pointer" onclick="setQuote(null)" ${loading ? "disabled" : ""
        }>
                    <svg fill="#0B2846" width="12" height="12" class="min-w-3"><path d="M10 6L2 6M2 6L6 2M2 6L6 10" stroke="#0B2846" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </button>
                  
                  <button type="button" style="background-color: #0B2846;" class="bg-[#0B2846] text-white text-sm rounded-[2px] p-3 w-fit h-[46px] grow" ${loading ? "disabled" : ""
        } onclick="window.location.href='${window.location.origin}/guestyweb/checkout?quoteid=${quote.id}'">
                    Create Reservation
                  </button>
                </div>
              </aside>
            </div>
          `;
    } else {
      bookingModal.innerHTML = `<div class="flex flex-col gap-4 max-w-md mx-auto bg-white p-4 shadow-md rounded-lg">
    <!-- Date Picker -->
    <aside class="border border-[#EBE3D7] justify-between flex items-center gap-4 lg:min-h-16 w-full rounded">
      <span class="p-3 border-r border-[#EBE3D7]">
        <svg width="24px" height="24px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.5 0V5M11.5 0V5M1.5 2.5H13.5C14.0523 2.5 14.5 2.94772 14.5 3.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H1.5C0.947716 14.5 0.5 14.0523 0.5 13.5V3.5C0.5 2.94772 0.947715 2.5 1.5 2.5Z" stroke="#000000"></path>
        </svg>
      </span>
      <div class="flex w-full px-2 justify-between items-center gap-1 overflow-hidden">
        <input type="text" name="date" id="start-date" class="text-xs py-2 px-4 text-[#242428] font-light  p-2 w-full rounded" placeholder="Start date" style="border: none; outline: none;" />
        <span>-</span>
        <input type="text" name="date" id="end-date" class="text-xs py-2 px-4 text-[#242428] font-light p-2 w-full rounded" placeholder="End date" style="border: none; outline: none;"/>
      </div>
    </aside>

    <!-- Guest Selection -->
    <div class="border border-[#EBE3D7] flex w-full rounded">
      <span class="p-3 border-r border-[#EBE3D7]">
        <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="#000000"></path>
        </svg>
      </span>
      <div class="px-2 flex items-center justify-center w-full">
        
          <select class="w-full border-none" name="guests" id="guests" onchange="setGuests(this.value)">
             ${generateGuestOptions(max_guests)}
          </select>
       
      </div>
    </div>
    ${errMsg
          ? `<span style="color: red;" class="text-sm text-red-600">${errMsg}</span>`
          : ""
        } 
        ${successMsg
          ? `<span style="color: green;" class="text-sm text-green-600">${successMsg}</span>`
          : ""
        } 
    <!-- Check Availability Button -->
    <button
        class="p-3 bg-[#0B2846] text-white text-xs border-none" onclick="checkAvailability()" ${loading ? "disabled" : ""
        }>
      ${loading ? "Checking..." : "Check availability"}
    </button>
  </div>`;

      // Disable the datepicker input field initially
      document.querySelectorAll("input[name='date']").disabled = true;

      //fetch availability
      async function fetchAvailability() {
        // Create dates in EST timezone
        const startDate = new Date(new Date().toLocaleString(dateLocale, {
          timeZone: dateLocaleTimeZone
        }));
        const endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 2);

        // Format dates in EST
        const formattedStartDate = startDate.toLocaleDateString(dateLocale, {
          timeZone: dateLocaleTimeZone
        });
        const formattedEndDate = endDate.toLocaleDateString(dateLocale, {
          timeZone: dateLocaleTimeZone
        });

        const endpoint = `listings/${propertyId}/calendar?from=${formattedStartDate}&to=${formattedEndDate}`;
        const url = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=${encodeURIComponent(endpoint)}`;

        const response = await fetch(url);
        const data = await response.json();
        return data;
      }

      function getUnavailableDates(data) {
        const unavailableDates = new Set();

        // Create a map of dates to their status for easier lookup
        const dateStatusMap = new Map(
          data.map(item => [item.date, item])
        );

        data.forEach(item => {
          // Create date in EST timezone
          const currentDate = new Date(item.date + 'T00:00:00');
          const dateStr = currentDate.toLocaleDateString(dateLocale, {
            timeZone: dateLocaleTimeZone
          });

          if (item.status === 'unavailable') {
            // Fully unavailable dates should always be disabled
            unavailableDates.add(dateStr);
          } else if (item.status === 'reserved' || item.status === 'booked') {
            // Get next day in EST
            const nextDate = new Date(currentDate);
            nextDate.setDate(nextDate.getDate() + 1);
            const nextDateString = nextDate.toLocaleDateString(dateLocale, {
              timeZone: dateLocaleTimeZone
            });
            const nextDayData = dateStatusMap.get(nextDateString);

            // Get previous day in EST
            const prevDate = new Date(currentDate);
            prevDate.setDate(prevDate.getDate() - 1);
            const prevDateString = prevDate.toLocaleDateString(dateLocale, {
              timeZone: dateLocaleTimeZone
            });
            const prevDayData = dateStatusMap.get(prevDateString);

            // Only add to unavailable if:
            // 1. Next day is not available AND
            // 2. Previous day is not available
            const nextDayUnavailable = !nextDayData ||
              nextDayData.status === 'unavailable' ||
              nextDayData.status === 'reserved' ||
              nextDayData.status === 'booked';

            const prevDayUnavailable = !prevDayData ||
              prevDayData.status === 'unavailable' ||
              prevDayData.status === 'reserved' ||
              prevDayData.status === 'booked';

            // If both adjacent days are unavailable, disable this date
            if (nextDayUnavailable && prevDayUnavailable) {
              unavailableDates.add(dateStr);
            }
          }
        });

        return unavailableDates;
      }

      async function initializeDatepicker() {

        const availabilityData = await fetchAvailability();
        const unavailableDates = getUnavailableDates(availabilityData);

        // Enable the datepicker input field after fetching data
        const dateInput = document.querySelectorAll("input[name='date']");
        dateInput.disabled = false;

        // Flatpickr date picker initialization
        document.getElementById("guests").value = guests;
        flatpickr("input[name='date']", {
          mode: "range",
          minDate: "today",
          dateFormat: "Y-m-d",
          maxDate: new Date().fp_incr(365 * 2),
          // Set timezone to EST
          // locale: {
          //   timezone: dateLocaleTimeZone
          // },
          disable: [
            function (date) {
              // Convert to EST for comparison
              const estDate = new Date(date.toLocaleString(dateLocale, {
                timeZone: dateLocaleTimeZone
              }));
              return unavailableDates.has(estDate.toLocaleDateString());
            }
          ],
          onChange: function (selectedDates) {
            selectedBookingDates = selectedDates;
            if (selectedDates.length === 1) {
              // Convert to EST
              const estDate = new Date(selectedDates[0].toLocaleString(dateLocale, {
                timeZone: dateLocaleTimeZone
              }));
              dateRange.from = estDate;

              // const formattedDate = estDate.toLocaleDateString(dateLocale, {
              //   timeZone: dateLocaleTimeZone
              // });
              document.getElementById("start-date").value = selectedDates[0].toLocaleDateString();
              document.getElementById("start-date").style.fontWeight = "700";
            } else if (selectedDates.length === 2) {
              // Convert both dates to EST
              const estStartDate = new Date(selectedDates[0].toLocaleString(dateLocale, {
                timeZone: dateLocaleTimeZone
              }));
              const estEndDate = new Date(selectedDates[1].toLocaleString(dateLocale, {
                timeZone: dateLocaleTimeZone
              }));

              dateRange.from = estStartDate;
              dateRange.to = estEndDate;

              const startDate = estStartDate.toLocaleDateString(dateLocale, {
                timeZone: dateLocaleTimeZone
              });
              const endDate = estEndDate.toLocaleDateString(dateLocale, {
                timeZone: dateLocaleTimeZone
              });

              document.getElementById("start-date").value =selectedDates[0].toLocaleString(;
              document.getElementById("end-date").value = selectedDates[0].toLocaleString(;
              document.getElementById("start-date").style.fontWeight = "700";
              document.getElementById("end-date").style.fontWeight = "700";
            }
          }
        });
      }

      // Call the initializeDatepicker function to set up the datepicker
      initializeDatepicker();
      updateGuestsOptions();
    }
  }

  window.toggleCoupon = function (checked) {
    hasCoupon = checked;
    render();
  };

  function setCoupon(value) {
    coupon = value;
  }

  render();

  window.setGuests = function (value) {
    guests = parseInt(value, 10);
    document.getElementById("guests").style.fontWeight = "700";
    document.getElementById("guests").value = guests;
  };

});

function setDate(value) {
  dateRange.from = value ? value.from : null;
  dateRange.to = value ? value.to : null;
  render();
}

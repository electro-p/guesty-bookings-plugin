const POINT_DIVIDER = 15500;

document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const quoteId = urlParams.get('quoteId');

  const reservationId = urlParams.get('id');

  try {
    // Fetch reservation details
    const reservationResponse = await fetch(`${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=reservations/${reservationId}/details`);
    const reservationDetails = await reservationResponse.json();
    // console.log("Reservation details:", reservationDetails);

    // Fetch listing details
    const listingResponse = await fetch(`${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=listings/${reservationDetails.unitId}`);
    const listingDetails = await listingResponse.json();
    console.log("Listing details:", listingDetails);

    // Fetch quote details
    const quoteResponse = await fetch(`${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=reservations/quotes/${quoteId}`);
    const quoteDetails = await quoteResponse.json();
    console.log("Quote details:", quoteDetails);


    // Render reservation details
    renderReservationDetails(reservationDetails, listingDetails, quoteDetails);

    // Render listing to checkout
    renderListingToCheckout(listingDetails, quoteDetails);
  } catch (e) {
    console.error("Failed to fetch reservation or listing details", e);
  }
});

function renderReservationDetails(reservationDetails, listingDetails, quoteDetails) {
  const reservationDetailsContainer = document.getElementById("reservation-details");
  const ratePlans = quoteDetails.rates.ratePlans[0];

  const currency = ratePlans.days[0].currency;
  const fareAccommodation = ratePlans.ratePlan.money.fareAccommodation;
  const fees = ratePlans.ratePlan.money.totalFees;
  const subTotalPrice = ratePlans.ratePlan.money.subTotalPrice;
  const tax = ratePlans.ratePlan.money.totalTaxes;
  const totalPrice = subTotalPrice + tax;
  const days = ratePlans.days;
  const ratePlanId = ratePlans.ratePlan._id;

  const reservationDetailsComponent = `<aside>
                    <h1 class="text-lg sm:text-xl font-normal font-playfair leading-relaxed">
                        Your reservation is ${reservationDetails.status}
                    </h1>
                    <h3 class="font-medium text-base font-opensans flex gap-1 items-center leading-relaxed">
                        ${listingDetails ? `You're going to ${listingDetails.address.state}` : ""}
                    </h3>
                </aside>
                <aside class="flex flex-col gap-2 min-[900px]:hidden">
                    <div class="relative w-full h-0 pb-[50%]">
                        <!-- Aspect ratio of 2:1 -->
                        <img
                            src="${listingDetails?.pictures[0].original}"
                            alt="${listingDetails?.nickname ?? listingDetails.id}"
                            class="object-cover overflow-hidden rounded-[6px]" />
                    </div>
                    <h2 class="text-2xl sm:text-[32px] font-semibold font-playfair leading-relaxed">
                        ${listingDetails?.title ?? ""}
                    </h2>
                </aside>
                <aside class="text-[15px] font-opensans flex flex-col gap-4">
                    <div class="flex flex-col gap-1">
                        <span class="font-normal">Check in</span>
                        <p class="font-medium leading-relaxed">
                            ${getDayAndDate(new Date(reservationDetails.checkInDateLocalized))}
                        </p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="font-normal">Check out</span>
                        <p class="font-medium leading-relaxed">
                            ${getDayAndDate(new Date(reservationDetails.checkOutDateLocalized))}
                        </p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="font-normal">Address</span>
                        <p class="font-medium leading-relaxed">
                            ${listingDetails ? listingDetails.address.full : ""}
                        </p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="font-normal">Guests</span>
                        <p class="font-medium leading-relaxed">${reservationDetails.guestsCount}</p>
                    </div>
                    <div class="flex flex-col gap-1">
                        <span class="font-normal">Reservation Code</span>
                        <p class="font-medium">${reservationDetails.confirmationCode}</p>
                    </div>
                </aside>`;
  reservationDetailsContainer.innerHTML = reservationDetailsComponent;
}

function renderListingToCheckout(listingData, quoteData) {
  const listingToCheckout = document.getElementById("listing-to-checkout");
  const ratePlans = quoteData.rates.ratePlans[0];
  const currency = ratePlans.days[0].currency;
  const fareAccommodation = ratePlans.ratePlan.money.fareAccommodation;
  const fees = ratePlans.ratePlan.money.totalFees;
  const subTotalPrice = ratePlans.ratePlan.money.subTotalPrice;
  const tax = ratePlans.ratePlan.money.totalTaxes;
  const totalPrice = subTotalPrice + tax;
  const days = ratePlans.days;
  const ratePlanId = ratePlans.ratePlan._id;

  listingToCheckout.innerHTML = `
      <div class="flex flex-col gap-4 border border-black/30 md rounded-lg md:sticky md:top-24 lg:top-32 md:right-0">
        <section class="flex flex-col gap-3 py-4 px-5 w-full items-center">
          <div class="w-full">
            <div class="relative w-full h-64">
              <img
                src=${listingData?.pictures[0].original ?? "./images/placeholder.svg"}
                alt=${listingData?.nickname ?? listingData.id}
                class="object-cover rounded-lg w-full h-full"
              />
            </div>
          </div>
          <aside class="flex w-full flex-col ">
            <h3 class="text-base sm:text-lg font-semibold font-playfair capitalize">
              ${listingData?.title ?? ""}
            </h3>
            <h4 class="text-sm lg:text-base font-normal font-opensans text-[#1C1C1CBF]">
              ${listingData?.address.state ?? ""}
            </h4>
            <h5 class="text-xs lg:text-sm font-normal font-opensans text-[#073937]">
              ${formatDateRange(
    quoteData.checkInDateLocalized,
    quoteData.checkOutDateLocalized
  )}
            </h5>
            <p class="text-[10px] lg:text-xs font-normal font-playfair text-[#073937] md:hidden">
              ${currency}{" "}
              <span class="font-semibold">${formatPrice(totalPrice)}</span>
            </p>
          </aside>
        </section>
        <div class="separator bg-[#e0e0e0] hidden md:block w-full md:bg-black/20"></div>
        <section class="px-5 w-full pb-4">
          <aside class="flex flex-col gap-3 w-full">
            <div class="flex justify-between gap-1 items-center font-normal font-opensans text-[#073937] text-sm">
              <p class="text-xs lg:text-sm font-normal text-[#073937]">
                ${currency}
                ${days[0].price} x ${days.length} nights
              </p>
              <p class="text-xs lg:text-sm font-normal text-[#073937]">
                ${currency}
                ${formatPrice(fareAccommodation)}
              </p>
            </div>
            <div class="flex justify-between items-center font-normal font-opensans text-[#073937] text-sm">
              <p class="text-xs lg:text-sm font-normal text-[#073937]">
                Points to earn
              </p>
              <p class="text-xs lg:text-sm font-normal text-[#073937]">
                ${formatPrice(parseInt(totalPrice.toFixed(2)) / POINT_DIVIDER)}
              </p>
            </div>
            <div class="flex justify-between items-center font-normal font-opensans text-[#073937] text-sm">
              <p class="text-xs lg:text-sm font-normal text-[#073937]">Fees</p>
              <p class="text-xs lg:text-sm font-normal text-[#073937]">
                ${currency} ${formatPrice(fees)}
              </p>
            </div>
            <div class="separator bg-[#e0e0e0] hidden md:block w-full md:bg-black/20"></div>
            <div class="flex justify-between items-center font-normal font-opensans text-[#073937] text-sm">
              <p class="text-xs lg:text-sm font-normal text-[#073937]">Tax</p>
              <p class="text-xs lg:text-sm font-normal text-[#073937]">
                ${currency} ${formatPrice(tax)}
              </p>
            </div>
            <div class="separator bg-[#e0e0e0] hidden md:block w-full md:bg-black/20"></div>
            <div class="flex justify-between items-center font-normal font-opensans text-[#073937] text-sm">
              <p class="text-xs lg:text-sm font-normal text-[#073937]">
                Total
              </p>
              <p class="text-xs lg:text-sm font-normal text-[#073937]">
                ${currency}
                ${formatPrice(totalPrice)}
              </p>
            </div>
          </aside>
        </section>
      </div>
    `;
}

function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

  return formattedPrice.replace("$", "");
}

function getDayAndDate(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  return `${dayName}, ${monthName} ${dayOfMonth}`;
}

function formatDateRange(checkInDateLocalized, checkOutDateLocalized) {
  const checkInDate = new Date(checkInDateLocalized);
  const checkOutDate = new Date(checkOutDateLocalized);

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const checkInFormatted = formatter.format(checkInDate);
  const checkOutFormatted = formatter.format(checkOutDate);

  const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
  const numberOfNights = Math.round(timeDifference / (1000 * 60 * 60 * 24));

  return `${checkInFormatted} - ${checkOutFormatted} (${numberOfNights} nights)`;
}

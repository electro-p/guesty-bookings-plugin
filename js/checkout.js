import { accessToken, options } from "./config.js";
const POINT_DIVIDER = 15500;

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

function formatPrice(price) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

  return formattedPrice.replace("$", "");
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const quoteId = urlParams.get("quoteid");

  let canMakePayment = false;
  let guestData = null;
  let listingId = "";
  let totalPrice = 0;
  let ratePlanId = ""
  let firstName = "";
  let lastName = "";



  function fetchQuoteDetails(quoteId) {
    const url = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=reservations/quotes/${quoteId}`;
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        listingId = data.unitTypeId;
        fetchListingDetails(listingId, data);
      })
      .catch((err) => console.error(err));
  }

  function fetchListingDetails(listingId, quoteData) {
    const url = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=listings/${listingId}`;
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        renderListingToCheckout(data, quoteData);
        renderGuestInfoForm();
        const months = [
          { value: "01", name: "January" },
          { value: "02", name: "February" },
          { value: "03", name: "March" },
          { value: "04", name: "April" },
          { value: "05", name: "May" },
          { value: "06", name: "June" },
          { value: "07", name: "July" },
          { value: "08", name: "August" },
          { value: "09", name: "September" },
          { value: "10", name: "October" },
          { value: "11", name: "November" },
          { value: "12", name: "December" }
        ];

        const days = Array.from({ length: 31 }, (_, i) => {
          const day = (i + 1).toString().padStart(2, '0');
          return { value: day, name: day };
        });

        const birthMonthSelect = document.getElementById("birthMonth");
        const birthDaySelect = document.getElementById("birthDay");

        months.forEach(month => {
          const option = document.createElement("option");
          option.value = month.value;
          option.textContent = month.name;
          birthMonthSelect.appendChild(option);
        });

        days.forEach(day => {
          const option = document.createElement("option");
          option.value = day.value;
          option.textContent = day.name;
          birthDaySelect.appendChild(option);
        });
      })
      .catch((err) => console.error(err));
  }

  // function renderListingToCheckout(listingData, quoteData) {
  //   const listingToCheckout = document.getElementById("listing-to-checkout");
  //   const ratePlans = quoteData.rates.ratePlans[0];
  //   const currency = ratePlans.days[0].currency;
  //   // totalPrice = ratePlans.days.reduce(
  //   //   (total, day) => total + day.price,
  //   //   0
  //   // );
  //   const fareAccommodation = ratePlans.ratePlan.money.fareAccommodation;
  //   const fees = ratePlans.ratePlan.money.totalFees;
  //   const subTotalPrice = ratePlans.ratePlan.money.subTotalPrice;
  //   const tax = ratePlans.ratePlan.money.totalTaxes;
  //   totalPrice = subTotalPrice + tax;
  //   const days = ratePlans.days;
  //   ratePlanId = ratePlans.ratePlan._id;

  //   listingToCheckout.innerHTML = `
  //     <div class="flex flex-col gap-4 border border-black/30 md rounded-lg md:sticky md:top-24 lg:top-32 md:right-0">
  //       <section class="flex flex-col gap-3 py-4 px-5 w-full items-center">
  //         <div class="w-full">
  //           <div class="relative w-full h-64">
  //             <img
  //               src=${listingData?.pictures[0].original ?? "./images/placeholder.svg"}
  //               alt=${listingData?.nickname ?? listingData.id}
  //               class="object-cover rounded-lg w-full h-full"
  //             />
  //           </div>
  //         </div>
  //         <aside class="flex w-full flex-col ">
  //           <h3 class="text-base sm:text-lg font-semibold font-playfair capitalize">
  //             ${listingData?.title ?? ""}
  //           </h3>
  //           <h4 class="text-sm lg:text-base font-normal font-opensans text-[#1C1C1CBF]">
  //             ${listingData?.address.state ?? ""}
  //           </h4>
  //           <h5 class="text-xs lg:text-sm font-normal font-opensans text-[#073937]">
  //             ${formatDateRange(
  //     quoteData.checkInDateLocalized,
  //     quoteData.checkOutDateLocalized
  //   )}
  //           </h5>
  //           <p class="text-[10px] lg:text-xs font-normal font-playfair text-[#073937] md:hidden">
  //             ${currency}
  //             <span class="font-semibold">${formatPrice(totalPrice)}</span>
  //           </p>
  //         </aside>
  //       </section>
  //       <div class="separator bg-[#e0e0e0] hidden md:block w-full md:bg-black/20"></div>
  //       <section class="px-5 w-full pb-4">
  //         <aside class="flex flex-col gap-3 w-full">
  //           <div class="flex justify-between gap-1 items-center font-normal font-opensans text-[#073937] text-sm">
  //             <p class="text-xs lg:text-sm font-normal text-[#073937]">
  //               ${currency}
  //               ${days[0].price} x ${days.length} nights
  //             </p>
  //             <p class="text-xs lg:text-sm font-normal text-[#073937]">
  //               ${currency}
  //               ${formatPrice(fareAccommodation)}
  //             </p>
  //           </div>
  //           <div class="flex justify-between items-center font-normal font-opensans text-[#073937] text-sm">
  //             <p class="text-xs lg:text-sm font-normal text-[#073937]">
  //               Points to earn
  //             </p>
  //             <p class="text-xs lg:text-sm font-normal text-[#073937]">
  //               ${formatPrice(parseInt(totalPrice.toFixed(2)) / POINT_DIVIDER)}
  //             </p>
  //           </div>
  //           <div class="flex justify-between items-center font-normal font-opensans text-[#073937] text-sm">
  //             <p class="text-xs lg:text-sm font-normal text-[#073937]">Fees</p>
  //             <p class="text-xs lg:text-sm font-normal text-[#073937]">
  //               ${currency} ${formatPrice(fees)}
  //             </p>
  //           </div>
  //           <div class="separator bg-[#e0e0e0] hidden md:block w-full md:bg-black/20"></div>
  //           <div class="flex justify-between items-center font-normal font-opensans text-[#073937] text-sm">
  //             <p class="text-xs lg:text-sm font-normal text-[#073937]">Tax</p>
  //             <p class="text-xs lg:text-sm font-normal text-[#073937]">
  //               ${currency} ${formatPrice(tax)}
  //             </p>
  //           </div>
  //           <div class="separator bg-[#e0e0e0] hidden md:block w-full md:bg-black/20"></div>
  //           <div class="flex justify-between items-center font-normal font-opensans text-[#073937] text-sm">
  //             <p class="text-xs lg:text-sm font-normal text-[#073937]">
  //               Total
  //             </p>
  //             <p class="text-xs lg:text-sm font-normal text-[#073937]">
  //               ${currency}
  //               ${formatPrice(totalPrice)}
  //             </p>
  //           </div>
  //         </aside>
  //       </section>
  //     </div>
  //   `;
  // }

  function renderListingToCheckout(listingData, quoteData) {
    const listingToCheckout = document.getElementById("listing-to-checkout");
    const ratePlans = quoteData.rates.ratePlans[0];
    const money = ratePlans.ratePlan.money;
    const currency = money.currency;
    totalPrice = money.subTotalPrice + money.totalTaxes;
    ratePlanId = ratePlans.ratePlan._id;

    // Filter out accommodation and cleaning fee from invoice items
    const filteredInvoiceItems = money.invoiceItems
      .filter(item =>
        !item.title.toLowerCase().includes('accommodation') &&
        !item.title.toLowerCase().includes('cleaning fee')
      );

    // Generate invoice items HTML
    const invoiceItemsHTML = filteredInvoiceItems
      .map(item => `
            <div class="flex justify-between items-center font-normal font-opensans text-[#073937] text-sm">
                <p class="text-xs lg:text-sm font-normal text-[#073937]">
                    ${item.title}
                </p>
                <p class="text-xs lg:text-sm font-normal text-[#073937]">
                    ${currency} ${formatPrice(item.amount)}
                </p>
            </div>
        `).join('');

    // Separate fees and taxes
    const fees = money.invoiceItems.filter(item =>
      item.type === 'ADDITIONAL' ||
      item.type === 'CLEANING_FEE'
    );
    const taxes = money.invoiceItems.filter(item =>
      item.type === 'TAX'
    );

    // Calculate totals
    const totalFees = fees.reduce((sum, item) => sum + item.amount, 0);
    const totalTaxes = taxes.reduce((sum, item) => sum + item.amount, 0);


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
          <aside class="flex w-full flex-col">
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
              ${currency}
              <span class="font-semibold">${formatPrice(totalPrice)}</span>
            </p>
          </aside>
        </section>

        <div class="separator hidden bg-[#e0e0e0] md:block w-full md:bg-black/20"></div>

      <!-- Pricing Breakdown Section -->
      <section class="px-5 w-full pb-4">
        <div class="flex flex-col gap-4">
          <!-- Accommodation -->
          <div class="flex justify-between items-center">
            <p class="text-sm font-medium">Accommodation</p>
            <p class="text-sm font-medium">
              ${currency} ${formatPrice(money.fareAccommodation)}
            </p>
          </div>

            <!-- Fees Dropdown -->
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center cursor-pointer"
                 onclick="document.getElementById('feesBreakdown').classList.toggle('hidden')">
              <div class="flex items-center gap-2">
                <p class="text-sm font-medium">Fees</p>
                <svg class="w-4 h-4 transition-transform transform" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7 10l5 5 5-5H7z"/>
                </svg>
              </div>
              <p class="text-sm font-medium">${currency} ${formatPrice(totalFees)}</p>
            </div>
            <div id="feesBreakdown" class="hidden pl-4 flex flex-col gap-2 border-l-2 border-gray-200">
              ${fees.map(fee => `
                <div class="flex justify-between items-center">
                  <p class="text-xs text-gray-600">${fee.title}</p>
                  <p class="text-xs text-gray-600">${currency} ${formatPrice(fee.amount)}</p>
                </div>
              `).join('')}
            </div>
          </div>

            <!-- Subtotal before tax -->
          <div class="flex justify-between items-center pt-2 border-t border-gray-200">
            <p class="text-sm font-medium">Subtotal before tax</p>
            <p class="text-sm font-medium">
              ${currency} ${formatPrice(money.subTotalPrice)}
            </p>
          </div>

            <!-- Taxes Dropdown -->
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center cursor-pointer"
                 onclick="document.getElementById('taxesBreakdown').classList.toggle('hidden')">
              <div class="flex items-center gap-2">
                <p class="text-sm font-medium">Taxes</p>
                <svg class="w-4 h-4 transition-transform transform" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7 10l5 5 5-5H7z"/>
                </svg>
              </div>
              <p class="text-sm font-medium">${currency} ${formatPrice(totalTaxes)}</p>
            </div>
            <div id="taxesBreakdown" class="hidden pl-4 flex flex-col gap-2 border-l-2 border-gray-200">
              ${taxes.map(tax => `
                <div class="flex justify-between items-center">
                  <p class="text-xs text-gray-600">${tax.title}</p>
                  <p class="text-xs text-gray-600">${currency} ${formatPrice(tax.amount)}</p>
                </div>
              `).join('')}
            </div>
          </div>

            <!-- Total -->
          <div class="flex justify-between items-center pt-4 mt-2 border-t-2 border-gray-300">
            <p class="text-base font-semibold">Total</p>
            <p class="text-base font-semibold">
              ${currency} ${formatPrice(totalPrice)}
            </p>
          </div>
        </div>
      </section>
    </div>
    `;

    // Add click animations for dropdowns
    const dropdowns = document.querySelectorAll('[onclick*="toggle"]');
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', (e) => {
        const arrow = e.currentTarget.querySelector('svg');
        arrow.style.transform = arrow.style.transform === 'rotate(180deg)' ? '' : 'rotate(180deg)';
      });
    });
  }

  function renderGuestInfoForm() {
    const guestInfo = document.getElementById("guest-info");

    guestInfo.innerHTML = `<div id="guestInfo" class="p-4">
    <section class="relative px-5 md:px-0 w-full">
    <div class="flex flex-col gap-1">
    
        <h1 class="text-base font-playfair font-medium text-[#073937] mb-5">Guest Info</h1>
        </div>
        <form class="flex flex-col gap-6" id="guest-info-form">
            <!-- Email and Confirm Email -->
            <aside class="flex flex-col md:flex-row gap-2">
                <div class="flex gap-1 flex-col w-full">
                    <label for="email" class="text-sm font-normal flex gap-1 items-baseline font-opensans">
                        Email <span class="text-red text-xs">*</span>
                    </label>
                    <input type="email" id="email" name="email" class="w-full border border-black/20 rounded-[10px] h-11 p-3 text-black focus-visible:outline-none" required>
                </div>
                <div class="flex gap-1 flex-col w-full">
                    <label for="confirm-email" class="text-sm font-normal flex gap-1 items-baseline font-opensans">
                        Confirm Email <span class="text-red text-xs">*</span>
                    </label>
                    <input type="email" id="confirm-email" name="confirm-email" class="w-full border border-black/20 rounded-[10px] h-11 p-3 text-black focus-visible:outline-none" required>
                </div>
            </aside>

            <!-- First Name and Last Name -->
            <aside class="flex flex-col md:flex-row gap-2">
                <div class="flex gap-1 flex-col w-full">
                    <label for="firstname" class="text-sm font-normal flex gap-1 items-baseline font-opensans">
                        First Name <span class="text-red text-xs">*</span>
                    </label>
                    <input type="text" id="firstname" name="firstname" class="w-full border border-black/20 rounded-[10px] h-11 p-3 text-black focus-visible:outline-none" required>
                </div>
                <div class="flex gap-1 flex-col w-full">
                    <label for="lastname" class="text-sm font-normal flex gap-1 items-baseline font-opensans">
                        Last Name <span class="text-red text-xs">*</span>
                    </label>
                    <input type="text" id="lastname" name="lastname" class="w-full border border-black/20 rounded-[10px] h-11 p-3 text-black focus-visible:outline-none" required>
                </div>
            </aside>

            <!-- Country Code and Phone Number -->
<aside class="flex flex-col sm:flex-row gap-2">
    <div class="w-full sm:w-1/3">
        <label for="countryCode" class="text-sm font-normal flex gap-1 items-baseline font-opensans">
            Country Code <span class="text-red text-xs">*</span>
        </label>
        <select id="countryCode" name="countryCode" class="w-full border border-black/20 rounded-[10px] p-2 text-black focus-visible:outline-none">
            <option value="+1">+1</option>
            <option value="+44">+44</option>
        </select>
    </div>
    <div class="w-full sm:w-2/3">
        <label for="phoneNumber" class="text-sm font-normal flex gap-1 items-baseline font-opensans">
            Phone Number <span class="text-red text-xs">*</span>
        </label>
        <input type="tel" id="phoneNumber" name="phoneNumber" class="w-full border border-black/20 rounded-[10px] h-11 p-3 text-black focus-visible:outline-none" required>
    </div>
</aside>

            <!-- Birthdate -->
            <aside class="flex flex-col md:flex-row gap-2">
                <div class="w-full md:w-1/3">
                    <label for="birthMonth" class="text-sm font-normal font-opensans">Birth Month</label>
                    <select id="birthMonth" name="birthMonth" class="w-full border border-black/20 rounded-[10px] p-2 text-black focus-visible:outline-none">
                        
                    </select>
                </div>
                <div class="w-full md:w-1/3">
                    <label for="birthDay" class="text-sm font-normal font-opensans">Day</label>
                    <select id="birthDay" name="birthDay" class="w-full border border-black/20 rounded-[10px] p-2 text-black focus-visible:outline-none">
                    </select>
                </div>
                <div class="w-full md:w-1/3">
                    <label for="birthYear" class="text-sm font-normal font-opensans">Year</label>
                    <select id="birthYear" name="birthYear" class="w-full border border-black/20 rounded-[10px] p-2 text-black focus-visible:outline-none">
                        <option value="1900">1970</option>
                        <option value="1900">1971</option>
                        <option value="1900">1972</option>
                        <option value="1900">1973</option>
                        <option value="1900">1974</option>
                        <option value="1900">1975</option>
                        <option value="1900">1976</option>
                        <option value="1900">1977</option>
                        <option value="1900">1978</option>
                        <option value="1900">1979</option>
                        <option value="1900">1980</option>
                        <option value="1900">1989</option>
                        <option value="1990">1990</option>
                        <option value="1991">1991</option>
                        <option value="1992">1992</option>
                        <option value="1993">1993</option>
                        <option value="1994">1994</option>
                        <option value="1995">1995</option>
                        <option value="1996">1996</option>
                        <option value="1997">1997</option>
                        <option value="1998">1998</option>
                        <option value="1999">1999</option>
                        <option value="2000">2000</option>
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                    </select>
                </div>
            </aside>
            <p class="xs">You must be at least 18 years old to book spaces with Carolina Stays.</p>

            <!-- Newsletter Subscription -->
            <div class="flex items-center gap-2">
                <input type="checkbox" id="subscribeGuestInfo" name="subscribeGuestInfo" class="h-4 w-4 rounded-sm border border-primary bg-white focus-visible:ring-2 focus-visible:ring-blue-500">
                <label for="subscribeGuestInfo" class="text-xs font-medium">Receive occasional news about Carolina Stays, new locations, and special deals.</label>
            </div>

            <!-- Submit Button -->
            <button type="submit" id="continue-to-payment-button" class="bg-[#0B2846] text-white px-6 py-3 rounded-[7px] text-sm font-medium flex items-center justify-center">
    <span>Continue to Payment</span>
    <svg id="spinner" class="hidden ml-2 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
</button>
        </form>
    </section>
</div>
`;

    document
      .getElementById("guest-info-form")
      .addEventListener("submit", handleGuestInfoSubmit);
  }

  async function handleGuestInfoSubmit(event) {
    event.preventDefault();

    const continueButton = document.getElementById("continue-to-payment-button");
    const spinner = document.getElementById("spinner");

    // Disable the button and show the spinner
    continueButton.disabled = true;
    spinner.classList.remove("hidden");

    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm-email").value;
    firstName = document.getElementById("firstname").value;
    lastName = document.getElementById("lastname").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const birthMonth = document.getElementById("birthMonth").value;
    const birthDay = document.getElementById("birthDay").value;
    const birthYear = document.getElementById("birthYear").value;
    const subscribe = document.getElementById("subscribeGuestInfo").checked;

    if (email !== confirmEmail) {
      alert("Email does not match. Please try again.");
      continueButton.disabled = false;
      spinner.classList.add("hidden");
      return;
    }

    guestData = {
      email,
      firstName,
      lastName,
      phoneNumber,
      birthday: `${birthYear}-${birthMonth}-${birthDay}`,
      subscribe,
    };

    canMakePayment = true;


    console.log(listingId);
    // Fetch the payment provider ID
    const paymentProviderUrl = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=listings/${listingId}/payment-provider`;
    try {
      const paymentProviderResponse = await fetch(paymentProviderUrl, options);

      const paymentProviderData = await paymentProviderResponse.json();
      console.log(paymentProviderData);
      const providerId = paymentProviderData._id;
      console.log(providerId);

      // Retry mechanism for rendering the Guesty Tokenization form
      const maxRetries = 3;
      let attempt = 0;
      let success = false;

      // Render the Guesty Tokenization form
      while (attempt < maxRetries && !success) {
        try {
          await guestyTokenization.render({
            containerId: "guesty-tokenization-container",
            providerId: providerId
          });

          // Show the payment section
          document.getElementById("guest-info").style.display = "none";
          document.getElementById("payment-section").style.display = "block";
          success = true;
        } catch (e) {
          attempt++;
          console.error(`Failed to render the Guesty Tokenization form (attempt ${attempt})`, e);
          if (attempt >= maxRetries) {
            alert("Failed to fetch payment provider data. Please try again later.");
            continueButton.disabled = false;
            spinner.classList.add("hidden");
          }
        }
      }
    } catch (e) {
      console.error("Error fetching payment provider data", e);
      alert("Failed to fetch payment provider data. Please try again later.");
    }
  }

  // Add event listener for the payment form submit button
  document.getElementById("payment-submit-button").addEventListener("click", async function () {
    const paymentButton = document.getElementById("payment-submit-button");
    const spinner = document.getElementById("spinner");

    // Disable the button and show the spinner
    paymentButton.disabled = true;
    spinner.classList.remove("hidden");

    try {
      // Validate the Guesty Tokenization form
      guestyTokenization.validate();

      // Submit the Guesty Tokenization form
      const paymentMethod = await guestyTokenization.submit({
        amount: totalPrice,
        currency: "USD",
        listingId: listingId,
        quoteId: quoteId,
        guest: {
          firstName: firstName,
          lastName: lastName,
          email: guestData.email,
          phone: guestData.phoneNumber,
        },
      });

      console.log("Payment method:", paymentMethod);
      if (paymentMethod) {
        // alert("Payment successful!");
        const ccTokenid = paymentMethod._id;

        // Create the reservation
        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json; charset=utf-8',
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            ratePlanId: ratePlanId,
            ccToken: ccTokenid,
            guest: {
              firstName: firstName,
              lastName: lastName,
              email: guestData.email,
              phone: guestData.phoneNumber,
              policy: {
                privacy: {
                  version: "1.0",
                  dateOfAcceptance: new Date().toISOString(),
                  isAccepted: true
                },
                termsAndConditions: {
                  dateOfAcceptance: new Date().toISOString(),
                  isAccepted: true
                },
                marketing: {
                  isAccepted: true
                }
              }
            }
          })
        };
        const response = await fetch(`${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=reservations/quotes/${quoteId}/instant`, options);
        const reservation = await response.json();
        console.log("Reservation created:", reservation);

        // Fetch listing details
        const listingResponse = await fetch(`${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=listings/${listingId}`);
        const listingDetails = await listingResponse.json();
        console.log("Listing details:", listingDetails);

        if (reservation.error) {
          alert("Failed to create reservation. Please try again.");
          paymentButton.disabled = false;
          spinner.classList.add("hidden");
          return;
        }

        if (reservation.status === "pending") {
          alert("Reservation is pending. Please wait for the confirmation.");
          return;
        }

        if (reservation.status === "confirmed") {
          alert("Reservation confirmed!");
          // Redirect to the reservation page
          window.location.href = `${window.location.origin}/guestyweb/reservation/?id=${reservation._id}&quoteId=${quoteId}`;

        }
      }
    } catch (e) {
      console.error("Payment failed", e);
      alert("Payment failed. Please try again.");
    }
  });

  fetchQuoteDetails(quoteId);
});

// https://ventura-three.vercel.app/reservation/674003020dc5e7db1a8fba58?quoteId=674001c6e9f07cd133d96c49

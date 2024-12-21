<section class="w-full relative my-8 search-form-container">
  <aside class="mx-auto max-w-[1000px] w-full">
    <div class="bg-white shadow-lg rounded-lg px-6 sm:px-12 py-6 flex flex-col gap-6 lg:flex-row lg:gap-4 lg:items-end">
      <!-- Loading Spinner -->
      <!-- <div class="loading-spinner" id="loading-spinner">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div> -->

      <!-- Destination -->
      <div class="form-element flex flex-col w-full lg:w-auto">
        <label for="destination" class="text-gray-600 text-sm font-semibold mb-2">Destination</label>
        <select
          class="w-full border border-gray-300 rounded-lg text-gray-700 py-2 px-3 focus:outline-none focus:ring focus:ring-[#123B63]"
          name="destination" id="destination"
          onchange="setDestination(this.value)" placeholder="destination">
          <option value="Banner Elk">Banner Elk</option>
          <option value="Beech Mountain">Beech Mountain</option>
          <option value="Boone">Boone</option>
          <option value="Carolina Beach">Carolina Beach</option>
          <option value="Elk Park">Elk Park</option>
          <option value="Holly Ridge">Holly Ridge</option>
          <option value="North Topsail Beach">North Topsail Beach</option>
          <option value="Pinehurst">Pinehurst</option>
          <option value="Sugar Mountain">Sugar Mountain</option>
          <option value="Surf City">Surf City</option>
        </select>
      </div>

      <!-- Guests -->
      <div class="form-element flex flex-col w-full lg:w-auto">
        <label for="guests" class="text-gray-600 text-sm font-semibold mb-2">Guests</label>
        <select
          class="w-full border border-gray-300 rounded-lg text-gray-700 py-2 px-3 focus:outline-none focus:ring focus:ring-[#123B63]"
          name="guests"
          id="guests" value="1"
          onchange="setGuests(this.value)">
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5 Guests</option>
          <option value="6">6 Guests</option>
          <option value="7">7 Guests</option>
          <option value="8">8 Guests</option>
          <option value="9">9 Guests</option>
          <option value="10">10 Guests</option>
          <option value="11">11 Guests</option>
          <option value="12">12 Guests</option>
        </select>
      </div>

      <!-- Dates -->
      <div class="form-element flex flex-col w-full lg:flex-row lg:gap-4 lg:w-auto">
        <div class="flex flex-col w-full lg:w-auto">
          <label for="start-date" class="text-gray-600 text-sm font-semibold mb-2">Check-in</label>
          <div class="relative">
            <input
              type="text"
              id="start-date"
              name="date"
              class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-[#123B63]"
              placeholder="Start date" />
            <svg
              class="absolute top-2 right-3 text-gray-400"
              width="20px"
              height="20px"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 0V5M11.5 0V5M1.5 2.5H13.5C14.0523 2.5 14.5 2.94772 14.5 3.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H1.5C0.947716 14.5 0.5 14.0523 0.5 13.5V3.5C0.5 2.94772 0.947715 2.5 1.5 2.5Z" stroke="#000000"></path>
            </svg>
          </div>
        </div>
        <div class="flex flex-col w-full lg:w-auto">
          <label for="end-date" class="text-gray-600 text-sm font-semibold mb-2">Check-out</label>
          <div class="relative">
            <input
              type="text"
              id="end-date"
              name="date"
              class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:ring-[#123B63]"
              placeholder="End date" />
            <svg
              class="absolute top-2 right-3 text-gray-400"
              width="20px"
              height="20px"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 0V5M11.5 0V5M1.5 2.5H13.5C14.0523 2.5 14.5 2.94772 14.5 3.5V13.5C14.5 14.0523 14.0523 14.5 13.5 14.5H1.5C0.947716 14.5 0.5 14.0523 0.5 13.5V3.5C0.5 2.94772 0.947715 2.5 1.5 2.5Z" stroke="#000000"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Search Button -->
      <div id="filter-btn-wrap" class="flex-grow lg:w-auto">
        <a href="#" class="block">
          <button
            id="search-button"
            class="bg-[#73C440] text-white text-sm font-bold uppercase py-3 px-6 w-full rounded-lg shadow-md hover:bg-[#0B2846] transition-all">
            Search
          </button>
        </a>
      </div>
    </div>
  </aside>
</section>
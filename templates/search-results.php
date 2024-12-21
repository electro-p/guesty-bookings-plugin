<section class="sm:mx-6 md:mx-10 lg:mx-12 px-3">
    
    <div id="filter-bar" class="filter-bar">
        <form id="filter-form" class="flex flex-col gap-6 lg:flex-row lg:gap-4 lg:items-end p-4 bg-gray-100 rounded-md items-end">
            <div class="flex flex-col w-full lg:w-auto">
                <label for="filter-state">City:</label>
                <select
                    type="text" id="filter-city" name="city" class="border p-2 rounded-md">
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
            <div class="flex flex-col w-full lg:w-auto">
                <label for="filter-checkin">Check-In:</label>
                <input type="text" id="filter-checkin" name="checkdate" class="border p-2 rounded-md" />
            </div>
            <div class="flex flex-col w-full lg:w-auto">
                <label for="filter-checkout">Check-Out:</label>
                <input type="text" id="filter-checkout" name="checkdate" class="border p-2 rounded-md" />
            </div>
            <div class="flex flex-col w-full lg:w-auto">
                <label for="filter-guests">Guests:</label>
                <select
                    id="filter-guests" name="guests" class="border p-2 rounded-md">
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
            <div id="filter-btn-wrap" class="flex-grow lg:w-auto">
                <button id="filter-btn" type="submit" class="bg-[#73C440] text-white p-2 rounded-md transition-all">Apply Filters</button>
            </div>
        </form>
    </div>
    <div class="py-3 sm:py-5">
        <div id="results-container"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">

            <div role="status" class="property max-w-md animate-pulse space-y-4">
                <!-- Image Placeholder -->
                <div class="relative">
                    <div class="w-full h-48 bg-gray-200 rounded-[1.3rem] dark:bg-gray-700"></div>
                    <div class="absolute inset-0 grad rounded-b-[1.3rem]"></div>
                </div>

                <!-- Content Placeholder -->
                <div class="space-y-4 px-3 py-4 bg-[#f9f6f0]">
                    <!-- Location -->
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>

                    <!-- Title -->
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>

                    <!-- Price -->
                    <div class="flex justify-between items-baseline">
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
                        <div class="flex gap-2">
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="w-full h-[1px] bg-gray-300"></div>

                    <!-- Icons -->
                    <div class="flex gap-4">
                        <div class="flex items-center gap-1">
                            <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
                        </div>
                        <div class="flex items-center gap-1">
                            <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
                        </div>
                        <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>
                <span class="sr-only">Loading...</span>
            </div>

            <div role="status" class="property max-w-md animate-pulse space-y-4">
                <!-- Image Placeholder -->
                <div class="relative">
                    <div class="w-full h-48 bg-gray-200 rounded-[1.3rem] dark:bg-gray-700"></div>
                    <div class="absolute inset-0 grad rounded-b-[1.3rem]"></div>
                </div>

                <!-- Content Placeholder -->
                <div class="space-y-4 px-3 py-4 bg-[#f9f6f0]">
                    <!-- Location -->
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>

                    <!-- Title -->
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>

                    <!-- Price -->
                    <div class="flex justify-between items-baseline">
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
                        <div class="flex gap-2">
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="w-full h-[1px] bg-gray-300"></div>

                    <!-- Icons -->
                    <div class="flex gap-4">
                        <div class="flex items-center gap-1">
                            <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
                        </div>
                        <div class="flex items-center gap-1">
                            <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
                        </div>
                        <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>
                <span class="sr-only">Loading...</span>
            </div>

            <div role="status" class="property max-w-md animate-pulse space-y-4">
                <!-- Image Placeholder -->
                <div class="relative">
                    <div class="w-full h-48 bg-gray-200 rounded-[1.3rem] dark:bg-gray-700"></div>
                    <div class="absolute inset-0 grad rounded-b-[1.3rem]"></div>
                </div>

                <!-- Content Placeholder -->
                <div class="space-y-4 px-3 py-4 bg-[#f9f6f0]">
                    <!-- Location -->
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>

                    <!-- Title -->
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>

                    <!-- Price -->
                    <div class="flex justify-between items-baseline">
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
                        <div class="flex gap-2">
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="w-full h-[1px] bg-gray-300"></div>

                    <!-- Icons -->
                    <div class="flex gap-4">
                        <div class="flex items-center gap-1">
                            <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
                        </div>
                        <div class="flex items-center gap-1">
                            <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
                        </div>
                        <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>
                <span class="sr-only">Loading...</span>
            </div>

            <div role="status" class="property max-w-md animate-pulse space-y-4">
                <!-- Image Placeholder -->
                <div class="relative">
                    <div class="w-full h-48 bg-gray-200 rounded-[1.3rem] dark:bg-gray-700"></div>
                    <div class="absolute inset-0 grad rounded-b-[1.3rem]"></div>
                </div>

                <!-- Content Placeholder -->
                <div class="space-y-4 px-3 py-4 bg-[#f9f6f0]">
                    <!-- Location -->
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>

                    <!-- Title -->
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>

                    <!-- Price -->
                    <div class="flex justify-between items-baseline">
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
                        <div class="flex gap-2">
                            <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                            <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="w-full h-[1px] bg-gray-300"></div>

                    <!-- Icons -->
                    <div class="flex gap-4">
                        <div class="flex items-center gap-1">
                            <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
                        </div>
                        <div class="flex items-center gap-1">
                            <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
                        </div>
                        <div class="w-5 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>
                <span class="sr-only">Loading...</span>
            </div>

        </div>
    </div>
</section>
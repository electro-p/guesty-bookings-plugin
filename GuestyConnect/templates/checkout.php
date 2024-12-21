<section class="flex flex-col w-full md:flex-row relative justify-center mx-auto mt-5 mb-5">
    <aside class="md:order-2 md:pr-5 md:w-1/3 relative" id="listing-to-checkout">
        <!-- Listing details will be rendered here -->
        <div role="status" class="animate-pulse flex flex-col gap-4 md:bg-[#FFFBF2] rounded-lg md:sticky md:top-24 lg:top-32 md:right-0">
            <section class="flex flex-col gap-3 py-4 px-5 w-full items-center">
                <div class="relative w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-700"></div>
                <aside class="flex w-full flex-col gap-2 px-5">
                    <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-2"></div>
                    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                    <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 md:hidden"></div>
                </aside>
            </section>
            <div class="separator bg-gray-300 hidden md:block w-full h-0.5"></div>
            <section class="px-5 w-full pb-4">
                <aside class="flex flex-col gap-3 w-full">
                    <div class="flex justify-between items-center">
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4"></div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4"></div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4"></div>
                    </div>
                    <div class="separator bg-gray-300 hidden md:block w-full h-0.5"></div>
                    <div class="flex justify-between items-center">
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                        <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4"></div>
                    </div>
                </aside>
            </section>
            <span class="sr-only">Loading...</span>
        </div>
    </aside>
    <div class="separator bg-[#e0e0e0] md:hidden my-6 h-[1px] w-full"></div>
    <aside class="flex gap-4 w-full md:px-5 items-start md:w-2/3 max-w-[700px]" id="guest-info">
        <!-- Guest info form will be rendered here -->
    </aside>
    <aside class="flex w-full gap-2 md:px-5 md:w-2/3 max-w-[700px]" id="payment-section" style="display: none;">
        <div id="payment-form">
            <!-- Payment form will be rendered here -->
            <div id="guesty-tokenization-container"></div>
            <button id="payment-submit-button" class="bg-[#0B2846] text-white w-100 px-6 py-3 rounded-[7px] text-sm font-medium">
                <span>Submit Payment</span>
                <svg id="spinner" class="hidden ml-2 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
            </button>
        </div>
    </aside>
</section>
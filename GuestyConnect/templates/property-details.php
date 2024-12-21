<style>
    h3.details-text-head {
        font-size: 1.75rem;
        line-height: 1.75rem;
        font-weight: 600;
    }

    .elementor img {
        height: 100%;
    }
</style>

<div class="preloader">
    <div class="animation animation-rotating-square"></div>
</div>
<section class="w-full relative">
    <!-- URL component start -->
    <aside id="urls"
        class="flex justify-center flex-wrap border-b border-black pb-4 gap-3 text-[rgba(98,89,86,.5)] font-normal">
    </aside>
    <!-- URL component end -->
    <section class="bg-[#fafafa] py-4 flex flex-col gap-4">
        <h1 class="text-3xl text-black text-center font-playfair" id="nickname"></h1>
        <section id="property-images" class="w-full px-12"></section>

        <section class="w-full px-12">
            <!-- Slider main container -->
            <div class="swiper">
                <!-- Additional required wrapper -->
                <div id="property-carousel" class="swiper-wrapper">
                    <!-- Slides -->
                    <!-- <div class="swiper-slide">Slide 1</div> -->
                </div>
                <!-- If we need pagination -->
                <div class="swiper-pagination text-[#625956]"></div>

                <!-- If we need navigation buttons -->
                <div class="swiper-button-prev text-[#625956] "></div>
                <div class="swiper-button-next text-[#625956]"></div>

                <!-- If we need scrollbar -->
                <div class="swiper-scrollbar"></div>
            </div>
        </section>

        <div class="relative w-100 h-100 inset-0" id="all-photos-container">
            <div class="absolute inset-0 w-80 h-96 overflow-hidden border border-gray-300 rounded-lg bg-white"
                id="view-all-photos">

                <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
                    <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                        <svg class="w-100 h-20 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                        <svg class="w-100 h-20 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>


            </div>
        </div>
        <!-- bg-[#fafafa] max-w-[1200px] -->
        <main class="bg-[#fafafa] sm:px-12 relative md:flex justify-between md:gap-6 w-full mx-auto">
            <section class="w-full relative md:order-2 md:w-auto">
                <aside class="relative md:sticky md:top-24 lg:top-28 md:right-0 lg:right-0">
                    <div
                        class="w-full md:min-w-[370px] max-w-[400px] bg-white p-3 sm:p-6 rounded-md sm:rounded-[20px] mx-auto md:ml-auto modal-shadow"
                        id="booking-modal">
                        <!-- Content will be dynamically generated here -->
                    </div>
                </aside>
            </section>
            <section class="w-full relative md:w-auto">
            <div id="property-info"></div>
            </section>
        </main>
        <section class="sm:px-12 relative w-full mx-auto">
                <div class="shrink-0 bg-border h-[1px] w-full my-6 separator"></div>
                <div class="w-full" id="reviews-section"></div>
        </section>
    </section>
</section>
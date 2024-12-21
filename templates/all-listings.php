<style>
    .elementor img {
        height: 100%;
    }

    .elementor-kit-8 h3 {
        height: 2rem;
    }

    .swiper {
        height: 200px;
    }
</style>
<section class="sm:mx-6 md:mx-10 lg:mx-12 px-3">
    <div class="py-3 sm:py-5">
        <div class="flex justify-center m-10 w-full" id="spinner-container">
            <svg id="spinner" class="hidden ml-2 w-4 h-4 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
        </div>
        <div id="properties-container"
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
        <div id="pagination-container" class="flex justify-center m-10"></div>
    </div>
</section>
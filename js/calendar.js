async function fetchAvailability() {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 2);

    const endpoint = `listings/${propertyId}/calendar?from=${startDate.toISOString().split("T")[0]}&to=${endDate.toISOString().split("T")[0]}`;
    // console.log(endpoint);
    const url = `${guestyData.pluginUrl}guesty-server/proxy.php?endpoint=${encodeURIComponent(endpoint)}`;
    const response = await fetch(`${url}`);

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
        const currentDate = new Date(item.date);
        const dateStr = currentDate.toLocaleDateString();

        if (item.status === 'unavailable') {
            // Fully unavailable dates should always be disabled
            unavailableDates.add(dateStr);
        } else if (item.status === 'reserved' || item.status === 'booked') {
            // Check next day's status
            const nextDate = new Date(currentDate);
            nextDate.setDate(currentDate.getDate() + 1);
            const nextDateString = nextDate.toISOString().split('T')[0];
            const nextDayData = dateStatusMap.get(nextDateString);

            // Check previous day's status
            const prevDate = new Date(currentDate);
            prevDate.setDate(currentDate.getDate() - 1);
            const prevDateString = prevDate.toISOString().split('T')[0];
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
        maxDate: new Date().fp_incr(365 * 2), // 2 years from today
        disable: [
            function (date) {
                return unavailableDates.has(date.toLocaleDateString());
            }
        ],
        onChange: function (selectedDates) {
            if (selectedDates.length === 1) {
                dateRange.from = selectedDates[0];
                // Fix: Use toLocaleDateString to maintain timezone
                const formattedDate = selectedDates[0].toLocaleDateString('en-CA'); // YYYY-MM-DD format
                document.getElementById("start-date").value = formattedDate;
                document.getElementById("start-date").style.fontWeight = "700";
            } else if (selectedDates.length === 2) {
                dateRange.from = selectedDates[0];
                dateRange.to = selectedDates[1];

                // Fix: Use toLocaleDateString for both dates
                const startDate = selectedDates[0].toLocaleDateString('en-CA');
                const endDate = selectedDates[1].toLocaleDateString('en-CA');

                document.getElementById("start-date").value = startDate;
                document.getElementById("end-date").value = endDate;
                document.getElementById("start-date").style.fontWeight = "700";
                document.getElementById("end-date").style.fontWeight = "700";
            }
        }
    });
}






function getUnavailableDates(data) {
    const unavailableDates = new Set();
    const validCheckinDates = new Set();
    const validCheckoutDates = new Set();

    // Create a map for easier lookup
    const dateStatusMap = new Map(data.map(item => [item.date, item]));

    data.forEach(item => {
        const currentDate = new Date(item.date + 'T00:00:00Z');
        const dateStr = currentDate.toISOString().split('T')[0];

        // Skip unavailable days entirely
        if (item.status === 'unavailable') {
            unavailableDates.add(dateStr);
            return;
        }

        // Reserved or booked days
        if (item.status === 'reserved' || item.status === 'booked') {
            // Previous and next day data
            const prevDate = new Date(currentDate);
            prevDate.setUTCDate(prevDate.getUTCDate() - 1);
            const prevDateString = prevDate.toISOString().split('T')[0];
            const prevDayData = dateStatusMap.get(prevDateString);

            const nextDate = new Date(currentDate);
            nextDate.setUTCDate(nextDate.getUTCDate() + 1);
            const nextDateString = nextDate.toISOString().split('T')[0];
            const nextDayData = dateStatusMap.get(nextDateString);

            // Check-in: current day is start of reservation OR after available day
            if (!prevDayData || prevDayData.status === 'available') {
                validCheckinDates.add(dateStr);
            }

            // Check-out: current day is end of reservation OR before available day
            if (!nextDayData || nextDayData.status === 'available') {
                validCheckoutDates.add(dateStr);
            }

            // Mark as unavailable only if not valid for check-in or check-out
            if (!validCheckinDates.has(dateStr) && !validCheckoutDates.has(dateStr)) {
                unavailableDates.add(dateStr);
            }
        }
    });

    return { unavailableDates, validCheckinDates, validCheckoutDates };
}

async function initializeDatepicker() {
    const availabilityData = await fetchAvailability();
    const { unavailableDates, validCheckinDates, validCheckoutDates } = getUnavailableDates(availabilityData);

    // Enable the datepicker input field after fetching data
    const dateInput = document.querySelectorAll("input[name='date']");
    dateInput.disabled = false;

    // Flatpickr date picker initialization
    const picker = flatpickr("input[name='date']", {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        maxDate: new Date().fp_incr(365 * 2),
        disable: [
            function (date, _, fp) {
                const dateString = date.toISOString().split('T')[0];

                // If selecting the first date (check-in)
                if (!fp.selectedDates.length) {
                    // Enable valid check-in dates or available dates
                    return !validCheckinDates.has(dateString) && unavailableDates.has(dateString);
                }

                // If selecting the second date (check-out)
                const checkInDate = fp.selectedDates[0];
                const checkInStr = checkInDate.toISOString().split('T')[0];

                // Allow valid check-out dates or available dates
                if (validCheckinDates.has(checkInStr)) {
                    return !validCheckoutDates.has(dateString);
                }

                // For normal available dates
                return unavailableDates.has(dateString);
            }
        ],
        onChange: function (selectedDates) {
            if (selectedDates.length === 1) {
                dateRange.from = selectedDates[0];
                const formattedDate = selectedDates[0].toISOString().split('T')[0];
                document.getElementById("start-date").value = formattedDate;
                document.getElementById("start-date").style.fontWeight = "700";
            } else if (selectedDates.length === 2) {
                dateRange.from = selectedDates[0];
                dateRange.to = selectedDates[1];

                const startDate = selectedDates[0].toISOString().split('T')[0];
                const endDate = selectedDates[1].toISOString().split('T')[0];

                document.getElementById("start-date").value = startDate;
                document.getElementById("end-date").value = endDate;
                document.getElementById("start-date").style.fontWeight = "700";
                document.getElementById("end-date").style.fontWeight = "700";
            }
        }
    });
}

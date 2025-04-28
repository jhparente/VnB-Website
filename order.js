// smooth scroll when order-button is click
const buttonOrder = document.getElementById('button-order');

buttonOrder.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#sec2');
    const targetOffset = target.offsetTop;

    smoothScrollTo(targetOffset);
});

function smoothScrollTo(targetOffset) {
    let scrollToAmount = targetOffset - window.scrollY;


    scrollAmount = scrollToAmount * speedMultiplier;
    isScrolling = true;

    if (!ticking) {
        animateScroll();
        ticking = true;
    }
}

// input image
let allFiles = [];
let uploadedImageUrls = [];
let isUploading = false; // Track upload status

function handleFiles(input) {
    const newFiles = input.files;

    allFiles = []; // clear old filenames
    uploadedImageUrls = []; // clear old uploaded links
    isUploading = true; // Set uploading status to true when starting

    if (newFiles.length > 5) {
        alert("You can only upload up to 5 files at a time.");
        input.value = ''; // Clear the file input
        return; // Exit the function
    }

    for (let i = 0; i < newFiles.length; i++) {
        allFiles.push(newFiles[i].name);
    }

    // Update upload button text
    if (allFiles.length > 0) {
        if (allFiles.length > 3) {
            document.getElementById('uploadBtn').textContent = `${allFiles.length} files selected`;
        } else {
            document.getElementById('uploadBtn').textContent = allFiles.join(', ');
        }
    }

    const uploadPromises = [];

    if (newFiles.length > 0) {
        for (let i = 0; i < newFiles.length; i++) {
            const file = newFiles[i];
            const formData = new FormData();
            formData.append('image', file);

            const uploadPromise = fetch('https://api.imgur.com/3/image', {
                method: 'POST',
                headers: {
                    Authorization: 'Client-ID 3c8a752e6f9d3b5'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    uploadedImageUrls.push(data.data.link);
                } else {
                    alert("Failed to upload an image.");
                }
            })
            .catch(error => console.log('Error uploading image:', error));

            uploadPromises.push(uploadPromise);
        }

        // After all uploads finish
        Promise.all(uploadPromises).then(() => {
            alert('✅ All images uploaded!');
            console.log(uploadedImageUrls);
            isUploading = false; // Set uploading status to false when done
        });
    } else {
        isUploading = false; // No files to upload
    }
}


const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
const daySelect = document.getElementById('day');
const currentYear = new Date().getFullYear();

// Populate year options
for (let i = 0; i <= 5; i++) {
    const year = currentYear + i;
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
}

function updateDays() {
    const month = parseInt(monthSelect.value);
    const year = parseInt(yearSelect.value);

    if (!month || !year) {
        daySelect.innerHTML = '<option value="">-- day --</option>';
        return;
    }

    const daysInMonth = new Date(year, month, 0).getDate();

    daySelect.innerHTML = '<option value="">-- day --</option>';

    for (let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement('option');
        option.value = i.toString().padStart(2, '0');
        option.textContent = i.toString().padStart(2, '0');
        daySelect.appendChild(option);
    }
}

monthSelect.addEventListener('change', updateDays);
yearSelect.addEventListener('change', updateDays);

updateDays();

const timeInput = document.getElementById('time');
const minTime = "08:00";
const maxTime = "19:59";

timeInput.addEventListener('change', function () {
    const selectedTime = timeInput.value;

    if (selectedTime < minTime || selectedTime > maxTime) {
        alert("Please select a time between 8:00 AM and 7:59 PM.");
        timeInput.value = '';
    }
});

const monthSelect2 = document.getElementById('month2');
const yearSelect2 = document.getElementById('year2');
const daySelect2 = document.getElementById('day2');
const timeInput2 = document.getElementById('time2');

for (let i = 0; i <= 5; i++) {
    const year = currentYear + i;
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect2.appendChild(option);
}

function updateDays2() {
    const month = parseInt(monthSelect2.value);
    const year = parseInt(yearSelect2.value);
    if (!month || !year) {
        daySelect2.innerHTML = '<option value="">-- day --</option>';
        return;
    }

    const daysInMonth = new Date(year, month, 0).getDate();

    daySelect2.innerHTML = '<option value="">-- day --</option>';

    for (let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement('option');
        option.value = i.toString().padStart(2, '0');
        option.textContent = i.toString().padStart(2, '0');
        daySelect2.appendChild(option);
    }
}

monthSelect2.addEventListener('change', updateDays2);
yearSelect2.addEventListener('change', updateDays2);

updateDays2();

function disableTime2() {
    const minTime2 = "08:00";
    const maxTime2 = "19:59";

    timeInput2.addEventListener('change', function () {
        const selectedTime2 = timeInput2.value;
        if (selectedTime2 < minTime2 || selectedTime2 > maxTime2) {
            alert("Please select a time between 8:00 AM and 7:59 PM.");
            timeInput2.value = ''; 
        }
    });
}

disableTime2();

function convertTo12HourFormat(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; 
    const minutesFormatted = minutes.toString().padStart(2, '0');
    return `${hours12}:${minutesFormatted} ${period}`;
}

function updateSummary() {
    const formattedDate1 = `${monthSelect.value || '--'}/${daySelect.value || '--'}/${yearSelect.value || '--'}`;
    const formattedTime1 = timeInput.value ? convertTo12HourFormat(timeInput.value) : '--';

    const formattedDate2 = `${monthSelect2.value || '--'}/${daySelect2.value || '--'}/${yearSelect2.value || '--'}`;
    const formattedTime2 = timeInput2.value ? convertTo12HourFormat(timeInput2.value) : '--';

    document.getElementById('date-here').textContent = formattedDate1;
    document.getElementById('time-here').textContent = formattedTime1;
    document.getElementById('date2-here').textContent = formattedDate2;
    document.getElementById('time2-here').textContent = formattedTime2;
}

monthSelect.addEventListener('change', updateSummary);
yearSelect.addEventListener('change', updateSummary);
daySelect.addEventListener('change', updateSummary);
timeInput.addEventListener('input', updateSummary);

monthSelect2.addEventListener('change', updateSummary);
yearSelect2.addEventListener('change', updateSummary);
daySelect2.addEventListener('change', updateSummary);
timeInput2.addEventListener('input', updateSummary);

function updateSubmitReservation() {
    const formattedDate1 = `${monthSelect.value || '--'}/${daySelect.value || '--'}/${yearSelect.value || '--'}`;
    const formattedTime1 = timeInput.value ? convertTo12HourFormat(timeInput.value) : '--';

    const formattedDate2 = `${monthSelect2.value || '--'}/${daySelect2.value || '--'}/${yearSelect2.value || '--'}`;
    const formattedTime2 = timeInput2.value ? convertTo12HourFormat(timeInput2.value) : '--';

    document.getElementById('submit-date-here').textContent = formattedDate1;
    document.getElementById('submit-time-here').textContent = formattedTime1;
    document.getElementById('submit-date2-here').textContent = formattedDate2;
    document.getElementById('submit-time2-here').textContent = formattedTime2;
}

monthSelect.addEventListener('change', updateSubmitReservation);
yearSelect.addEventListener('change', updateSubmitReservation);
daySelect.addEventListener('change', updateSubmitReservation);
timeInput.addEventListener('input', updateSubmitReservation);

monthSelect2.addEventListener('change', updateSubmitReservation);
yearSelect2.addEventListener('change', updateSubmitReservation);
daySelect2.addEventListener('change', updateSubmitReservation);
timeInput2.addEventListener('input', updateSubmitReservation);

updateSubmitReservation();

updateSummary();

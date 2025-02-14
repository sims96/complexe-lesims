// This is a list of images that will be shown in rotation on the homepage banner area
const backgroundImages = [
    'images/background.jpg',
    'images/background2.jpg',
    'images/background3.jpg',
    'images/background4.jpg',
    'images/background5.jpg',
    'images/background6.jpg'
];

// Set up the email service that will handle sending reservation emails
(function() {
    emailjs.init("NT9eXrRltzW9mqiFx");
})();

// When the webpage finishes loading, set up all the interactive features
document.addEventListener('DOMContentLoaded', () => {
    // If someone clicked a link to a specific section of our page (like #menu or #contact),
    // smoothly scroll to that section
    if (window.location.hash) {
        const element = document.querySelector(window.location.hash);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }

    // Make all navigation links scroll smoothly when clicked, instead of jumping directly
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Set up the reservation form to handle submissions
    const form = document.getElementById('reservationForm');
    const submitButton = document.getElementById('submitButton');
    const messageDiv = document.getElementById('formMessage');

    // When someone submits the reservation form
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear any previous success/error messages and disable the submit button
        messageDiv.innerHTML = '';
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Gather all the information from the reservation form
        const templateParams = {
            name: form.elements['name'].value, 
            from_name: form.elements['name'].value,
            reply_to: form.elements['email'].value,
            email: form.elements['email'].value,
            phone: form.elements['phone'].value,
            date: form.elements['date'].value,
            time: form.elements['time'].value,
            guests: form.elements['guests'].value,
            message: form.elements['requests'].value,
            to_email: 'simondomfabrice@gmail.com'
        };

        // Check if the email address looks valid
        if (!isValidEmail(templateParams.email)) {
            messageDiv.innerHTML = '<div class="error">Please enter a valid email address</div>';
            submitButton.disabled = false;
            submitButton.textContent = 'Reserve Table';
            return;
        }

        // Check if all form fields are filled out correctly
        const errors = validateForm(templateParams);
        if (errors.length > 0) {
            messageDiv.innerHTML = `<div class="error">${errors.join('<br>')}</div>`;
            submitButton.disabled = false;
            submitButton.textContent = 'Reserve Table';
            return;
        }

        // Show loading state and send the reservation email
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        console.log('Attempting to send email with params:', templateParams);

        // Try to send the reservation email
        emailjs.send('service_td3si8d', 'template_2191jso', templateParams)
            .then(function(response) {
                // If email sends successfully, show success message and clear the form
                console.log('SUCCESS:', response);
                messageDiv.innerHTML = '<div class="success">Reservation sent successfully!</div>';
                form.reset();
                submitButton.classList.remove('loading');
            })

            .catch(function(error) {
                // If there's an error sending the email, show error message
                console.error('FAILED:', error);
                messageDiv.innerHTML = '<div class="error">Failed to send reservation: ' + error.text + '</div>';
                submitButton.classList.remove('loading');
            })

            .finally(function() {
                // Re-enable the submit button whether successful or not
                submitButton.disabled = false;
                submitButton.textContent = 'Reserve Table';
            });
              // If email sends successfully, show success message and clear the form
              console.log('SUCCESS:', response);
              messageDiv.innerHTML = '<div class="success">Reservation sent successfully!</div>';
              form.reset();
              
              // Make success message disappear after 3 seconds
              setTimeout(() => {
                  messageDiv.innerHTML = '';
              }, 3000);
    });
});

// Check if an email address is properly formatted
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Check if all form fields are filled out correctly
function validateForm(formData) {
    const errors = [];
    
    // Make sure phone number contains only numbers, spaces, or dashes and is long enough
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(formData.phone)) {
        errors.push('Please enter a valid phone number');
    }

    // Make sure the selected date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    if (selectedDate < today) {
        errors.push('Please select a future date');
    }

    // Make sure the selected time is during business hours (9 AM to 10 PM)
    const [hours, minutes] = formData.time.split(':');
    if (hours < 9 || hours > 22) {
        errors.push('Please select a time between 9:00 AM and 10:00 PM');
    }

    return errors;
}



// Synchronize number input with select dropdown
document.addEventListener('DOMContentLoaded', function() {
    const numberInput = document.getElementById('guests-number');
    const selectInput = document.getElementById('guests');

    // Update select when number input changes
    numberInput.addEventListener('input', function() {
        const value = this.value;
        
        // Ensure value is within bounds
        if (value < 0) this.value = 0;
        if (value > 50) this.value = 50;

        // Try to find exact match in select
        const option = Array.from(selectInput.options).find(opt => opt.value === value);
        
        if (option) {
            selectInput.value = value;
        } else {
            // If no exact match, select the "30+" option for larger numbers
            if (value >= 30) {
                selectInput.value = "30";
            } else {
                // Reset select to placeholder if no match
                selectInput.selectedIndex = 0;
            }
        }
    });

    // Update number input when select changes
    selectInput.addEventListener('change', function() {
        if (this.value) {
            numberInput.value = this.value;
        }
    });
});


// Handle the automatic changing of background images in the hero section
function changeHeroBackground() {
    const hero = document.querySelector('.hero');
    let currentIndex = 0;
    
    // Load all images in advance to prevent delays when switching
    backgroundImages.forEach(imgSrc => {
        const img = new Image();
        img.src = imgSrc;
    });

    // Change the background image every 3 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % backgroundImages.length;
        hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${backgroundImages[currentIndex]}')`;
    }, 5000);
}

// Start the background image rotation when the page loads
document.addEventListener('DOMContentLoaded', changeHeroBackground);
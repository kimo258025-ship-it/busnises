/* =========================================================
   NEXORA BUSINESS WEBSITE
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const body = document.body;
const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");
const loader = document.querySelector(".loader");
const backTop = document.querySelector(".back-top");

const faqItems = document.querySelectorAll(".faq-item");

const testimonialItems = document.querySelectorAll(".testimonial");
const nextTestimonial = document.querySelector(".testimonial-next");
const prevTestimonial = document.querySelector(".testimonial-prev");

const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");

let currentTestimonial = 0;


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hidden");
        }

    }, 700);

});


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("open");
        body.classList.toggle("menu-open");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            if (navbar.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

}


/* =========================================================
   CLOSE MOBILE NAVIGATION
========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navbar) {
            navbar.classList.remove("open");
        }

        body.classList.remove("menu-open");

        const icon = menuToggle?.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === `#${sectionId}`) {
                    link.classList.add("active");
                }

            });

        }

    });

}


window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


/* =========================================================
   FAQ ACCORDION
========================================================= */

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(otherItem => {
            otherItem.classList.remove("active");
        });

        if (!isActive) {
            item.classList.add("active");
        }

    });

});


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

function showTestimonial(index) {

    if (!testimonialItems.length) return;

    if (index >= testimonialItems.length) {
        currentTestimonial = 0;
    }

    if (index < 0) {
        currentTestimonial = testimonialItems.length - 1;
    }

    testimonialItems.forEach(item => {
        item.classList.remove("active");
    });

    testimonialItems[currentTestimonial].classList.add("active");

}


function nextSlide() {

    currentTestimonial++;

    showTestimonial(currentTestimonial);

}


function previousSlide() {

    currentTestimonial--;

    showTestimonial(currentTestimonial);

}


if (nextTestimonial) {

    nextTestimonial.addEventListener("click", nextSlide);

}


if (prevTestimonial) {

    prevTestimonial.addEventListener("click", previousSlide);

}


showTestimonial(currentTestimonial);


/* =========================================================
   AUTO TESTIMONIAL SLIDER
========================================================= */

let testimonialInterval;

function startTestimonialSlider() {

    if (testimonialItems.length <= 1) return;

    testimonialInterval = setInterval(() => {

        nextSlide();

    }, 6000);

}


function stopTestimonialSlider() {

    clearInterval(testimonialInterval);

}


if (nextTestimonial) {

    nextTestimonial.addEventListener(
        "mouseenter",
        stopTestimonialSlider
    );

    nextTestimonial.addEventListener(
        "mouseleave",
        startTestimonialSlider
    );

}


if (prevTestimonial) {

    prevTestimonial.addEventListener(
        "mouseenter",
        stopTestimonialSlider
    );

    prevTestimonial.addEventListener(
        "mouseleave",
        startTestimonialSlider
    );

}


startTestimonialSlider();


/* =========================================================
   CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const nameInput = contactForm.querySelector(
            'input[name="name"]'
        );

        const emailInput = contactForm.querySelector(
            'input[name="email"]'
        );

        const messageInput = contactForm.querySelector(
            "textarea"
        );

        const name = nameInput?.value.trim();
        const email = emailInput?.value.trim();
        const message = messageInput?.value.trim();

        if (!name || !email || !message) {

            if (formMessage) {

                formMessage.textContent =
                    "Please complete all required fields.";

            }

            return;

        }


        if (!validateEmail(email)) {

            if (formMessage) {

                formMessage.textContent =
                    "Please enter a valid email address.";

            }

            return;

        }


        if (formMessage) {

            formMessage.textContent =
                "Your message has been received successfully.";

        }


        contactForm.reset();

    });

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


/* =========================================================
   BACK TO TOP
========================================================= */

function updateBackTop() {

    if (!backTop) return;

    if (window.scrollY > 600) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

}


window.addEventListener("scroll", updateBackTop);

updateBackTop();


if (backTop) {

    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

const counters = document.querySelectorAll(
    "[data-count]"
);

let countersStarted = false;


function animateCounter(counter) {

    const target =
        Number(counter.dataset.count);

    const duration = 1800;

    const startTime = performance.now();

    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);

        const eased =
            1 - Math.pow(1 - progress, 3);

        const value =
            Math.floor(target * eased);

        counter.textContent = value.toLocaleString();

        if (progress < 1) {

            requestAnimationFrame(updateCounter);

        } else {

            counter.textContent =
                target.toLocaleString();

        }

    }

    requestAnimationFrame(updateCounter);

}


function startCounters() {

    if (countersStarted) return;

    const statsSection =
        document.querySelector(".stats");

    if (!statsSection) return;

    const rect =
        statsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.85) {

        countersStarted = true;

        counters.forEach(counter => {
            animateCounter(counter);
        });

    }

}


window.addEventListener("scroll", startCounters);

startCounters();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".service-card, .project, .process-item, .price-card, .testimonial, .contact-form"
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


function revealOnScroll() {

    revealElements.forEach(element => {

        const rect =
            element.getBoundingClientRect();

        if (rect.top < window.innerHeight - 80) {

            element.style.opacity = "1";
            element.style.transform = "translateY(0)";

        }

    });

}


window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (navbar) {
            navbar.classList.remove("open");
        }

        body.classList.remove("menu-open");

        const icon =
            menuToggle?.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }


    if (
        event.key === "ArrowRight" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
    ) {

        nextSlide();

    }


    if (
        event.key === "ArrowLeft" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
    ) {

        previousSlide();

    }

});


/* =========================================================
   RESIZE HANDLER
========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 850) {

        if (navbar) {
            navbar.classList.remove("open");
        }

        body.classList.remove("menu-open");

        const icon =
            menuToggle?.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }

});


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateHeader();
    updateBackTop();
    updateActiveLink();
    revealOnScroll();

});

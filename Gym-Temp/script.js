/* =========================================
   IRONFORGE FITNESS
   JAVASCRIPT
========================================= */


/* =========================================
   PRELOADER
========================================= */

window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 500);

});


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* CLOSE MOBILE MENU */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================
   ANIMATED COUNTERS
========================================= */

const counters = document.querySelectorAll("[data-target]");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target = Number(
            counter.getAttribute("data-target")
        );

        let current = 0;

        const increment = Math.max(
            1,
            Math.ceil(target / 80)
        );

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent =
                    target.toLocaleString();

                return;
            }

            counter.textContent =
                current.toLocaleString();

            requestAnimationFrame(updateCounter);
        };

        updateCounter();

    });

}


const statsSection = document.querySelector(".stats");

const statsObserver = new IntersectionObserver(
    entries => {

        if (entries[0].isIntersecting) {
            startCounters();
        }

    },
    {
        threshold: 0.4
    }
);

statsObserver.observe(statsSection);


/* =========================================
   CLASS FILTER
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const classCards =
    document.querySelectorAll(".class-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        classCards.forEach(card => {

            const category =
                card.getAttribute("data-category");

            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =========================================
   BMI CALCULATOR
========================================= */

function calculateBMI() {

    const height =
        parseFloat(document.getElementById("height").value);

    const weight =
        parseFloat(document.getElementById("weight").value);

    const result =
        document.getElementById("bmiResult");


    if (
        !height ||
        !weight ||
        height <= 0 ||
        weight <= 0
    ) {

        result.textContent =
            "Please enter a valid height and weight.";

        return;
    }


    const heightMeters = height / 100;

    const bmi =
        weight / (heightMeters * heightMeters);

    let category = "";


    if (bmi < 18.5) {

        category = "Underweight";

    } else if (bmi < 25) {

        category = "Healthy range";

    } else if (bmi < 30) {

        category = "Overweight";

    } else {

        category = "Obesity range";

    }


    result.innerHTML = `
        Your BMI is
        <strong>${bmi.toFixed(1)}</strong>
        — ${category}.
    `;

}


/* =========================================
   TESTIMONIAL SLIDER
========================================= */

const testimonials = [

    {
        text:
            "IronForge completely changed my approach to fitness. The trainers actually care about your progress and the community is incredible.",

        name:
            "Priya Sharma",

        role:
            "Member since 2023",

        initials:
            "PS"
    },

    {
        text:
            "I lost 14kg in eight months and, more importantly, finally built a workout routine I can maintain. The coaching is excellent.",

        name:
            "Rahul Kapoor",

        role:
            "Member since 2022",

        initials:
            "RK"
    },

    {
        text:
            "The equipment is fantastic, the staff is friendly and every session feels productive. IronForge feels like a second home.",

        name:
            "Neha Malhotra",

        role:
            "Member since 2024",

        initials:
            "NM"
    }

];


let currentTestimonial = 0;

const testimonialText =
    document.getElementById("testimonialText");

const memberName =
    document.getElementById("memberName");

const memberRole =
    document.getElementById("memberRole");

const memberAvatar =
    document.getElementById("memberAvatar");

const sliderDots =
    document.getElementById("sliderDots");


/* CREATE DOTS */

testimonials.forEach((_, index) => {

    const dot =
        document.createElement("button");

    dot.addEventListener("click", () => {

        currentTestimonial = index;

        updateTestimonial();

    });

    sliderDots.appendChild(dot);

});


function updateTestimonial() {

    const item =
        testimonials[currentTestimonial];

    testimonialText.textContent =
        `"${item.text}"`;

    memberName.textContent =
        item.name;

    memberRole.textContent =
        item.role;

    memberAvatar.textContent =
        item.initials;


    const dots =
        sliderDots.querySelectorAll("button");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentTestimonial
        );

    });

}


function changeTestimonial(direction) {

    currentTestimonial += direction;

    if (
        currentTestimonial >=
        testimonials.length
    ) {
        currentTestimonial = 0;
    }

    if (currentTestimonial < 0) {
        currentTestimonial =
            testimonials.length - 1;
    }

    updateTestimonial();

}


updateTestimonial();


/* AUTO SLIDE */

setInterval(() => {

    changeTestimonial(1);

}, 6000);


/* =========================================
   FAQ ACCORDION
========================================= */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");


    question.addEventListener("click", () => {

        const isOpen =
            item.classList.contains("open");


        /* CLOSE ALL */

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("open");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });


        /* OPEN SELECTED */

        if (!isOpen) {

            item.classList.add("open");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (
        name.length < 2 ||
        email.length < 5 ||
        message.length < 5
    ) {

        formMessage.textContent =
            "Please complete all required fields.";

        return;
    }


    /*
        There is no backend in this website.

        So the form cannot actually send data
        to a server.

        This demonstrates the successful
        front-end interaction.
    */

    formMessage.textContent =
        "Thank you! Your message has been received. Our team will contact you soon.";

    contactForm.reset();

});


/* =========================================
   JOIN MODAL
========================================= */

const joinModal =
    document.getElementById("joinModal");


function openJoinModal() {

    joinModal.classList.add("show");

    document.body.classList.add("modal-open");

}


function closeJoinModal() {

    joinModal.classList.remove("show");

    document.body.classList.remove("modal-open");

}


function selectPlan(plan) {

    openJoinModal();

    const planSelect =
        document.getElementById("joinPlan");

    planSelect.value = plan;

}


/* CLOSE MODAL WITH ESC */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeJoinModal();
    }

});


/* JOIN FORM */

const joinForm =
    document.getElementById("joinForm");

const joinMessage =
    document.getElementById("joinMessage");


joinForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("joinName").value.trim();

    const phone =
        document.getElementById("joinPhone").value.trim();


    if (
        name.length < 2 ||
        phone.length < 8
    ) {

        joinMessage.textContent =
            "Please enter a valid name and phone number.";

        return;
    }


    joinMessage.textContent =
        "Thanks! Your free tour request has been submitted.";

    joinForm.reset();

});


/* =========================================
   BACK TO TOP
========================================= */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();
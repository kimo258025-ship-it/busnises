const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

const revealItems = document.querySelectorAll(
    ".service, .project, .process-list > div, .about-content"
);

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    { threshold: 0.15 }
);

revealItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity .7s ease, transform .7s ease";
    observer.observe(item);
});

document.getElementById("businessForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("businessName").value;
    const message = document.getElementById("businessMessage");

    message.textContent =
        `Thanks ${name}! Your project request has been sent successfully.`;

    this.reset();
});
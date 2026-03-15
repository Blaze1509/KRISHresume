// --- DOM Elements ---
const themeToggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

// --- Theme Management ---
// Check local storage for theme, default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggleBtn.addEventListener('click', () => {
    let theme = root.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if(theme === 'dark') {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

// --- Mobile Menu Toggle ---
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle icon between bars and times
    if (navLinks.classList.contains('active')) {
        hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
});

// --- Scroll Effects ---
// Header blur effect on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Adjust threshold based on section height
        if (scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// --- Intersection Observer for Fade-in Animations ---
const fadeOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const fadeOnScroll = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, fadeOptions);

// Observe all elements with scale/fade classes
document.querySelectorAll('section').forEach(el => {
    // We already added fade-in to specific sections, let's observe them
    if(el.classList.contains('fade-in')) {
        fadeOnScroll.observe(el);
    }
});

// Observe all individual cards for slide up animations
const cards = document.querySelectorAll('.card.glass');
cards.forEach(card => {
    // Add slide-up base class to begin with if not already present
    card.classList.add('slide-up');
    fadeOnScroll.observe(card);
});

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sticky Navbar & Glass Blur Effect
    const navbar = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-links a");

    hamburger.addEventListener("click", () => {
        // Toggle Nav
        navLinks.classList.toggle("nav-active");
        // Burger Animation
        hamburger.classList.toggle("toggle");
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            if(navLinks.classList.contains("nav-active")) {
                navLinks.classList.remove("nav-active");
                hamburger.classList.remove("toggle");
            }
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll(
        ".reveal-fade, .reveal-left, .reveal-right, .reveal-slide-up, .reveal-up, .reveal-scale"
    );

    const revealOptions = {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Number Counter Animation (For Stats Section)
    const counters = document.querySelectorAll('.counter');
    const speed = 50; // The lower the slower

    const startCounters = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                // Keep the suffix (like '+' or '')
                const targetText = counter.innerText;
                const targetNum = +targetText.replace(/\D/g, ''); // Extract just numbers
                const suffix = targetText.replace(/[0-9]/g, ''); // Extract just the + or text
                
                const updateCount = () => {
                    const count = +counter.getAttribute('data-current') || 0;
                    const inc = targetNum / speed;

                    if (count < targetNum) {
                        const newCount = Math.ceil(count + inc);
                        counter.setAttribute('data-current', newCount);
                        counter.innerText = newCount + suffix;
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = targetText; // Ensure it ends on exact original string
                    }
                };

                updateCount();
                observer.unobserve(counter); // Only run once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        startCounters.observe(counter);
    });
});
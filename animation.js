window.onload = () => {
    const rightSections = document.querySelectorAll(".fade-in-right-section");
    const leftSections = document.querySelectorAll(".fade-in-left-section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--delay', `${index * 0.2}s`); // Add staggered delay
                entry.target.classList.add("visible"); // Make the section visible
                observer.unobserve(entry.target); // Stop observing this element
            }
        });
    });

    rightSections.forEach((section) => {
        observer.observe(section); // Observe each fade-in-right-section
    });

    leftSections.forEach((section) => {
        observer.observe(section); // Observe each fade-in-left-section
    });
};
